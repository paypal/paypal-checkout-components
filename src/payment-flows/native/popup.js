/* @flow */

import { stringifyError, noop, once, popup, type CleanupType } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType } from 'cross-domain-utils/src';
import type { ProxyWindow } from 'post-robot/src';

import { getNativeEligibility, onLsatUpgradeCalled } from '../../api';
import { getLogger, isAndroidChrome, unresolvedPromise, getStorageState, toProxyWindow, postRobotOnceProxy, onCloseProxyWindow } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import type { ButtonProps, ServiceData, Config, Components } from '../../button/props';
import { type OnShippingChangeData } from '../../props/onShippingChange';
import type { Payment } from '../types';


import { isNativeOptedIn, setNativeOptOut, type NativeFallbackOptions } from './eligibility';
import { getNativeUrl, getNativePopupUrl, getNativeDomain, getNativePopupDomain, getNativeFallbackUrl } from './url';
import { connectNative } from './socket';

const POST_MESSAGE = {
    AWAIT_REDIRECT:             'awaitRedirect',
    DETECT_POSSIBLE_APP_SWITCH: 'detectAppSwitch',
    DETECT_WEB_SWITCH:          'detectWebSwitch',
    ON_APPROVE:                 'onApprove',
    ON_CANCEL:                  'onCancel',
    ON_FALLBACK:                'onFallback',
    ON_COMPLETE:                'onComplete',
    ON_ERROR:                   'onError'
};

type AppDetect = {|
    installed : boolean,
    [ string ] : string
|};

function logDetectedApp(app : AppDetect) {
    if (app) {
        Object.keys(app).forEach(key => {
            getLogger().info(`native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }`, { [key]: app[key] })
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_INSTALLED,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }: ${ app[key].toString() }`
                })
                .flush();
        });
    }
}

type EligibilityOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    fundingSource : $Values<typeof FUNDING>,
    sfvc : boolean,
    validatePromise : ZalgoPromise<boolean>,
    stickinessID : string,
    appDetect : AppDetect
|};

function getEligibility({ fundingSource, props, serviceData, sfvc, validatePromise, stickinessID, appDetect } : EligibilityOptions) : ZalgoPromise<boolean> {
    const { createOrder, onShippingChange, vault, platform, clientID, currency, buttonSessionID, enableFunding, merchantDomain } = props;
    const { buyerCountry, cookies, merchantID } = serviceData;
    const shippingCallbackEnabled = Boolean(onShippingChange);

    return validatePromise.then(valid => {
        if (!valid) {
            return false;
        }

        if (appDetect && !appDetect.installed) {
            return false;
        }

        if (isNativeOptedIn({ props })) {
            return true;
        }

        if (sfvc) {
            return false;
        }

        return createOrder().then(orderID => {
            return getNativeEligibility({ vault, platform, shippingCallbackEnabled,
                clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding, stickinessID,
                merchantID:   merchantID[0],
                domain:       merchantDomain
            }).then(eligibility => {
                const ineligibilityReason = eligibility && eligibility[fundingSource]?.ineligibilityReason ? eligibility[fundingSource].ineligibilityReason : '';

                if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                    getLogger().info(`native_appswitch_ineligible`, { orderID })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_INELIGIBLE,
                            [FPTI_CUSTOM_KEY.INFO_MSG]: ineligibilityReason
                        }).flush();

                    return false;
                }
                return true;
            });
        });
    });
}

type NativePopupOptions = {|
    payment : Payment,
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    components : Components,
    sessionUID : string,
    clean : CleanupType,
    fallback : (opts? : {|
        win? : CrossDomainWindowType | ProxyWindow,
        fallbackOptions? : NativeFallbackOptions
    |}) => ZalgoPromise<void>,
    callbacks : {|
        onInit : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onApprove : ({|
            data : {|
                payerID : string,
                paymentID? : string,
                billingToken? : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onCancel : () => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onError : ({|
            data : {|
                message : string
            |}
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onShippingChange : ({|
            data : OnShippingChangeData
        |}) => ZalgoPromise<{|
            resolved : boolean
        |}>,
        onClose : () => ZalgoPromise<void>,
        onDestroy : () => ZalgoPromise<void>
    |}
|};

type NativePopup = {|
    click : () => void,
    start : () => ZalgoPromise<void>
|};

export function initNativePopup({ payment, props, serviceData, config, sessionUID, fallback, callbacks, clean } : NativePopupOptions) : NativePopup {
    const { buttonSessionID, onClick, createOrder } = props;
    const { firebase: firebaseConfig } = config;
    const { fundingSource, win } = payment;
    const { onInit, onApprove, onCancel, onError, onClose, onDestroy, onShippingChange } = callbacks;

    if (!firebaseConfig) {
        throw new Error(`Can not load popup without firebase config`);
    }

    const getNativePopupProxyWindow = (url : string) : ProxyWindow => {
        let proxyWin;

        if (win) {
            const nativePopupWinProxy = toProxyWindow(win);
            nativePopupWinProxy.setLocation(url);
            proxyWin = nativePopupWinProxy;
        } else {
            proxyWin = toProxyWindow(popup(url));
        }

        getLogger().info(`native_attempt_appswitch_popup_shown`)
            .track({
                [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
            }).flush();

        return proxyWin;
    };

    let nativePopupPromise;

    return {
        click: () => {
            nativePopupPromise = new ZalgoPromise((resolve, reject) => {
                const url = getNativePopupUrl({ props, serviceData, fundingSource });
                const nativePopupDomain = getNativePopupDomain({ props });
                const nativePopupWinProxy = getNativePopupProxyWindow(url);

                const cleanupPopupWin = clean.register(() => {
                    return nativePopupWinProxy.close();
                });

                const validatePromise = ZalgoPromise.try(() => {
                    return onClick ? onClick({ fundingSource }) : true;
                }).then(valid => {
                    if (!valid) {
                        getLogger().info(`native_onclick_invalid`).track({
                            [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_ON_CLICK_INVALID
                        }).flush();
                    }

                    return valid;
                });

                const orderPromise = validatePromise.then(valid => {
                    if (valid) {
                        return createOrder();
                    }

                    return unresolvedPromise();
                });

                const handleFallback = (fallbackOptions? : NativeFallbackOptions) : ZalgoPromise<{| buttonSessionID : string |}> => {
                    cleanupPopupWin.cancel();
                    return fallback({
                        win: nativePopupWinProxy,
                        fallbackOptions
                    }).then(() => {
                        return { buttonSessionID };
                    });
                };

                const changeDomainAndAwaitFallback = ({ pageUrl, stickinessID, fallbackOptions } : {| pageUrl : string, stickinessID : string, fallbackOptions? : NativeFallbackOptions |}) => {
                    return nativePopupWinProxy.isClosed().then(isClosed => {
                        if (isClosed) {
                            return handleFallback(fallbackOptions);
                        }

                        if (fallbackOptions) {
                            setNativeOptOut(fallbackOptions);
                        }

                        return orderPromise.then(orderID => {
                            nativePopupWinProxy.setLocation(getNativeFallbackUrl({
                                props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID
                            }));
                        });
                    });
                };

                const onDetectAppSwitch = once(() : ZalgoPromise<void> => {
                    return ZalgoPromise.try(() => {
                        resolve();
                        onLsatUpgradeCalled();

                        getLogger().info(`native_detect_app_switch`).track({
                            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_APP_SWITCH
                        }).flush();

                        getStorageState(state => {
                            const { lastAppSwitchTime = 0, lastWebSwitchTime = 0 } = state;

                            if (lastAppSwitchTime > lastWebSwitchTime) {
                                getLogger().info('app_switch_detect_with_previous_app_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            if (lastWebSwitchTime > lastAppSwitchTime) {
                                getLogger().info('app_switch_detect_with_previous_web_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            if (!lastAppSwitchTime && !lastWebSwitchTime) {
                                getLogger().info('app_switch_detect_with_no_previous_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            state.lastAppSwitchTime = Date.now();
                        });
                    });
                });

                const onDetectPossibleAppSwitch = once(({ pageUrl, stickinessID } : {| pageUrl : string, stickinessID : string |}) : ZalgoPromise<void> => {
                    return ZalgoPromise.try(() => {
                        onLsatUpgradeCalled();

                        getLogger().info(`native_detect_possible_app_switch`).track({
                            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_POSSIBLE_APP_SWITCH
                        }).flush();

                        const connection = connectNative({
                            config, sessionUID,
                            callbacks: {
                                onInit: () => {
                                    onDetectAppSwitch();
                                    return onInit();
                                },
                                onApprove: ({ data }) => {
                                    onDetectAppSwitch();
                                    return onApprove({ data });
                                },
                                onCancel: () => {
                                    onDetectAppSwitch();
                                    return onCancel();
                                },
                                onShippingChange: ({ data }) => {
                                    onDetectAppSwitch();
                                    return onShippingChange({ data });
                                },
                                onError: ({ data }) => {
                                    onDetectAppSwitch();
                                    reject(new Error(data.message));
                                    return onError({ data });
                                },
                                onFallback: ({ data: fallbackOptions }) => {
                                    onDetectAppSwitch();
                                    return changeDomainAndAwaitFallback({ pageUrl, stickinessID, fallbackOptions }).then(() => {
                                        return { buttonSessionID };
                                    });
                                }
                            }
                        });
                        
                        clean.register(connection.cancel);
                    }).catch(reject);
                });

                const onDetectWebSwitch = once(() : ZalgoPromise<void> => {
                    return ZalgoPromise.try(() => {
                        getStorageState(state => {
                            const { lastAppSwitchTime = 0, lastWebSwitchTime = 0 } = state;

                            if (lastAppSwitchTime > lastWebSwitchTime) {
                                getLogger().info('web_switch_detect_with_previous_app_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            if (lastWebSwitchTime > lastAppSwitchTime) {
                                getLogger().info('web_switch_detect_with_previous_web_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            if (!lastAppSwitchTime && !lastWebSwitchTime) {
                                getLogger().info('web_switch_detect_with_no_previous_switch', {
                                    lastAppSwitchTime: lastAppSwitchTime.toString(),
                                    lastWebSwitchTime: lastWebSwitchTime.toString()
                                });
                            }

                            state.lastWebSwitchTime = Date.now();
                        });

                        getLogger().info(`native_detect_web_switch`).track({
                            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_DETECT_WEB_SWITCH
                        }).flush();

                        return handleFallback().then(noop);
                    }).then(resolve, reject);
                });


                const closeListener = onCloseProxyWindow(nativePopupWinProxy, () => {
                    getLogger().info(`native_popup_closed`).track({
                        [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_CLOSED
                    }).flush();
                    reject(new Error(`Native popup closed`));
                    onClose();
                }, 500);

                const closePopup = (event : string) => {
                    getLogger().info(`native_closing_popup_${ event }`).track({
                        [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:  event ? `${ FPTI_TRANSITION.NATIVE_CLOSING_POPUP }_${ event }` : FPTI_TRANSITION.NATIVE_CLOSING_POPUP
                    }).flush();
                    closeListener.cancel();
                    nativePopupWinProxy.close();
                };

                const awaitRedirectListener = postRobotOnceProxy(POST_MESSAGE.AWAIT_REDIRECT, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, ({ data: { app: appDetect, pageUrl, sfvc, stickinessID } }) => {
                    getLogger().info(`native_post_message_await_redirect`).flush();
                    logDetectedApp(appDetect);

                    getLogger().addTrackingBuilder(() => {
                        return {
                            [FPTI_KEY.STICKINESS_ID]: stickinessID
                        };
                    });

                    const onDetectPossibleAppSwitchListener = postRobotOnceProxy(POST_MESSAGE.DETECT_POSSIBLE_APP_SWITCH, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, () => {
                        getLogger().info(`native_post_message_detect_possible_app_switch`).flush();
                        return onDetectPossibleAppSwitch({ pageUrl, stickinessID });
                    });

                    const onDetectWebSwitchListener = postRobotOnceProxy(POST_MESSAGE.DETECT_WEB_SWITCH, { proxyWin: nativePopupWinProxy, domain: getNativeDomain({ props }) }, () => {
                        getLogger().info(`native_post_message_detect_web_switch`).flush();
                        return onDetectWebSwitch();
                    });

                    const onApproveListener = postRobotOnceProxy(POST_MESSAGE.ON_APPROVE, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, ({ data }) => {
                        onDetectAppSwitch();
                        onApprove({ data });
                        closePopup('onApprove');
                    });

                    const onCancelListener = postRobotOnceProxy(POST_MESSAGE.ON_CANCEL, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, () => {
                        onDetectAppSwitch();
                        onCancel();
                        closePopup('onCancel');
                    });

                    const onFallbackListener = postRobotOnceProxy(POST_MESSAGE.ON_FALLBACK, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, ({ data: fallbackOptions }) => {
                        onDetectAppSwitch();
                        getLogger().info(`native_message_onfallback`)
                            .track({
                                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_FALLBACK
                            }).flush();
                        changeDomainAndAwaitFallback({ pageUrl, stickinessID, fallbackOptions });
                    });

                    const onCompleteListener = postRobotOnceProxy(POST_MESSAGE.ON_COMPLETE, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, () => {
                        onDetectAppSwitch();
                        getLogger().info(`native_post_message_on_complete`)
                            .track({
                                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_COMPLETE
                            }).flush();
                        closePopup('onComplete');
                    });

                    const onErrorListener = postRobotOnceProxy(POST_MESSAGE.ON_ERROR, { proxyWin: nativePopupWinProxy, domain: nativePopupDomain }, ({ data }) => {
                        onError({ data });
                        closePopup('onError');
                        reject(new Error(data.message));
                    });

                    window.addEventListener('pagehide', () => closePopup('pagehide'));
                    window.addEventListener('unload', () => closePopup('unload'));

                    clean.register(() => {
                        return ZalgoPromise.all([
                            awaitRedirectListener.cancel(),
                            onDetectPossibleAppSwitchListener.cancel(),
                            onApproveListener.cancel(),
                            onCancelListener.cancel(),
                            onFallbackListener.cancel(),
                            onCompleteListener.cancel(),
                            onErrorListener.cancel(),
                            onDetectWebSwitchListener.cancel(),
                            closeListener.cancel()
                        ]).then(noop);
                    });

                    return ZalgoPromise.hash({
                        valid:      validatePromise,
                        eligible:   getEligibility({ fundingSource, props, serviceData, sfvc, validatePromise, stickinessID, appDetect })
                    }).then(({ valid, eligible }) => {

                        if (!valid) {
                            closeListener.cancel();
                            nativePopupWinProxy.close();
                            return onDestroy().then(() => {
                                return {
                                    appSwitch: false,
                                    orderID:   null,
                                    redirect:  false
                                };
                            });
                        }

                        if (!eligible) {
                            return orderPromise.then(orderID => {
                                return {
                                    redirect:    true,
                                    appSwitch:   false,
                                    orderID,
                                    redirectUrl: getNativeFallbackUrl({
                                        props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID
                                    })
                                };
                            });
                        }

                        return orderPromise.then(orderID => {
                            const nativeUrl = getNativeUrl({ props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID });

                            getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                                .track({
                                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                                    [FPTI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                                }).flush();

                            if (isAndroidChrome()) {
                                closeListener.cancel();
                                const appSwitchCloseListener = onCloseProxyWindow(nativePopupWinProxy, () => onDetectPossibleAppSwitch({ pageUrl, stickinessID }), 50);
                                setTimeout(appSwitchCloseListener.cancel, 1000);
                            }

                            return {
                                appSwitch:   true,
                                orderID,
                                redirect:    true,
                                redirectUrl: nativeUrl
                            };
                        });

                    }).catch(err => {
                        getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                            .track({
                                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                                [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                            }).flush();

                        return orderPromise.then(orderID => {
                            return {
                                appSwitch:   false,
                                orderID,
                                redirect:    true,
                                redirectUrl: getNativeFallbackUrl({
                                    props, serviceData, config, fundingSource, sessionUID, pageUrl, orderID, stickinessID
                                })
                            };
                        });
                    }).catch(err => {
                        nativePopupWinProxy.close();
                        reject(err);

                        return onDestroy().then(() => {
                            return onError({ data: { message: stringifyError(err) } });
                        }).then(() => {
                            return {
                                redirect:  false,
                                appSwitch: false
                            };
                        });
                    });
                });
            });
        },

        start: () => {
            if (!nativePopupPromise) {
                throw new Error(`Expected native popup promise to be set`);
            }

            return nativePopupPromise;
        }
    };
}


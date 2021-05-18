/* @flow */

import { stringifyError, noop, once } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type CrossDomainWindowType, onCloseWindow } from 'cross-domain-utils/src';

import { getNativeEligibility } from '../../api';
import { getLogger, isAndroidChrome, unresolvedPromise } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CUSTOM_KEY } from '../../constants';
import type { ButtonProps, ServiceData, Config } from '../../button/props';

import { isNativeOptedIn } from './eligibility';
import { getNativeUrl, getNativePopupUrl, getNativeDomain, getNativePopupDomain, getNativeFallbackUrl } from './url';
import { onPostMessage } from './util';

const POST_MESSAGE = {
    AWAIT_REDIRECT:     'awaitRedirect',
    DETECT_APP_SWITCH:  'detectAppSwitch',
    DETECT_WEB_SWITCH:  'detectWebSwitch',
    ON_APPROVE:         'onApprove',
    ON_CANCEL:          'onCancel',
    ON_FALLBACK:        'onFallback',
    ON_COMPLETE:        'onComplete',
    ON_ERROR:           'onError'
};

type NativePopupOptions = {|
    props : ButtonProps,
    serviceData : ServiceData,
    config : Config,
    fundingSource : $Values<typeof FUNDING>,
    sessionUID : string,
    callbacks : {|
        onDetectWebSwitch : ({|
            win : CrossDomainWindowType
        |}) => ZalgoPromise<void>,
        onDetectAppSwitch : ({|
            sessionUID : string
        |}) => ZalgoPromise<void>,
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
        onFallback : ({|
            win : CrossDomainWindowType
        |}) => ZalgoPromise<{|
            buttonSessionID : string
        |}>,
        onClose : () => ZalgoPromise<void>,
        onDestroy : () => ZalgoPromise<void>
    |}
|};

type NativePopup = {|
    close : () => void,
    cancel : () => ZalgoPromise<void>
|};

export function openNativePopup({ props, serviceData, config, fundingSource, sessionUID, callbacks } : NativePopupOptions) : NativePopup {
    const { onClick, createOrder, vault, platform, onShippingChange,
        clientID, currency, buttonSessionID, enableFunding, merchantDomain } = props;
    const { buyerCountry, cookies, merchantID } = serviceData;
    const { firebase: firebaseConfig } = config;

    const shippingCallbackEnabled = Boolean(onShippingChange);

    if (!firebaseConfig) {
        throw new Error(`Can not load popup without firebase config`);
    }
    
    const popupWin = window.open(getNativePopupUrl({ props, serviceData, fundingSource }));
    const nativePopupDomain = getNativePopupDomain({ props });
    let { onDetectAppSwitch, onDetectWebSwitch, onApprove, onCancel, onError, onFallback, onClose, onDestroy } = callbacks;

    onDetectAppSwitch = once(onDetectAppSwitch);
    onDetectWebSwitch = once(onDetectWebSwitch);

    getLogger().info(`native_attempt_appswitch_popup_shown`)
        .track({
            [FPTI_KEY.STATE]:      FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_SHOWN
        }).flush();

    const closeListener = onCloseWindow(popupWin, () => {
        getLogger().info(`native_popup_closed`).track({
            [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_CLOSED
        }).flush();
        onClose();
    }, 500);

    const closePopup = (event) => {
        const eventType = event && event.type ? String(event.type) : event;

        getLogger().info(`native_closing_popup_${ eventType }`).track({
            [FPTI_KEY.STATE]:       FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:  event ? `${ FPTI_TRANSITION.NATIVE_CLOSING_POPUP }_${ eventType }` : FPTI_TRANSITION.NATIVE_CLOSING_POPUP
        }).flush();
        closeListener.cancel();
        popupWin.close();
    };

    const redirectListenerTimeout = setTimeout(() => {
        getLogger().info(`native_popup_load_timeout`).flush();
    }, 5 * 1000);

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

    const awaitRedirectListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.AWAIT_REDIRECT, ({ data: { app, pageUrl, sfvc, stickinessID } }) => {
        getLogger().info(`native_post_message_await_redirect`).flush();
        getLogger().info(`native_post_message_await_redirect`).flush();
        clearTimeout(redirectListenerTimeout);

        getLogger().addTrackingBuilder(() => {
            return {
                [FPTI_KEY.STICKINESS_ID]: stickinessID
            };
        });

        const eligibilityPromise = validatePromise.then(valid => {
            if (!valid) {
                return false;
            }

            if (isNativeOptedIn({ props })) {
                return true;
            }

            if (sfvc) {
                return false;
            }

            return orderPromise.then(orderID => {
                return getNativeEligibility({ vault, platform, shippingCallbackEnabled,
                    clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding, stickinessID,
                    merchantID:   merchantID[0],
                    domain:       merchantDomain
                }).then(eligibility => {
                    if (!eligibility || !eligibility[fundingSource] || !eligibility[fundingSource].eligibility) {
                        getLogger().info(`native_appswitch_ineligible`, { orderID })
                            .track({
                                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_SWITCH_INELIGIBLE
                            }).flush();

                        return false;
                    }
                    return true;
                });
            });
        });

        return ZalgoPromise.hash({
            valid:      validatePromise,
            eligible:   eligibilityPromise
        }).then(({ valid, eligible }) => {
            if (app) {
                Object.keys(app).forEach(key => {
                    getLogger().info(`native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }`, { [key]: app[key] })
                        .track({
                            [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_APP_INSTALLED,
                            [FPTI_CUSTOM_KEY.INFO_MSG]: `native_app_${ app.installed ? 'installed' : 'not_installed' }_${ key }: ${ app[key] }`
                        })
                        .flush();
                });
            }

            if (!valid) {
                popupWin.close();
                return onDestroy();
            }

            if (!eligible || (app && !app.installed)) {
                return orderPromise.then(orderID => {
                    const fallbackUrl = getNativeFallbackUrl({ props, serviceData, fundingSource, firebaseConfig, sessionUID, pageUrl, orderID, stickinessID });
                    return { redirect: true, appSwitch: false, redirectUrl: fallbackUrl };
                });
            }

            return orderPromise.then(orderID => {
                const nativeUrl = getNativeUrl({ props, serviceData, fundingSource, firebaseConfig, sessionUID, pageUrl, orderID, stickinessID });

                getLogger().info(`native_attempt_appswitch_url_popup`, { url: nativeUrl })
                    .track({
                        [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH,
                        [FPTI_CUSTOM_KEY.INFO_MSG]: nativeUrl
                    }).flush();

                if (isAndroidChrome()) {
                    const appSwitchCloseListener = onCloseWindow(popupWin, () => {
                        onDetectAppSwitch({ sessionUID });
                    });
                    setTimeout(appSwitchCloseListener.cancel, 1000);
                }

                return { redirect: true, appSwitch: true, redirectUrl: nativeUrl };
            });

        }).catch(err => {
            getLogger().info(`native_attempt_appswitch_url_popup_errored`)
                .track({
                    [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ATTEMPT_APP_SWITCH_ERRORED,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: stringifyError(err)
                }).flush();

            return orderPromise.then(orderID => {
                const fallbackUrl = getNativeFallbackUrl({ props, serviceData, fundingSource, firebaseConfig, sessionUID, pageUrl, orderID, stickinessID });
                return { redirect: true, appSwitch: false, redirectUrl: fallbackUrl };
            });
        }).catch(err => {
            popupWin.close();

            return onDestroy().then(() => {
                return onError({ data: { message: stringifyError(err) } });
            });
        });
    });

    const detectAppSwitchListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.DETECT_APP_SWITCH, () => {
        getLogger().info(`native_post_message_detect_app_switch`).flush();
        return onDetectAppSwitch({ sessionUID });
    });

    const detectWebSwitchListener = onPostMessage(popupWin, getNativeDomain({ props }), POST_MESSAGE.DETECT_WEB_SWITCH, () => {
        getLogger().info(`native_post_message_detect_web_switch`).flush();
        return onDetectWebSwitch({ win: popupWin });
    });

    const onApproveListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.ON_APPROVE, (data) => {
        onApprove(data);
        closePopup('onApprove');
    });

    const onCancelListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.ON_CANCEL, () => {
        onCancel();
        closePopup('onCancel');
    });

    const onFallbackListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.ON_FALLBACK, () => {
        getLogger().info(`native_message_onfallback`)
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_ON_FALLBACK
            }).flush();
        onFallback({ win: popupWin });
    });

    const onCompleteListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.ON_COMPLETE, () => {
        getLogger().info(`native_post_message_on_complete`)
            .track({
                [FPTI_KEY.STATE]:           FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_ON_COMPLETE
            }).flush();
        closePopup('onComplete');
    });

    const onErrorListener = onPostMessage(popupWin, nativePopupDomain, POST_MESSAGE.ON_ERROR, (data) => {
        onError(data);
        closePopup('onError');
    });

    window.addEventListener('pagehide', closePopup);
    window.addEventListener('unload', closePopup);

    const cancel = () => {
        return ZalgoPromise.all([
            awaitRedirectListener.cancel,
            detectAppSwitchListener.cancel,
            onApproveListener.cancel,
            onCancelListener.cancel,
            onFallbackListener.cancel,
            onCompleteListener.cancel,
            onErrorListener.cancel,
            detectWebSwitchListener.cancel,
            closeListener.cancel
        ]).then(noop);
    };

    const close = () => {
        popupWin.close();
    };

    return {
        cancel,
        close
    };
}

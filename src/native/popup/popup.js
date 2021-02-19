/* @flow */

import { parseQuery, cleanup, stringifyErrorMessage, base64encode } from 'belter/src';
import { onCloseWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';

import type { LocaleType } from '../../types';
import { FPTI_CUSTOM_KEY, FPTI_TRANSITION } from '../../constants';
import { getPostRobot, setupNativeLogger, getSDKVersion } from '../lib';
import { isAndroidChrome } from '../../lib';

import { MESSAGE, HASH, EVENT } from './constants';

const ANDROID_PAYPAL_APP_ID = 'com.paypal.android.p2pmobile';
const ANDROID_VENMO_APP_ID  = 'com.venmo';

export type NativePopupOptions = {|
    parentDomain : string,
    env : $Values<typeof ENV>,
    sessionID : string,
    buttonSessionID : string,
    sdkCorrelationID : string,
    clientID? : string,
    fundingSource : $Values<typeof FUNDING>,
    locale : LocaleType
|};

type NativePopup = {|
    destroy : () => ZalgoPromise<void>
|};

type AndroidApp = {|
    id? : string,
    installed : boolean,
    version? : string
|};

function isAndroidAppInstalled(appId : string) : ZalgoPromise<AndroidApp> {
    // assume true unless we can prove false
    if (window.navigator && window.navigator.getInstalledRelatedApps) {
        return window.navigator.getInstalledRelatedApps().then(result => {
            if (result && result.length) {
                const apps = result.filter(app => app.id === appId);
                if (apps && apps.length) {
                    const id = apps[0].id;
                    const version = apps[0].version;

                    return ZalgoPromise.resolve({ id, installed: true, version });
                } else {
                    return ZalgoPromise.resolve({ installed: false });
                }
            }
            
            return ZalgoPromise.resolve({ installed: true });
        });
    }

    return ZalgoPromise.resolve({ installed: true });
}

function isAndroidPayPalAppInstalled() : ZalgoPromise<AndroidApp> {
    return isAndroidAppInstalled(ANDROID_PAYPAL_APP_ID).then(app => {
        return { ...app };
    });
}

function isAndroidVenmoAppInstalled() : ZalgoPromise<AndroidApp> {
    return isAndroidAppInstalled(ANDROID_VENMO_APP_ID).then(app => {
        return { ...app };
    });
}

export function setupNativePopup({ parentDomain, env, sessionID, buttonSessionID, sdkCorrelationID,
    clientID, fundingSource, locale } : NativePopupOptions) : NativePopup {

    let appInstalledPromise = ZalgoPromise.resolve({ installed: true });

    const sdkVersion = getSDKVersion();
    const logger = setupNativeLogger({ env, sessionID, buttonSessionID, sdkCorrelationID,
        clientID, fundingSource, sdkVersion, locale });

    logger.info('native_popup_init', {
        buttonSessionID,
        href: base64encode(window.location.href)
    }).track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_INIT
    }).flush();

    window.addEventListener('beforeunload', () => {
        logger.info('native_popup_beforeunload')
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_BEFORE_UNLOAD
            }).flush();
    });

    window.addEventListener('unload', () => {
        logger.info('native_popup_unload')
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_UNLOAD
            }).flush();
    });

    window.addEventListener('pagehide', () => {
        logger.info('native_popup_pagehide')
            .track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.NATIVE_POPUP_PAGEHIDE
            }).flush();
    });

    if (isAndroidChrome()) {
        if (fundingSource === FUNDING.PAYPAL) {
            appInstalledPromise = isAndroidPayPalAppInstalled().catch(err => {
                logger.info('native_popup_android_paypal_app_installed_error')
                    .track({
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_ANDROID_PAYPAL_APP_ERROR,
                        [FPTI_CUSTOM_KEY.ERR_DESC]: `Error: ${ stringifyErrorMessage(err) }`
                    }).flush();

                return { installed: true };
            });
        } else if (fundingSource === FUNDING.VENMO) {
            appInstalledPromise = isAndroidVenmoAppInstalled().catch(err => {
                logger.info('native_popup_android_venmo_app_installed_error')
                    .track({
                        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_ANDROID_VENMO_APP_ERROR,
                        [FPTI_CUSTOM_KEY.ERR_DESC]: `Error: ${ stringifyErrorMessage(err) }`
                    }).flush();

                return { installed: true };
            });
        }
    }

    const opener = window.opener;
    if (!opener) {
        logger.info('native_popup_no_opener', {
            buttonSessionID,
            href: base64encode(window.location.href)
        }).info(`native_popup_no_opener_hash_${ window.location.href.split('#')[1] || 'none' }`).track({
            [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_NO_OPENER,
            [FPTI_CUSTOM_KEY.INFO_MSG]: `location: ${ window.location.href }`
        }).flush().then(() => {
            window.close();
        });

        throw new Error(`Expected window to have opener`);
    } else {
        onCloseWindow(window.opener, () => {
            logger.info(`native_popup_opener_detect_close`).track({
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_OPENER_DETECT_CLOSE
            }).flush().then(() => {
                window.close();
            });
        }, 500);
    }

    const clean = cleanup();
    const postRobot = getPostRobot();

    const destroy = () => {
        return clean.all();
    };

    const sendToParent = (event, payload = {}) => {
        return postRobot.send(opener, event, payload, { domain: parentDomain })
            .then(({ data }) => data);
    };

    const handleHash = () => {
        if (!window.location.hash || window.location.hash === '#') {
            return;
        }

        const hashString = window.location.hash && window.location.hash.slice(1);
        const [ hash, queryString ] = hashString.split('?');

        const { appVersion, bundleIdentifier } = parseQuery(queryString);

        logger.info('native_popup_hashchange', { hash, queryString })
            .track({
                [FPTI_KEY.TRANSITION]:                  FPTI_TRANSITION.NATIVE_POPUP_HASHCHANGE,
                [FPTI_KEY.MOBILE_APP_VERSION]:          appVersion,
                [FPTI_KEY.MOBILE_BUNDLE_IDENTIFIER]:    bundleIdentifier,
                [FPTI_CUSTOM_KEY.INFO_MSG]:             `${ window.location.href }`
            }).flush();

        switch (hash) {
        case HASH.INIT: {
            break;
        }
        case HASH.ON_APPROVE: {
            const { payerID, paymentID, billingToken } = parseQuery(queryString);
            sendToParent(MESSAGE.ON_APPROVE, { payerID, paymentID, billingToken });
            break;
        }
        case HASH.ON_CANCEL: {
            sendToParent(MESSAGE.ON_CANCEL);
            break;
        }
        case HASH.ON_ERROR: {
            const { message } = parseQuery(queryString);
            sendToParent(MESSAGE.ON_ERROR, { message });
            break;
        }
        case HASH.CLOSE: {
            sendToParent(MESSAGE.ON_COMPLETE);
            break;
        }
        case HASH.TEST: {
            break;
        }
        default: {
            sendToParent(MESSAGE.ON_ERROR, {
                message: `Invalid event sent from native, ${ hash }, from URL, ${ window.location.href }`
            });
        }
        }
    };

    window.addEventListener(EVENT.HASHCHANGE, handleHash);
    clean.register(() => window.removeEventListener(EVENT.HASHCHANGE, handleHash));

    handleHash();

    const pageUrl = `${ window.location.href  }#${  HASH.CLOSE }`;

    appInstalledPromise.then(app => {
        sendToParent(MESSAGE.AWAIT_REDIRECT, { app, pageUrl }).then(({ redirect = true, redirectUrl }) => {
            if (!redirect) {
                return;
            }

            window.location.replace(redirectUrl);

            let didRedirect = false;

            const markRedirect = () => {
                didRedirect = true;
            };

            window.addEventListener('beforeunload', markRedirect);
            clean.register(() => window.removeEventListener('beforeunload', markRedirect));

            window.addEventListener('unload', markRedirect);
            clean.register(() => window.removeEventListener('unload', markRedirect));

            const timer = setTimeout(() => {
                if (!didRedirect) {
                    sendToParent(MESSAGE.DETECT_APP_SWITCH);
                }
            }, 500);
            clean.register(() => clearTimeout(timer));
        });
    });

    return {
        destroy
    };
}

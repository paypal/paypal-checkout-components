/* @flow */

import { parseQuery, cleanup, stringifyErrorMessage, base64encode, isSFVC, isSFVCorSafari } from 'belter/src';
import { onCloseWindow } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, FUNDING, FPTI_KEY, COUNTRY } from '@paypal/sdk-constants/src';

import type { LocaleType } from '../../types';
import { FPTI_CONTEXT_TYPE, FPTI_CUSTOM_KEY, FPTI_TRANSITION } from '../../constants';
import {  setupNativeLogger } from '../lib';
import { isAndroidChrome, isIOSSafari, getStorageID, getPostRobot, getSDKVersion } from '../../lib';

import { MESSAGE, HASH, EVENT } from './constants';

const ANDROID_PAYPAL_APP_ID = 'com.paypal.android.p2pmobile';
const ANDROID_VENMO_APP_ID  = 'com.venmo';

export type NativePopupOptions = {|
    parentDomain : string,
    env : $Values<typeof ENV>,
    sessionID : string,
    buttonSessionID : string,
    sdkCorrelationID : string,
    clientID : string,
    fundingSource : $Values<typeof FUNDING>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>
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
                    return ZalgoPromise.resolve({ installed: true });
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
    clientID, fundingSource, locale, buyerCountry } : NativePopupOptions) : NativePopup {

    let appInstalledPromise = ZalgoPromise.resolve({ installed: true });

    const sdkVersion = getSDKVersion();
    const logger = setupNativeLogger({ env, sessionID, buttonSessionID, sdkCorrelationID,
        clientID, fundingSource, sdkVersion, locale, buyerCountry });

    logger.info('native_popup_init', {
        buttonSessionID,
        href: base64encode(window.location.href)
    }).track({
        [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_INIT,
        [FPTI_CUSTOM_KEY.INFO_MSG]: base64encode(window.location.href)
    }).flush();

    let sfvc = isSFVC();
    const sfvcOrSafari = !sfvc ? isSFVCorSafari() : false;
    const sfvcOrSafariLog = sfvcOrSafari ? 'sfvcOrSafari' : 'browser';
    const logMessage = sfvc ? 'sfvc' : sfvcOrSafariLog;

    if (isIOSSafari()) {
        const height = window.innerHeight;
        const scale = Math.round(window.screen.width / window.innerWidth * 100) / 100;
        const computedHeight = Math.round(height * scale);

        const log = `${ FPTI_TRANSITION.NATIVE_POPUP_INIT }_${ logMessage }`;
        logger
            .info(log)
            .track({
                [FPTI_KEY.TRANSITION]:      log,
                [FPTI_CUSTOM_KEY.INFO_MSG]: `computed height: ${ computedHeight }, height: ${ window.outerHeight }, width: ${ window.outerWidth }, innerHeight: ${ height }, scale: ${ scale }`
            }).flush();
    }

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

    const replaceHash = (hash) => {
        return window.location.replace(
            `#${ hash.replace(/^#/, '') }`
        );
    };

    const closeWindow = () => {
        window.close();
        replaceHash(HASH.CLOSED);
    };

    const getRawHash = () => {
        return (window.location.hash || 'none').replace(/^#/, '').replace(/\?.+/, '');
    };

    const opener = window.opener;
    if (!opener) {
        if (isIOSSafari()) {
            const log = `${ FPTI_TRANSITION.NATIVE_POPUP_NO_OPENER }_hash_${ getRawHash() }_${ logMessage }`;
            logger
                .info(log)
                .track({
                    [FPTI_KEY.TRANSITION]: log
                }).flush();
        }

        logger.info('native_popup_no_opener', {
            buttonSessionID,
            href: base64encode(window.location.href)
        }).info(`native_popup_no_opener_hash_${ getRawHash() }`).track({
            [FPTI_KEY.TRANSITION]:      `${ FPTI_TRANSITION.NATIVE_POPUP_NO_OPENER }_hash_${ getRawHash() }`,
            [FPTI_CUSTOM_KEY.INFO_MSG]: `location: ${ base64encode(window.location.href) }`
        }).flush().then(closeWindow);
        

        throw new Error(`Expected window to have opener`);
    } else {
        onCloseWindow(window.opener, () => {
            logger.info(`native_popup_opener_detect_close`).track({
                [FPTI_KEY.TRANSITION]:  FPTI_TRANSITION.NATIVE_POPUP_OPENER_DETECT_CLOSE
            }).flush().then(closeWindow);
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
        case HASH.LOADED: {
            break;
        }
        case HASH.APPSWITCH: {
            break;
        }
        case HASH.WEBSWITCH: {
            break;
        }
        case HASH.CLOSED: {
            break;
        }
        case HASH.ON_APPROVE: {
            const { payerID, paymentID, billingToken } = parseQuery(queryString);
            sendToParent(MESSAGE.ON_APPROVE, { payerID, paymentID, billingToken }).finally(closeWindow);
            break;
        }
        case HASH.ON_CANCEL: {
            sendToParent(MESSAGE.ON_CANCEL).finally(closeWindow);
            break;
        }
        case HASH.ON_FALLBACK: {
            const { type, skip_native_duration, fallback_reason } = parseQuery(queryString);
            sendToParent(MESSAGE.ON_FALLBACK, { type, skip_native_duration, fallback_reason });
            break;
        }
        case HASH.ON_ERROR: {
            const { message } = parseQuery(queryString);
            sendToParent(MESSAGE.ON_ERROR, { message }).finally(closeWindow);
            break;
        }
        case HASH.CLOSE: {
            sendToParent(MESSAGE.ON_COMPLETE).finally(closeWindow);
            break;
        }
        case HASH.TEST: {
            break;
        }
        default: {
            sendToParent(MESSAGE.ON_ERROR, {
                message: `Invalid event sent from native, ${ hash }, from URL, ${ window.location.href }`
            }).finally(closeWindow);
        }
        }
    };

    window.addEventListener(EVENT.HASHCHANGE, handleHash);
    clean.register(() => window.removeEventListener(EVENT.HASHCHANGE, handleHash));

    replaceHash(HASH.LOADED);
    handleHash();

    const stickinessID = getStorageID();
    const pageUrl = `${ window.location.href.split('#')[0] }#${  HASH.CLOSE }`;

    appInstalledPromise.then(app => {
        sfvc = !sfvc ? sfvcOrSafari === true : true;
        sendToParent(MESSAGE.AWAIT_REDIRECT, { app, pageUrl, sfvc, stickinessID }).then(({ redirect = true, redirectUrl, orderID, appSwitch = true }) => {
            if (!redirect) {
                return;
            }

            if (orderID) {
                logger.addTrackingBuilder(() => {
                    return {
                        [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                        [FPTI_KEY.CONTEXT_ID]:   orderID,
                        [FPTI_KEY.TOKEN]:        orderID
                    };
                });
            }

            replaceHash(appSwitch ? HASH.APPSWITCH : HASH.WEBSWITCH);
            window.location.replace(redirectUrl);

            let didRedirect = false;

            const markRedirect = () => {
                didRedirect = true;
            };

            window.addEventListener('beforeunload', markRedirect);
            clean.register(() => window.removeEventListener('beforeunload', markRedirect));

            window.addEventListener('unload', markRedirect);
            clean.register(() => window.removeEventListener('unload', markRedirect));

            window.addEventListener('pagehide', markRedirect);
            clean.register(() => window.removeEventListener('pagehide', markRedirect));

            if (appSwitch) {
                const timer = setTimeout(() => {
                    if (!didRedirect) {
                        sendToParent(MESSAGE.DETECT_POSSIBLE_APP_SWITCH);
                    }
                }, 1500);
                clean.register(() => clearTimeout(timer));
            }
        });
    });

    return {
        destroy
    };
}

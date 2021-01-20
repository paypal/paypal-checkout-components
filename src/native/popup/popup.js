/* @flow */

import { parseQuery, cleanup } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { ENV, FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';

import type { LocaleType } from '../../types';
import { FPTI_CUSTOM_KEY, FPTI_TRANSITION } from '../../constants';
import { getPostRobot, setupNativeLogger, getSDKVersion } from '../lib';

import { MESSAGE, HASH, EVENT } from './constants';

export type NativePopupOptions = {|
    parentDomain : string,
    env? : $Values<typeof ENV>,
    sessionID? : string,
    buttonSessionID? : string,
    sdkCorrelationID? : string,
    clientID? : string,
    fundingSource? : $Values<typeof FUNDING>,
    locale? : LocaleType
|};

type NativePopup = {|
    destroy : () => ZalgoPromise<void>
|};

export function setupNativePopup({ parentDomain, env, sessionID, buttonSessionID, sdkCorrelationID,
    clientID, fundingSource, locale } : NativePopupOptions) : NativePopup {

    let logger;

    const sdkVersion = getSDKVersion();
    if (env && sessionID && buttonSessionID && sdkCorrelationID && locale) {
        logger = setupNativeLogger({ env, sessionID, buttonSessionID, sdkCorrelationID,
            clientID, fundingSource, sdkVersion, locale });
    }

    const opener = window.opener;
    if (!opener) {
        if (logger) {
            logger.info('native_popup_no_opener')
                .track({
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_NO_OPENER,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `location: ${ window.location.href }`
                }).flush();
        }
        throw new Error(`Expected window to have opener`);
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

        if (logger) {
            logger.info('native_popup_hashchange', { hash, queryString })
                .track({
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.NATIVE_POPUP_HASHCHANGE,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `${ window.location.href }`
                }).flush();
        }

        switch (hash) {
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

    sendToParent(MESSAGE.AWAIT_REDIRECT, { pageUrl }).then(({ redirect = true, redirectUrl }) => {
        if (!redirect) {
            return;
        }

        window.location = redirectUrl;

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

    return {
        destroy
    };
}

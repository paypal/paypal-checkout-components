/* @flow */

import { parseQuery, cleanup } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';

import { getPostRobot } from '../lib';

import { MESSAGE, HASH, EVENT } from './constants';

type NativePopupOptions = {|
    parentDomain : string
|};

type NativePopup = {|
    destroy : () => ZalgoPromise<void>
|};

export function setupNativePopup({ parentDomain } : NativePopupOptions) : NativePopup {
    const opener = window.opener;
    if (!opener) {
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

    sendToParent(MESSAGE.AWAIT_REDIRECT, { pageUrl }).then(({ redirectUrl }) => {
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

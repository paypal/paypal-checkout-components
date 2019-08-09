/* @flow */

import { memoize, redirect as redir, noop } from 'belter/src';
import type { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { getLogger } from '../../lib';
import { FPTI_STATE, FPTI_TRANSITION } from '../../constants';

import type { CreateOrder } from './createOrder';
import type { XProps } from './types';

export type XOnCancelDataType = {|
    orderID : string
|};

export type XOnCancelActionsType = {|
    
|};

export type XOnCancel = (XOnCancelDataType, XOnCancelActionsType) => ZalgoPromise<void>;

export function buildXOnCancelData({ orderID } : { orderID : string }) : XOnCancelDataType {
    return {
        orderID
    };
}

export function buildXOnCancelActions() : XOnCancelActionsType {
    const redirect = (url) => {
        if (!url) {
            throw new Error(`Expected redirect url`);
        }

        if (url.indexOf('://') === -1) {
            getLogger().warn('redir_url_non_scheme', { url }).flush();
            throw new Error(`Invalid redirect url: ${ url } - must be fully qualified url`);
        } else if (!url.match(/^https?:\/\//)) {
            getLogger().warn('redir_url_non_http', { url }).flush();
        }

        return redir(url, window.top);
    };
    
    // $FlowFixMe
    return {
        redirect
    };
}

export type OnCancel = () => ZalgoPromise<void>;

export function getOnCancel(xprops : XProps, { createOrder } : { createOrder : CreateOrder }) : OnCancel {
    const { onCancel = noop, onError, buttonSessionID } = xprops;

    return memoize(() => {
        return createOrder().then(orderID => {
            getLogger()
                .info('button_cancel')
                .track({
                    [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                    [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.CHECKOUT_CANCEL,
                    [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID
                }).flush();

            return onCancel(buildXOnCancelData({ orderID }), buildXOnCancelActions());
        }).catch(err => {
            return onError(err);
        });
    });
}

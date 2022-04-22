/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { memoize, redirect as redir } from '@krakenjs/belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { getLogger, promiseNoop } from '../lib';
import { FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';

import type { CreateOrder } from './createOrder';
import type { OnError } from './onError';


export type OnComplete = () => ZalgoPromise<void>;

export type XOnCompleteData = {|
    orderID : string
|};
export type XOnCompleteActions = {|
    redirect : (string) => ZalgoPromise<void>
|};
export type XOnComplete = (XOnCompleteData, XOnCompleteActions) => ZalgoPromise<void>;

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

export function getOnComplete({ createOrder, onComplete, onError } : {| createOrder : CreateOrder, onComplete : ?XOnComplete, onError : OnError |}) : OnComplete {
    if (!onComplete) {
        return promiseNoop;
    }

    return memoize(() => {
        return createOrder().then(orderID => {
            getLogger()
                .info('button_complete')
                .track({
                    [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CHECKOUT_COMPLETE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();
            return onComplete({ orderID }, { redirect }).catch(err => {
                return ZalgoPromise.try(() => {
                    return onError(err);
                }).then(() => {
                    throw err;
                });
            });
        });
    });
}

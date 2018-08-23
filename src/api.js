/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, request, noop } from 'belter/src';

import { API_URI } from './config';
import { ACCESS_TOKEN_HEADER, HEADERS } from './constants';

let defaultHeaders = {};
let csrfToken = '';

type APIRequest = {
    url : string,
    method? : string,
    json? : Object
};

function callAPI({ url, method = 'get', json } : APIRequest) : ZalgoPromise<Object> {

    let reqHeaders = {
        ...defaultHeaders,
        [ HEADERS.CSRF_TOKEN ]: csrfToken
    };

    return request({ url, method, headers: reqHeaders, json })
        .then(({ status, headers: resHeaders, body }) => {
            csrfToken = resHeaders[HEADERS.CSRF_TOKEN];

            if (body.ack === 'contingency') {
                throw new Error(body.contingency);
            }

            if (status > 400) {
                throw new Error(`Api: ${ url } returned status code: ${ status }`);
            }

            if (body.ack !== 'success') {
                throw new Error(`Api: ${ url } returned ack: ${ body.ack }`);
            }

            return body.data;
        });
}

export type AuthResponse = {

};

export function getAuth() : ZalgoPromise<AuthResponse> {
    return callAPI({
        url: API_URI.AUTH
    });
}

export type OrderResponse = {

};

export function getOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callAPI({
        url: `${ API_URI.ORDER }/${ orderID }`
    });
}

export function captureOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/capture`
    });
}

export function authorizeOrder(orderID : string) : ZalgoPromise<OrderResponse> {
    return callAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/authorize`
    });
}

export let persistAccessToken = memoize((accessToken) : ZalgoPromise<void> => {
    defaultHeaders[ACCESS_TOKEN_HEADER] = accessToken;
    return getAuth().then(noop);
});

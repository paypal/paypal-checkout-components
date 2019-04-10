/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, request, noop } from 'belter/src';

import { API_URI } from './config';
import { ACCESS_TOKEN_HEADER, HEADERS, SMART_BUTTONS, SMART_PAYMENT_BUTTONS } from './constants';

const defaultHeaders = {};
let csrfToken = '';

type APIRequest = {|
    url : string,
    method? : string,
    json? : $ReadOnlyArray<mixed> | Object
|};

function callAPI({ url, method = 'get', json } : APIRequest) : ZalgoPromise<Object> {

    const reqHeaders = {
        ...defaultHeaders,
        [ HEADERS.CSRF_TOKEN ]:   csrfToken,
        [ HEADERS.SOURCE ]:       SMART_BUTTONS,
        [ HEADERS.REQUESTED_BY ]: SMART_PAYMENT_BUTTONS
    };

    return request({ url, method, headers: reqHeaders, json })
        .then(({ status, headers: resHeaders, body }) => {
            csrfToken = resHeaders[HEADERS.CSRF_TOKEN];

            if (body.ack === 'contingency') {
                const err = new Error(body.contingency);
                // $FlowFixMe
                err.data = body.data;
                throw err;
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

export function callGraphQL<T>(query : string, variables : { [string] : mixed }) : ZalgoPromise<T> {
    return request({
        url:     API_URI.GRAPHQL,
        method:  'POST',
        json:    {
            query,
            variables
        }
    }).then(({ status, body }) => {
        const errors = (body.errors || []).filter(error => (error.message !== 'ACCOUNT_CANNOT_BE_FETCHED'));

        if (errors.length) {
            const message = errors[0].message || JSON.stringify(errors[0]);
            throw new Error(message);
        }

        if (status !== 200) {
            throw new Error(`${ API_URI.GRAPHQL } returned status ${ status }`);
        }

        return body;
    });
}

export type AuthResponse = {|

|};

export function getAuth() : ZalgoPromise<AuthResponse> {
    return callAPI({
        url: API_URI.AUTH
    });
}

export type OrderResponse = {|

|};

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

export function billingTokenToOrderID(billingToken : string) : ZalgoPromise<string> {
    return callAPI({
        method: 'post',
        url:    `${ API_URI.PAYMENT }/${ billingToken }/ectoken`
    }).then(data => {
        return data.token;
    });
}

export function patchOrder(orderID : string, patch : []) : ZalgoPromise<OrderResponse> {
    return callAPI({
        method: 'post',
        url:    `${ API_URI.ORDER }/${ orderID }/patch`,
        json:   { data: { patch } }
    });
}

export const persistAccessToken = memoize((accessToken) : ZalgoPromise<void> => {
    defaultHeaders[ACCESS_TOKEN_HEADER] = accessToken;
    return getAuth().then(noop);
});

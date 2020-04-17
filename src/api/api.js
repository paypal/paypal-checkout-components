/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request } from 'belter/src';

import { GRAPHQL_URI } from '../config';
import { HEADERS, SMART_PAYMENT_BUTTONS } from '../constants';

type RESTAPIParams<D> = {|
    accessToken : string,
    method? : string,
    url : string,
    data? : D,
    headers? : { [string] : string }
|};

export function callRestAPI<D, T>({ accessToken, method, url, data, headers } : RESTAPIParams<D>) : ZalgoPromise<T> {

    if (!accessToken) {
        throw new Error(`No access token passed to ${ url }`);
    }

    const requestHeaders = {
        [ HEADERS.AUTHORIZATION ]: `Bearer ${ accessToken }`,
        [ HEADERS.CONTENT_TYPE ]:  `application/json`,
        ...headers
    };

    return request({
        method,
        url,
        headers: requestHeaders,
        json:    data
    }).then(({ status, body, headers: responseHeaders }) : T => {
        if (status >= 300) {
            throw new Error(`${ url } returned status: ${ status } (Corr ID: ${ responseHeaders[HEADERS.PAYPAL_DEBUG_ID] })`);
        }

        return body;
    });
}

type APIRequest = {|
    accessToken? : ?string,
    url : string,
    method? : string,
    json? : $ReadOnlyArray<mixed> | Object,
    headers? : { [string] : string }
|};

export function callSmartAPI({ accessToken, url, method = 'get', headers: reqHeaders = {}, json } : APIRequest) : ZalgoPromise<Object> {

    reqHeaders[HEADERS.REQUESTED_BY] = SMART_PAYMENT_BUTTONS;

    if (accessToken) {
        reqHeaders[HEADERS.ACCESS_TOKEN] = accessToken;
    }
    
    return request({ url, method, headers: reqHeaders, json })
        .then(({ status, body, headers }) => {
            if (body.ack === 'contingency') {
                const err = new Error(body.contingency);
                // $FlowFixMe
                err.data = body.data;
                throw err;
            }

            if (status > 400) {
                throw new Error(`Api: ${ url } returned status code: ${ status } (Corr ID: ${ headers[HEADERS.PAYPAL_DEBUG_ID] })`);
            }

            if (body.ack !== 'success') {
                throw new Error(`Api: ${ url } returned ack: ${ body.ack } (Corr ID: ${ headers[HEADERS.PAYPAL_DEBUG_ID] })`);
            }

            return body.data;
        });
}

export function callGraphQL<T>({ query, variables = {}, headers = {} } : {| query : string, variables? : { [string] : mixed }, headers? : { [string] : string } |}) : ZalgoPromise<T> {
    return request({
        url:     GRAPHQL_URI,
        method:  'POST',
        json:    {
            query,
            variables
        },
        headers: {
            'x-app-name': SMART_PAYMENT_BUTTONS,
            ...headers
        }
    }).then(({ status, body }) => {
        const errors = body.errors || [];

        if (errors.length) {
            const message = errors[0].message || JSON.stringify(errors[0]);
            throw new Error(message);
        }

        if (status !== 200) {
            throw new Error(`${ GRAPHQL_URI } returned status ${ status }`);
        }

        return body.data;
    });
}

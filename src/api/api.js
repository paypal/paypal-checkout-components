/* @flow */

import { FPTI_KEY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { request } from '@krakenjs/belter/src';

import { GRAPHQL_URI } from '../config';
import { FPTI_CUSTOM_KEY, FPTI_TRANSITION, HEADERS, SMART_PAYMENT_BUTTONS, STATUS_CODES } from '../constants';
import { getLogger } from '../lib';

type RESTAPIParams<D> = {|
    accessToken : string,
    method? : string,
    url : string,
    data? : D,
    headers? : { [string] : string },
    eventName : string
|};

export function callRestAPI<D, T>({ accessToken, method, url, data, headers, eventName } : RESTAPIParams<D>) : ZalgoPromise<T> {

    if (!accessToken) {
        throw new Error(`No access token passed to ${ url }`);
    }

    // $FlowFixMe
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
            const error = new Error(`${ url } returned status ${ status } (Corr ID: ${ responseHeaders[HEADERS.PAYPAL_DEBUG_ID] }).\n\n${ JSON.stringify(body) }`);

            // $FlowFixMe
            error.response = { status, headers: responseHeaders, body };

            if (status === STATUS_CODES.TOO_MANY_REQUESTS) {
                getLogger().track({
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.CALL_REST_API,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: `Error: ${ status } - ${ body }`,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `URL: ${ url }`
                });
            }

            getLogger().warn(`rest_api_${ eventName }_error`);
            throw error;
        }

        return body;
    });
}

type SmartAPIRequest = {|
    authenticated? : boolean,
    accessToken? : ?string,
    url : string,
    method? : string,
    json? : $ReadOnlyArray<mixed> | Object,
    headers? : { [string] : string },
    eventName : string
|};

export type APIResponse = {|
    data : Object,
    headers : {| [$Values<typeof HEADERS>] : string |}
|};

export function callSmartAPI({ accessToken, url, method = 'get', headers: reqHeaders = {}, json, authenticated = true, eventName } : SmartAPIRequest) : ZalgoPromise<APIResponse> {

    reqHeaders[HEADERS.REQUESTED_BY] = SMART_PAYMENT_BUTTONS;

    if (authenticated && !accessToken) {
        throw new Error(`Buyer access token not present - can not call smart api: ${ url }`);
    }

    if (accessToken) {
        reqHeaders[HEADERS.ACCESS_TOKEN] = accessToken;
    }
    
    return request({ url, method, headers: reqHeaders, json })
        .then(({ status, body, headers }) => {
            if (body.ack === 'contingency') {
                const err = new Error(body.contingency);
                // $FlowFixMe
                err.response = { url, method, headers: reqHeaders, body };
                // $FlowFixMe
                err.data = body.data;

                getLogger().warn(`smart_api_${ eventName }_contingency_error`);
                throw err;
            }

            if (status === STATUS_CODES.TOO_MANY_REQUESTS) {
                getLogger().track({
                    [FPTI_KEY.TRANSITION]:      FPTI_TRANSITION.CALL_REST_API,
                    [FPTI_CUSTOM_KEY.ERR_DESC]: `Error: ${ status } - ${ body }`,
                    [FPTI_CUSTOM_KEY.INFO_MSG]: `URL: ${ url }`
                });
            }

            if (status > 400) {
                getLogger().warn(`smart_api_${ eventName }_status_${ status }_error`);
                throw new Error(`Api: ${ url } returned status code: ${ status } (Corr ID: ${ headers[HEADERS.PAYPAL_DEBUG_ID] })\n\n${ JSON.stringify(body) }`);
            }

            if (body.ack !== 'success') {
                getLogger().warn(`smart_api_${ eventName }_ack_error`);
                throw new Error(`Api: ${ url } returned ack: ${ body.ack } (Corr ID: ${ headers[HEADERS.PAYPAL_DEBUG_ID] })\n\n${ JSON.stringify(body) }`);
            }

            return { data: body.data, headers };
        });
}

export function callGraphQL<T>({ name, query, variables = {}, headers = {}, returnErrorObject = false } : {| name : string, query : string, variables? : { [string] : mixed }, headers? : { [string] : string }, returnErrorObject? : boolean |}) : ZalgoPromise<T> {
    return request({
        url:     `${ GRAPHQL_URI }?${ name }`,
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

            getLogger().warn(`graphql_${ name }_error`, { err: message });

            if (returnErrorObject) {
                throw errors[0];
            }

            throw new Error(message);
        }

        if (status !== 200) {
            getLogger().warn(`graphql_${ name }_status_${ status }_error`);
            throw new Error(`${ GRAPHQL_URI } returned status ${ status }\n\n${ JSON.stringify(body) }`);
        }

        return body.data;
    });
}

export type Response = {|
    data : mixed,
    headers : {|
        [string] : string
    |}
|};

export function getResponseCorrelationID(res : Response) : ?string {
    return res.headers[HEADERS.PAYPAL_DEBUG_ID];
}

export function getErrorResponseCorrelationID(err : mixed) : ?string {
    // $FlowFixMe
    const res : Response = err?.response;
    if (res) {
        return getResponseCorrelationID(res);
    }
}

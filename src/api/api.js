/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request } from 'belter/src';

import { API_URI } from '../config';
import { HEADERS, SMART_BUTTONS, SMART_PAYMENT_BUTTONS } from '../constants';

const headerBuilders = [];

export function addHeaderBuilder(builder : () => { [string] : string }) {
    headerBuilders.push(builder);
}

type APIRequest = {|
    url : string,
    method? : string,
    json? : $ReadOnlyArray<mixed> | Object
|};

export function callSmartAPI({ url, method = 'get', json } : APIRequest) : ZalgoPromise<Object> {

    let reqHeaders = {
        [ HEADERS.SOURCE ]:       SMART_BUTTONS,
        [ HEADERS.REQUESTED_BY ]: SMART_PAYMENT_BUTTONS
    };

    for (const headerBuilder of headerBuilders) {
        reqHeaders = {
            ...reqHeaders,
            ...headerBuilder()
        };
    }
    
    return request({ url, method, headers: reqHeaders, json })
        .then(({ status, body }) => {
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

export function callGraphQL<T>({ query, variables = {}, headers = {} } : { query : string, variables? : { [string] : mixed }, headers? : { [string] : string } }) : ZalgoPromise<T> {
    return request({
        url:     API_URI.GRAPHQL,
        method:  'POST',
        json:    {
            query,
            variables
        },
        headers: {
            ...headers
        }
    }).then(({ status, body }) => {
        const errors = body.errors || [];

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

/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, request, noop, inlineMemoize, base64encode } from 'belter/src';
import { UNKNOWN, FPTI_KEY } from '@paypal/sdk-constants';
import { SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';

import { API_URI, AUTH_API_URL, ORDERS_API_URL } from './config';
import { ACCESS_TOKEN_HEADER, HEADERS, SMART_BUTTONS, SMART_PAYMENT_BUTTONS, FPTI_TRANSITION, FPTI_CONTEXT_TYPE, FPTI_STATE } from './constants';
import { getLogger } from './log';

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
    return ZalgoPromise.try(() => {
        if (accessToken) {
            defaultHeaders[ACCESS_TOKEN_HEADER] = accessToken;
            return getAuth().then(noop);
        }
    });
});

export type OrderCreateRequest = {|
    intent? : 'CAPTURE' | 'AUTHORIZE',
    purchase_units : $ReadOnlyArray<{
        amount : {
            currency_code : string,
            value : string
        },
        payee? : {
            merchant_id? : string
        }
    }>
|};

export type OrderCaptureResponse = {||};
export type OrderGetResponse = {||};
export type OrderAuthorizeResponse = {||};

export function createAccessToken (clientID : string) : ZalgoPromise<string> {
    return inlineMemoize(createAccessToken, () => {

        getLogger().info(`rest_api_create_access_token`);

        const basicAuth = base64encode(`${ clientID }:`);

        return request({

            method:  `post`,
            url:     AUTH_API_URL,
            headers: {
                Authorization: `Basic ${ basicAuth }`
            },
            data: {
                grant_type: `client_credentials`
            }

        }).then(({ body }) => {

            if (body && body.error === 'invalid_client') {
                throw new Error(`Auth Api invalid client id: ${ clientID }:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            if (!body || !body.access_token) {
                throw new Error(`Auth Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
            }

            return body.access_token;
        });
    }, [ clientID ]);
}

export function createOrder(accessToken : string, order : OrderCreateRequest) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_order_token`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    const currency = window.xprops.currency;
    const intent = window.xprops.intent;
    const merchantID = window.xprops.merchantID;

    order = { ...order };

    if (order.intent && order.intent.toLowerCase() !== intent) {
        throw new Error(`Unexpected intent: ${ order.intent } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.INTENT }=${ order.intent.toLowerCase() } in the paypal script tag.`);
    }

    // $FlowFixMe
    order = { ...order, intent: intent.toUpperCase() };

    order.purchase_units = order.purchase_units.map(unit => {
        if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
            throw new Error(`Unexpected currency: ${ unit.amount.currency_code } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.CURRENCY }=${ unit.amount.currency_code } in the paypal script tag.`);
        }

        let payee = unit.payee;

        if (payee) {
            if (!merchantID) {
                throw new Error(`Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=XYZ in the paypal script tag. Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=${ UNKNOWN } if you do not have access to the merchant id`);
            }

            if (payee.merchant_id && merchantID[0] !== UNKNOWN && payee.merchant_id !== merchantID) {
                throw new Error(`Expected payee.merchant_id to be "${ merchantID[0] }"`);
            }
        }
        
        if (merchantID && merchantID[0] !== UNKNOWN) {
            payee = {
                ...payee,
                merchant_id: merchantID[0]
            };
        }

        return { ...unit, payee, amount: { ...unit.amount, currency_code: currency } };
    });

    order.application_context = order.application_context || {};

    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': window.xprops.partnerAttributionID
    };

    return request({
        method: `post`,
        url:    ORDERS_API_URL,
        headers,
        json:   order
    }).then(({ body }) : string => {

        if (!body || !body.id) {
            throw new Error(`Order Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }

        getLogger().track({
            [FPTI_KEY.STATE]:        FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CREATE_ORDER,
            [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
            [FPTI_KEY.TOKEN]:        body.id,
            [FPTI_KEY.CONTEXT_ID]:   body.id
        });

        return body.id;
    });
}

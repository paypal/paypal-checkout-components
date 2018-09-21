/* @flow */

import { getLogger, FPTI_KEY, getPayPalDomain, getIntent, getCurrency } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { on, send } from 'post-robot/src';
import { getAncestor, isSameDomain } from 'cross-domain-utils/src';
import { memoize, request, base64encode } from 'belter/src';

import { getOrderAPIUrl, getAuthAPIUrl } from '../config';
import { FPTI_STATE, FPTI_CONTEXT_TYPE, FPTI_TRANSITION } from '../constants';
import { isPayPalDomain } from '../lib';

type ProxyRest = {
    [string] : (...args : Array<mixed>) => ZalgoPromise<*>
};

let proxyRest : ProxyRest = {};

export type OrderCreateRequest = {
    intent? : 'CAPTURE' | 'AUTHORIZE',
    purchase_units : Array<{
        amount : {
            currency_code : string,
            value : string
        }
    }>
};

export type OrderCaptureResponse = {};
export type OrderGetResponse = {};
export type OrderAuthorizeResponse = {};

export let createAccessToken = memoize((clientID : string) : ZalgoPromise<string> => {
    getLogger().info(`rest_api_create_access_token`);

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(clientID);
    }

    let basicAuth : string = base64encode(`${ clientID }:`);

    return request({

        method:  `post`,
        url:     getAuthAPIUrl(),
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

}, { time: 10 * 60 * 1000 });

function logOrderResponse(orderID) {
    getLogger().track({
        [ FPTI_KEY.STATE ]:        FPTI_STATE.BUTTON,
        [ FPTI_KEY.TRANSITION ]:   FPTI_TRANSITION.CREATE_ORDER,
        [ FPTI_KEY.CONTEXT_TYPE ]: FPTI_CONTEXT_TYPE.ORDER_ID,
        [ FPTI_KEY.TOKEN ]:        orderID,
        [ FPTI_KEY.CONTEXT_ID ]:   orderID
    });
}

export function createOrder(clientID : string, order : OrderCreateRequest) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_order_token`);

    if (!clientID) {
        throw new Error(`Client ID not passed`);
    }

    if (proxyRest.createOrder && !proxyRest.createOrder.source.closed) {
        return proxyRest.createOrder(clientID, order);
    }

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    let currency = getCurrency();
    let intent = getIntent();

    order = { ...order };

    if (order.intent && order.intent !== intent) {
        throw new Error(`Unexpected intent: ${ order.intent } passed to order.create. Expected ${ intent }`);
    }

    // $FlowFixMe
    order = { ...order, intent: intent.toUpperCase() };

    order.purchase_units = order.purchase_units.map(unit => {
        if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
            throw new Error(`Unexpected intent: ${ unit.amount.currency_code } passed to order.create. Expected ${ currency }`);
        }

        return { ...unit, amount: { ...unit.amount, currency_code: currency } };
    });

    return createAccessToken(clientID).then((accessToken) : ZalgoPromise<Object> => {

        let headers : Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `post`,
            url:    getOrderAPIUrl(),
            headers,
            json:   order
        });

    }).then(({ body }) : string => {

        logOrderResponse(body.id);

        if (body && body.id) {
            return body.id;
        }

        throw new Error(`Order Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
    });
}

const PROXY_REST = `proxy_rest`;
let parentWin = getAncestor();

on(PROXY_REST, { domain: getPayPalDomain() }, ({ data }) => {
    proxyRest = data;
});

if (parentWin && isPayPalDomain() && !isSameDomain(parentWin)) {
    send(parentWin, PROXY_REST, { createAccessToken, createOrder })
        .catch(() => {
            // pass
        });
}

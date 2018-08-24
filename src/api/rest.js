/* @flow */

import { logger, FPTI_KEY } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { on, send } from 'post-robot/src';
import { getAncestor, isSameDomain, isFileProtocol } from 'cross-domain-utils/src';
import { memoize, request, base64encode } from 'belter/src';

import { URLS, DOMAINS } from '../config';
import { FPTI_STATE, FPTI_CONTEXT_TYPE, FPTI_TRANSITION } from '../constants';
import { isPayPalDomain } from '../lib';

type ProxyRest = {
    [string] : (...args : Array<mixed>) => ZalgoPromise<*>
};

let proxyRest : ProxyRest = {};

export let createAccessToken = memoize((clientID : string) : ZalgoPromise<string> => {

    logger.info(`rest_api_create_access_token`);

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(clientID);
    }

    let basicAuth : string = base64encode(`${ clientID }:`);

    return request({

        method:  `post`,
        url:     URLS.AUTH,
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
    logger.track({
        [ FPTI_KEY.STATE ]:        FPTI_STATE.BUTTON,
        [ FPTI_KEY.TRANSITION ]:   FPTI_TRANSITION.CREATE_ORDER,
        [ FPTI_KEY.CONTEXT_TYPE ]: FPTI_CONTEXT_TYPE.EC_TOKEN,
        [ FPTI_KEY.TOKEN ]:        orderID,
        [ FPTI_KEY.CONTEXT_ID ]:   orderID
    });
}

function getDefaultReturnUrl() : string {
    return isFileProtocol()
        ? `https://www.paypal.com`
        : `${ window.location.protocol }//${ window.location.host }`;
}

export function createOrder(clientID : string, orderDetails : Object) : ZalgoPromise<string> {

    logger.info(`rest_api_create_order_token`);

    if (!clientID) {
        throw new Error(`Client ID not passed`);
    }

    if (proxyRest.createOrder && !proxyRest.createOrder.source.closed) {
        return proxyRest.createOrder(clientID, orderDetails);
    }

    let { order, meta } = orderDetails;

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    order = { ...order };
    order.intent = order.intent || 'CAPTURE';
    order.application_context = order.application_context || {};
    order.application_context.return_url = order.application_context.return_url || getDefaultReturnUrl();
    order.application_context.cancel_url = order.application_context.cancel_url || getDefaultReturnUrl();
    order.purchase_units = order.purchase_units || [];
    order.purchase_units[0] = order.purchase_units[0] || {};
    order.purchase_units.forEach(unit => {
        unit.reference_id = unit.reference_id || Math.random().toString();
    });

    return createAccessToken(clientID).then((accessToken) : ZalgoPromise<Object> => {

        let headers : Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        if (meta && meta.partner_attribution_id) {
            headers['PayPal-Partner-Attribution-Id'] = meta.partner_attribution_id;
        }

        return request({
            method: `post`,
            url:    URLS.ORDER,
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

on(PROXY_REST, { domain: DOMAINS.PAYPAL }, ({ data }) => {
    proxyRest = data;
});

if (parentWin && isPayPalDomain() && !isSameDomain(parentWin)) {
    send(parentWin, PROXY_REST, { createAccessToken, createOrder })
        .catch(() => {
            // pass
        });
}

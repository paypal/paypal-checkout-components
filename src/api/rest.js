/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { on, send } from 'post-robot/src';
import { btoa } from 'Base64';
import { info, track } from 'beaver-logger/client';
import { getAncestor, isSameDomain, isFileProtocol } from 'cross-domain-utils/src';

import { config } from '../config';
import { FPTI } from '../constants';
import { request, memoize, isPayPalDomain } from '../lib';

let proxyRest : { [key : string] : <T>(...args : Array<mixed>) => ZalgoPromise<T> } = {};

export let createAccessToken = memoize((clientID : string) : ZalgoPromise<string> => {

    info(`rest_api_create_access_token`);

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(config.env, clientID);
    }

    let basicAuth : string = btoa(`${ clientID }:`);

    return request({

        method:  `post`,
        url:     config.urls.auth,
        headers: {
            Authorization: `Basic ${ basicAuth }`
        },
        data: {
            grant_type: `client_credentials`
        }

    }).then(res => {

        if (res && res.error === 'invalid_client') {
            throw new Error(`Auth Api invalid ${ config.env } client id: ${ clientID }:\n\n${ JSON.stringify(res, null, 4) }`);
        }

        if (!res || !res.access_token) {
            throw new Error(`Auth Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
        }

        return res.access_token;
    });

}, { time: 10 * 60 * 1000 });

function logOrderResponse(orderID) {
    track({
        [ FPTI.KEY.STATE ]:        FPTI.STATE.BUTTON,
        [ FPTI.KEY.TRANSITION ]:   FPTI.TRANSITION.CREATE_PAYMENT,
        [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE.EC_TOKEN,
        [ FPTI.KEY.TOKEN ]:        orderID,
        [ FPTI.KEY.CONTEXT_ID ]:   orderID
    });
}

function getDefaultReturnUrl() : string {
    return isFileProtocol()
        ? `https://www.paypal.com`
        : `${ window.location.protocol }//${ window.location.host }`;
}

export function createOrder(clientID : string, orderDetails : Object) : ZalgoPromise<string> {

    info(`rest_api_create_order_token`);

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ config.env }`);
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
    order.redirect_urls = order.redirect_urls || {};
    order.redirect_urls.return_url = order.redirect_urls.return_url || getDefaultReturnUrl();
    order.redirect_urls.cancel_url = order.redirect_urls.cancel_url || getDefaultReturnUrl();
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
            url:    config.urls.order,
            headers,
            json:   order
        });

    }).then((res) : string => {

        logOrderResponse(res.id);

        if (res && res.id) {
            return res.id;
        }

        throw new Error(`Payment Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
    });
}

const PROXY_REST = `proxy_rest`;
let parentWin = getAncestor();

on(PROXY_REST, { domain: config.paypal_domain_regex }, ({ data }) => {
    proxyRest = data;
});

if (parentWin && isPayPalDomain() && !isSameDomain(parentWin)) {
    send(parentWin, PROXY_REST, { createAccessToken, createOrder })
        .catch(() => {
            // pass
        });
}

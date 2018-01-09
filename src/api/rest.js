/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { on, send } from 'post-robot/src';
import { btoa } from 'Base64';
import { info, track } from 'beaver-logger/client';
import { getAncestor, isSameDomain, isFileProtocol } from 'cross-domain-utils/src';

import { config, FPTI, PAYMENT_TYPE } from '../config';
import { request, memoize, isPayPalDomain } from '../lib';

let proxyRest : { [key : string] : <T>(...args : Array<mixed>) => ZalgoPromise<T> } = {};

let createAccessToken = memoize((env : string, client : { [key : string] : string }) : ZalgoPromise<string> => {

    info(`rest_api_create_access_token`);

    env = env || config.env;

    let clientID : string = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(env, client);
    }

    let basicAuth : string = btoa(`${ clientID }:`);

    return request({

        method:  `post`,
        url:     config.authApiUrls[env],
        headers: {
            Authorization: `Basic ${ basicAuth }`
        },
        data: {
            grant_type: `client_credentials`
        }

    }).then(res => {

        if (res && res.error === 'invalid_client') {
            throw new Error(`Auth Api invalid ${ env } client id: ${ clientID }:\n\n${ JSON.stringify(res, null, 4) }`);
        }

        if (!res || !res.access_token) {
            throw new Error(`Auth Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
        }

        return res.access_token;
    });

}, { time: 10 * 60 * 1000 });

let createExperienceProfile = memoize((env : string, client : { [key : string] : string }, experienceDetails : Object = {}) : ZalgoPromise<string> => {

    info(`rest_api_create_experience_profile`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (proxyRest.createExperienceProfile && !proxyRest.createExperienceProfile.source.closed) {
        return proxyRest.createExperienceProfile(env, client, experienceDetails);
    }

    experienceDetails.temporary = true;
    experienceDetails.name = experienceDetails.name ? `${ experienceDetails.name }_${ Math.random().toString() }` : Math.random().toString();

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        return request({
            method:  `post`,
            url:     config.experienceApiUrls[env],
            headers: {
                Authorization: `Bearer ${ accessToken }`
            },
            json: experienceDetails
        });

    }).then((res) : string => {

        if (res && res.error) {
            throw new Error(res.error);
        }

        if (!res.id) {
            throw new Error(`No id in experience profile response:\n\n${ JSON.stringify(res, null, 4) }`);
        }

        return res.id;
    });

}, { time: 10 * 60 * 1000 });

function logPaymentResponse(res) {

    if (!res) {
        return;
    }

    let paymentToken;
    let paymentID;

    if (res.id) {
        paymentID = res.id;
    }

    if (res.links && res.links.length) {
        for (let i = 0; i < res.links.length; i++) {
            if (res.links[i].method === 'REDIRECT' && res.links[i].rel === 'approval_url') {
                let match = res.links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
                if (match) {
                    paymentToken = match[1];
                }
            }
        }
    }

    track({
        [ FPTI.KEY.STATE ]:        FPTI.STATE.BUTTON,
        [ FPTI.KEY.TRANSITION ]:   FPTI.TRANSITION.CREATE_PAYMENT,
        [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE[PAYMENT_TYPE.PAY_ID],
        [ FPTI.KEY.PAY_ID ]:       paymentID,
        [ FPTI.KEY.TOKEN ]:        paymentToken,
        [ FPTI.KEY.CONTEXT_ID ]:   paymentID
    });
}

function getDefaultReturnUrl() : string {
    return isFileProtocol()
        ? `https://www.paypal.com`
        : `${ window.location.protocol }//${ window.location.host }`;
}

function createPayment(env : string, client : { [key : string] : string }, paymentDetails : Object) : ZalgoPromise<string> {

    info(`rest_api_create_checkout_token`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    let { payment, experience, meta } = paymentDetails;

    if (!payment) {
        throw new Error(`Expected payment details to be passed`);
    }

    if (proxyRest.createPayment && !proxyRest.createPayment.source.closed) {
        return proxyRest.createPayment(env, client, { payment, experience, meta });
    }

    payment = { ...payment };
    payment.intent = payment.intent || 'sale';
    payment.redirect_urls = payment.redirect_urls || {};
    payment.redirect_urls.return_url = payment.redirect_urls.return_url || getDefaultReturnUrl();
    payment.redirect_urls.cancel_url = payment.redirect_urls.cancel_url || getDefaultReturnUrl();
    payment.payer = payment.payer || {};
    payment.payer.payment_method = payment.payer.payment_method || 'paypal';

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        return ZalgoPromise.try(() => {

            if (experience) {
                return ZalgoPromise.resolve(createExperienceProfile(env, client, experience));
            }

        }).then((experienceID) : ZalgoPromise<Object> => {

            if (experienceID) {
                payment.experience_profile_id = experienceID;
            }

            let headers : Object = {
                Authorization: `Bearer ${ accessToken }`
            };

            if (meta && meta.partner_attribution_id) {
                headers['PayPal-Partner-Attribution-Id'] = meta.partner_attribution_id;
            }

            return request({
                method: `post`,
                url:    config.paymentApiUrls[env],
                headers,
                json:   payment
            });
        });

    }).then((res) : string => {

        logPaymentResponse(res);

        if (res && res.id) {
            return res.id;
        }

        throw new Error(`Payment Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
    });
}

function getPayment(env : string, client : { [key : string] : string }, paymentID : string) : ZalgoPromise<Object> {

    info(`rest_api_get_order`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (!paymentID) {
        throw new Error(`Expected payment id`);
    }

    if (proxyRest.getPayment && !proxyRest.getPayment.source.closed) {
        return proxyRest.getPayment(env, client, paymentID);
    }

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        let headers: Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `get`,
            url:    `${ config.paymentApiUrls[env] }/${ paymentID }`,
            headers
        });
    });
}

function executePayment(env : string, client : { [key : string] : string }, paymentID : string, payerID : string) : ZalgoPromise<Object> {

    info(`rest_api_get_order`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (!paymentID) {
        throw new Error(`Expected payment id`);
    }

    if (proxyRest.executePayment && !proxyRest.executePayment.source.closed) {
        return proxyRest.executePayment(env, client, paymentID);
    }

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        let headers: Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `post`,
            url:    `${ config.paymentApiUrls[env] }/${ paymentID }/execute`,
            headers,
            json:   {
                payer_id: payerID
            }
        });
    });
}

function createOrder(env : string, client : { [key : string] : string }, paymentDetails : Object) : ZalgoPromise<string> {

    info(`rest_api_create_order_token`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    let { order, meta } = paymentDetails;

    if (!order) {
        throw new Error(`Expected order details to be passed`);
    }

    if (proxyRest.createOrder && !proxyRest.createOrder.source.closed) {
        return proxyRest.createOrder(env, client, { order, meta });
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

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        let headers: Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        if (meta && meta.partner_attribution_id) {
            headers['PayPal-Partner-Attribution-Id'] = meta.partner_attribution_id;
        }

        return request({
            method: `post`,
            url:    config.orderApiUrls[env],
            headers,
            json:   order
        });

    }).then((res) : string => {

        logPaymentResponse(res);

        if (res && res.id) {
            return res.id;
        }

        throw new Error(`Payment Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
    });
}

function getOrder(env : string, client : { [key : string] : string }, orderID : string) : ZalgoPromise<Object> {
 
    info(`rest_api_get_order`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (!orderID) {
        throw new Error(`Expected order id`);
    }

    if (proxyRest.getOrder && !proxyRest.getOrder.source.closed) {
        return proxyRest.getOrder(env, client, orderID);
    }

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        let headers: Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `get`,
            url:    `${ config.orderApiUrls[env] }/${ orderID }`,
            headers
        });
    });
}

function captureOrder(env : string, client : { [key : string] : string }, orderID : string) : ZalgoPromise<Object> {

    info(`rest_api_get_order`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (!orderID) {
        throw new Error(`Expected order id`);
    }

    if (proxyRest.captureOrder && !proxyRest.captureOrder.source.closed) {
        return proxyRest.captureOrder(env, client, orderID);
    }

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        let headers: Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `post`,
            url:    `${ config.orderApiUrls[env] }/${ orderID }/capture`,
            headers,
            json:   {
                is_final_capture: true
            }
        });
    });
}

export function createBillingAgreement(env : string, client : { [key : string] : string }, billingDetails : Object, experienceDetails? : ?Object) : ZalgoPromise<string> {

    info(`rest_api_create_billing_token`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (proxyRest.createBillingAgreement && !proxyRest.createBillingAgreement.source.closed) {
        return proxyRest.createBillingAgreement(env, client, billingDetails, experienceDetails);
    }

    billingDetails = { ...billingDetails };
    billingDetails.plan = billingDetails.plan || {};
    billingDetails.plan.merchant_preferences = billingDetails.plan.merchant_preferences || {};
    billingDetails.plan.merchant_preferences.return_url = billingDetails.plan.merchant_preferences.return_url || getDefaultReturnUrl();
    billingDetails.plan.merchant_preferences.cancel_url = billingDetails.plan.merchant_preferences.cancel_url || getDefaultReturnUrl();
    billingDetails.payer = billingDetails.payer || {};
    billingDetails.payer.payment_method = billingDetails.payer.payment_method || 'paypal';


    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        return ZalgoPromise.try(() => {

            if (experienceDetails) {
                return ZalgoPromise.resolve(createExperienceProfile(env, client, experienceDetails));
            }

        }).then((experienceID) : ZalgoPromise<Object> => {

            if (experienceID) {
                billingDetails.experience_profile_id = experienceID;
            }

            return request({
                method:  `post`,
                url:     config.billingApiUrls[env],
                headers: {
                    Authorization: `Bearer ${ accessToken }`
                },
                json: billingDetails
            });
        });

    }).then(res => {

        if (res && res.token_id) {
            return res.token_id;
        }

        throw new Error(`Billing Api response error:\n\n${ JSON.stringify(res, null, 4) }`);
    });
}

export let rest = {
    payment: {
        create:  createPayment,
        get:     getPayment,
        execute: executePayment
    },
    order: {
        create:  createOrder,
        get:     getOrder,
        capture: captureOrder
    },
    billingAgreement: {
        create: createBillingAgreement
    },
    experience: {
        create: createExperienceProfile
    }
};

const PROXY_REST = `proxy_rest`;
let parentWin = getAncestor();

on(PROXY_REST, { domain: config.paypal_domain_regex }, ({ data }) => {
    proxyRest = data;
});

if (parentWin && isPayPalDomain() && !isSameDomain(parentWin)) {
    send(parentWin, PROXY_REST, { createAccessToken, createExperienceProfile, createPayment, getPayment, executePayment, createBillingAgreement, createOrder, getOrder, captureOrder })
        .catch(() => {
            // pass
        });
}

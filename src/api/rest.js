/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { on, send } from 'post-robot/src';
import { base64encode } from 'belter/src';
import { info, track } from 'beaver-logger/client';
import { getAncestor, isSameDomain } from 'cross-domain-utils/src';

import { config } from '../config';
import { FPTI, PAYMENT_TYPE } from '../constants';
import { request, memoize, isPayPalDomain, uniqueID } from '../lib';

type ProxyRest = {
    [string] : (...args : $ReadOnlyArray<mixed>) => ZalgoPromise<*>
};

let proxyRest : ProxyRest = {};

const createAccessToken = memoize((env : string, client : { [key : string] : string }) : ZalgoPromise<string> => {

    info(`rest_api_create_access_token`);

    env = env || config.env;

    const clientID : string = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(env, client);
    }

    const basicAuth : string = base64encode(`${ clientID }:`);

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

const createExperienceProfile = memoize((env : string, client : { [key : string] : string }, experienceDetails : Object = {}) : ZalgoPromise<string> => {

    info(`rest_api_create_experience_profile`);

    env = env || config.env;

    const clientID = client[env];

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
                const match = res.links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
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
    return `https://www.paypal.com/checkoutnow/error`;
}

function createTracking(env : string, client : { [key : string] : string }, merchantID, trackingData) : Object {
    
    env = env || config.env;

    const clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    const trackingID = uniqueID();

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        const headers : Object = {
            Authorization: `Bearer ${ accessToken }`
        };

        return request({
            method: `put`,
            url:    `${ config.trackingApiUrls[env] }/${ merchantID }/${ trackingID }`,
            headers,
            json:   {
                'tracking_id':     trackingID,
                'additional_data': trackingData
            }
        });

    }).then(() => {
        return trackingID;
    });
}

function createPayment(env : string, client : { [key : string] : string }, paymentDetails : Object) : ZalgoPromise<string> {

    info(`rest_api_create_checkout_token`);

    env = env || config.env;

    const clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${ env }`);
    }

    let { payment, experience, meta, tracking } = paymentDetails;

    if (!payment) {
        throw new Error(`Expected payment details to be passed`);
    }

    if (proxyRest.createPayment && !proxyRest.createPayment.source.closed) {
        return proxyRest.createPayment(env, client, { payment, experience, meta, tracking });
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

            return ZalgoPromise.try(() => {

                if (tracking) {
                    return ZalgoPromise.resolve(createTracking(env, client, tracking.id, tracking.data));
                }

            }).then((trackingID) : ZalgoPromise<Object> => {

                if (experienceID) {
                    payment.experience_profile_id = experienceID;
                }

                const headers : Object = {
                    Authorization: `Bearer ${ accessToken }`
                };

                if (trackingID) {
                    headers['Paypal-Client-Metadata-Id'] = trackingID;
                }

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
        });

    }).then((res) : string => {

        logPaymentResponse(res);

        if (res && res.id) {
            return res.id;
        }

        throw new Error(`Payment Api response error:\n\n${ JSON.stringify(res, null, 4) }`);

    });
}

function createOrder(env : string, client : { [key : string] : string }, paymentDetails : Object) : ZalgoPromise<string> {

    info(`rest_api_create_order_token`);

    env = env || config.env;

    const clientID = client[env];

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
    order.application_context = order.application_context || {};
    order.application_context.return_url = order.application_context.return_url || getDefaultReturnUrl();
    order.application_context.cancel_url = order.application_context.cancel_url || getDefaultReturnUrl();
    order.purchase_units = order.purchase_units || [];
    order.purchase_units[0] = order.purchase_units[0] || {};
    order.purchase_units.forEach(unit => {
        unit.reference_id = unit.reference_id || Math.random().toString();
    });

    return createAccessToken(env, client).then((accessToken) : ZalgoPromise<Object> => {

        const headers : Object = {
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

export function createBillingAgreement(env : string, client : { [key : string] : string }, billingDetails : Object, experienceDetails? : ?Object) : ZalgoPromise<string> {

    info(`rest_api_create_billing_token`);

    env = env || config.env;

    const clientID = client[env];

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

export const rest = {
    payment: {
        create:  createPayment
    },
    order: {
        create:  createOrder
    },
    billingAgreement: {
        create: createBillingAgreement
    },
    experience: {
        create: createExperienceProfile
    }
};

const PROXY_REST = `proxy_rest`;
const parentWin = getAncestor();

on(PROXY_REST, { domain: config.paypal_domain_regex }, ({ data }) => {
    proxyRest = data;
});

if (parentWin && isPayPalDomain() && !isSameDomain(parentWin)) {
    send(parentWin, PROXY_REST, { createAccessToken, createExperienceProfile, createPayment, createBillingAgreement, createOrder })
        .catch(() => {
            // pass
        });
}

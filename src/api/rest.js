
import postRobot from 'post-robot/src';
import { btoa } from 'Base64';

import { config } from '../config';
import { request, isPayPalDomain } from '../lib';

let proxyRest = {};

export function createAccessToken(env, client) {

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createAccessToken) {
        return proxyRest.createAccessToken(env, client);
    }

    let basicAuth = btoa(`${clientID}:`);

    return request({

        method: `post`,
        url: config.authApiUrls[env],
        headers: {
            Authorization: `Basic ${basicAuth}`
        },
        body: {
            grant_type: `client_credentials`
        }

    }).then(res => {

        if (res && res.error === 'invalid_client') {
            throw new Error(`Auth Api invalid ${env} client id: ${clientID}:\n\n${JSON.stringify(res, 0, 4)}`);
        }

        if (!res || !res.access_token) {
            throw new Error(`Auth Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
        }

        return res.access_token;
    });
}

export function createCheckoutToken(env, client, paymentDetails) {

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createCheckoutToken) {
        return proxyRest.createCheckoutToken(env, client, paymentDetails);
    }

    paymentDetails = { ...paymentDetails };
    paymentDetails.intent = paymentDetails.intent || 'sale';
    paymentDetails.redirect_urls = paymentDetails.redirect_urls || {};
    paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';

    return createAccessToken(env, client).then(accessToken => {

        return request({
            method: `post`,
            url: config.paymentApiUrls[env],
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            json: paymentDetails
        });

    }).then(res => {

        if (res && res.links && res.links.length) {
            let links = res.links;

            for (let i = 0, len = links.length; i < len; i++) {
                if (links[i].method === 'REDIRECT' && links[i].rel === 'approval_url') {
                    let match = links[i].href.match(/token=((EC-)?[A-Z0-9]{17})/);
                    if (match) {
                        return match[1];
                    } else {
                        throw new Error(`Could not find token in approval url: ${links[i].href}`);
                    }
                }
            }

            throw new Error(`Could not find approval url`);
        }

        throw new Error(`Payment Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
    });
}

export function createBillingToken(env, client, billingDetails) {

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createBillingToken) {
        return proxyRest.createBillingToken(env, client, billingDetails);
    }

    billingDetails = { ...billingDetails };
    billingDetails.plan = billingDetails.plan || {};
    billingDetails.plan.merchant_preferences = billingDetails.plan.merchant_preferences || {};
    billingDetails.plan.merchant_preferences.return_url = billingDetails.plan.merchant_preferences.return_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.plan.merchant_preferences.cancel_url = billingDetails.plan.merchant_preferences.cancel_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.payer = billingDetails.payer || {};
    billingDetails.payer.payment_method = billingDetails.payer.payment_method || 'paypal';


    return createAccessToken(env, client).then(accessToken => {

        return request({
            method: `post`,
            url: config.billingApiUrls[env],
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            json: billingDetails
        });

    }).then(res => {

        if (res && res.token_id) {
            return res.token_id;
        }

        throw new Error(`Billing Api response error:\n\n${JSON.stringify(res, 0, 4)}`);
    });
}

export let rest = {
    payment: {
        create: createCheckoutToken
    },
    billingAgreement: {
        create: createBillingToken
    }
};

const PROXY_REST = `proxy_rest`;

if (isPayPalDomain() && window.parent !== window) {
    postRobot.sendToParent(PROXY_REST, { createAccessToken, createCheckoutToken, createBillingToken })
        .catch(() => {
            // pass
        });

} else {
    postRobot.on(PROXY_REST, { domain: config.paypal_domain_regex }, ({ data }) => {
        proxyRest = data;
    });
}

/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';
import * as postRobot from 'post-robot/src';
import { btoa } from 'Base64';
import * as $logger from 'beaver-logger/client';

import { config } from '../config';
import { request, memoize } from '../lib';

import { Button } from '../components';

let proxyRest : { [key : string] : () => SyncPromise<string> } = {};

let createAccessToken = memoize((env : string, client : { [key : string] : string }) : SyncPromise<string> => {

    $logger.info(`rest_api_create_access_token`);

    env = env || config.env;

    let clientID : string = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createAccessToken && !proxyRest.createAccessToken.source.closed) {
        return proxyRest.createAccessToken(env, client);
    }

    let basicAuth : string = btoa(`${clientID}:`);

    return request({

        method: `post`,
        url: config.authApiUrls[env],
        headers: {
            Authorization: `Basic ${basicAuth}`
        },
        data: {
            grant_type: `client_credentials`
        }

    }).then(res => {

        if (res && res.error === 'invalid_client') {
            throw new Error(`Auth Api invalid ${env} client id: ${clientID}:\n\n${JSON.stringify(res, null, 4)}`);
        }

        if (!res || !res.access_token) {
            throw new Error(`Auth Api response error:\n\n${JSON.stringify(res, null, 4)}`);
        }

        return res.access_token;
    });

}, { time: 10 * 60 * 1000 });

let createExperienceProfile = memoize((env : string, client : { [key : string] : string }, experienceDetails : Object = {}) : SyncPromise<string> => {

    $logger.info(`rest_api_create_experience_profile`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createExperienceProfile && !proxyRest.createExperienceProfile.source.closed) {
        return proxyRest.createExperienceProfile(env, client, experienceDetails);
    }

    experienceDetails.temporary = true;
    experienceDetails.name = experienceDetails.name ? `${experienceDetails.name}_${Math.random().toString()}` : Math.random().toString();

    return createAccessToken(env, client).then((accessToken) : SyncPromise<Object> => {

        return request({
            method: `post`,
            url: config.experienceApiUrls[env],
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            json: experienceDetails
        });

    }).then((res) : string => {

        if (res && res.error) {
            throw new Error(res.error);
        }

        if (!res.id) {
            throw new Error(`No id in experience profile response:\n\n${JSON.stringify(res, null, 4)}`);
        }

        return res.id;
    });

}, { time: 10 * 60 * 1000 });

function createCheckoutToken(env : string, client : { [key : string] : string }, paymentDetails : Object, experienceDetails? : ?Object) : SyncPromise<string> {

    $logger.info(`rest_api_create_checkout_token`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createCheckoutToken && !proxyRest.createCheckoutToken.source.closed) {
        return proxyRest.createCheckoutToken(env, client, paymentDetails, experienceDetails);
    }

    paymentDetails = { ...paymentDetails };
    paymentDetails.intent = paymentDetails.intent || 'sale';
    paymentDetails.redirect_urls = paymentDetails.redirect_urls || {};
    paymentDetails.redirect_urls.return_url = paymentDetails.redirect_urls.return_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.redirect_urls.cancel_url = paymentDetails.redirect_urls.cancel_url || `${window.location.protocol}//${window.location.host}`;
    paymentDetails.payer = paymentDetails.payer || {};
    paymentDetails.payer.payment_method = paymentDetails.payer.payment_method || 'paypal';

    return createAccessToken(env, client).then((accessToken) : SyncPromise<Object> => {

        return SyncPromise.try(() => {

            if (experienceDetails) {
                return createExperienceProfile(env, client, experienceDetails);
            }

        }).then((experienceID) : SyncPromise<Object> => {

            if (experienceID) {
                paymentDetails.experience_profile_id = experienceID;
            }

            return request({
                method: `post`,
                url: config.paymentApiUrls[env],
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                json: paymentDetails
            });
        });

    }).then((res) : string => {

        if (res && res.id) {
            return res.id;
        }

        throw new Error(`Payment Api response error:\n\n${JSON.stringify(res, null, 4)}`);
    });
}

export function createBillingToken(env : string, client : { [key : string] : string }, billingDetails : Object, experienceDetails? : ?Object) : SyncPromise<string> {

    $logger.info(`rest_api_create_billing_token`);

    env = env || config.env;

    let clientID = client[env];

    if (!clientID) {
        throw new Error(`Client ID not found for env: ${env}`);
    }

    if (proxyRest.createBillingToken && !proxyRest.createBillingToken.source.closed) {
        return proxyRest.createBillingToken(env, client, billingDetails, experienceDetails);
    }

    billingDetails = { ...billingDetails };
    billingDetails.plan = billingDetails.plan || {};
    billingDetails.plan.merchant_preferences = billingDetails.plan.merchant_preferences || {};
    billingDetails.plan.merchant_preferences.return_url = billingDetails.plan.merchant_preferences.return_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.plan.merchant_preferences.cancel_url = billingDetails.plan.merchant_preferences.cancel_url || `${window.location.protocol}//${window.location.host}`;
    billingDetails.payer = billingDetails.payer || {};
    billingDetails.payer.payment_method = billingDetails.payer.payment_method || 'paypal';


    return createAccessToken(env, client).then((accessToken) : SyncPromise<Object> => {

        return SyncPromise.try(() => {

            if (experienceDetails) {
                return createExperienceProfile(env, client, experienceDetails);
            }

        }).then((experienceID) : SyncPromise<Object> => {

            if (experienceID) {
                billingDetails.experience_profile_id = experienceID;
            }

            return request({
                method: `post`,
                url: config.billingApiUrls[env],
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                json: billingDetails
            });
        });

    }).then(res => {

        if (res && res.token_id) {
            return res.token_id;
        }

        throw new Error(`Billing Api response error:\n\n${JSON.stringify(res, null, 4)}`);
    });
}

export let rest = {
    payment: {
        create: createCheckoutToken
    },
    billingAgreement: {
        create: createBillingToken
    },
    experience: {
        create: createExperienceProfile
    }
};

const PROXY_REST = `proxy_rest`;

if (postRobot.isBridge() || Button.isChild()) {
    postRobot.sendToParent(PROXY_REST, { createAccessToken, createExperienceProfile, createCheckoutToken, createBillingToken })
        .catch(() => {
            // pass
        });

} else {
    postRobot.on(PROXY_REST, { domain: config.paypal_domain_regex }, ({ data }) => {
        proxyRest = data;
    });
}

/* @flow */

import type { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { request } from '@krakenjs/belter/src';

import { CREATE_SUBSCRIPTIONS_API_URL, SMART_API_URI } from '../config';
import { getLogger } from '../lib';

import { callSmartAPI } from './api';
import { createAccessToken } from './auth';

export type SubscriptionCreateRequest = {|
    plan_id : string,
    start_time? : string,
    quantity? : string,
    shipping_amount? : {|
        currency_code : string,
        value : string
    |},
    auto_renewal? : boolean,
    application_context? : {|
        brand_name? : string,
        locale? : string,
        shipping_preference? : string,
        user_action? : string
    |}
|};

type SubscriptionOptions = {|
    clientID : string,
    merchantID? : $ReadOnlyArray<string>,
    partnerAttributionID? : ?string
|};


// Create Subscription Request method
function createRequest(accessToken : string, subscriptionPayload : SubscriptionCreateRequest, partnerAttributionID? : ?string, eventName : string) : ZalgoPromise<string> {
    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': partnerAttributionID || ''
    };

    return request({
        method: `post`,
        url:    CREATE_SUBSCRIPTIONS_API_URL,
        headers,
        json:   subscriptionPayload
    }).then(({ body }) : string => {

        if (!body || !body.id) {
            getLogger().warn(`rest_api_${ eventName }_error`);
            throw new Error(`Create Subscription Api response error:\n\n${ JSON.stringify(body, null, 4) }`);
        }
        return body.id;
    });
}

export function createSubscription(accessToken : string, subscriptionPayload : SubscriptionCreateRequest, { partnerAttributionID, merchantID, clientID } : SubscriptionOptions) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    if (merchantID && merchantID[0]) {
        getLogger().info(`rest_api_subscriptions_recreate_access_token`);
        const eventName = 'v1_billing_subscriptions_recreate';

        return createAccessToken(clientID, { targetSubject: merchantID[0] }).then((thirdPartyAccessToken) : ZalgoPromise<string> => {
            return createRequest(thirdPartyAccessToken, subscriptionPayload, partnerAttributionID, eventName);
        });
    }

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    const eventName = 'v1_billing_subscriptions_create';
    return createRequest(accessToken, subscriptionPayload, partnerAttributionID, eventName);
}

// Revise Subscription API request
function reviseRequest(accessToken : string, subscriptionID : string, subscriptionPayload : ?SubscriptionCreateRequest, partnerAttributionID? : ?string, eventName : string) : ZalgoPromise<string> {
    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': partnerAttributionID || ''
    };

    return request({
        method: `post`,
        url:    `${ CREATE_SUBSCRIPTIONS_API_URL }/${ subscriptionID }/revise`,
        headers,
        json:   subscriptionPayload
    }).then(({ body, status }) : string => {

        if (status !== 200) {
            getLogger().warn(`rest_api_${ eventName }_error`);
            throw new Error(`Revise Subscription Api HTTP-${ status } response: error:\n\n${ JSON.stringify(body, null, 4) }`);
        }
        // for revision flow the same subscription id is returned
        return subscriptionID;
    });
}

export function reviseSubscription(accessToken : string, subscriptionID : string, subscriptionPayload : ?SubscriptionCreateRequest, { partnerAttributionID, merchantID, clientID } : SubscriptionOptions) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!subscriptionID) {
        throw new Error(`Expected subscription id to be passed as first argument to revise subscription api`);
    }

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    if (merchantID && merchantID[0]) {
        getLogger().info(`rest_api_subscriptions_recreate_access_token`);
        const eventName = 'v1_billing_subscriptions_revise_recreate';

        return createAccessToken(clientID, { targetSubject: merchantID[0] }).then((thirdPartyAccessToken) : ZalgoPromise<string> => {
            return reviseRequest(thirdPartyAccessToken, subscriptionID, subscriptionPayload, partnerAttributionID, eventName);
        });
    }

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    const eventName = 'v1_billing_subscriptions_revise_create';
    return reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID, eventName);
}

type SubscriptionAPICredentials = {|
    buyerAccessToken : ?string
|};

export type SubscriptionResponse = {||};

export function activateSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      'post',
        eventName:   'billagmt_subscriptions_activate',
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }/activate`
    }).then(({ data }) => {
        return data;
    });
}

export function getSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        eventName:   'billagmt_subscriptions_get',
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }`
    }).then(({ data }) => {
        return data;
    });
}

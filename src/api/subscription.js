/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { request } from 'belter/src';

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
    clientID : ?string,
    merchantID? : $ReadOnlyArray<string>,
    partnerAttributionID? : ?string
|};


// Create Subscription Request method
function createRequest(accessToken : string, subscriptionPayload : SubscriptionCreateRequest, partnerAttributionID? : ?string) : ZalgoPromise<string> {
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
        return createAccessToken(clientID, { targetSubject: merchantID[0] }).then((thirdPartyAccessToken) : ZalgoPromise<string> => {
            return createRequest(thirdPartyAccessToken, subscriptionPayload, partnerAttributionID);
        });
    }

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }
    return createRequest(accessToken, subscriptionPayload, partnerAttributionID);
}

// Revise Subscription API request
function reviseRequest(accessToken : string, subscriptionID : string, subscriptionPayload : ?SubscriptionCreateRequest, partnerAttributionID? : ?string) : ZalgoPromise<string> {
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
        return createAccessToken(clientID, { targetSubject: merchantID[0] }).then((thirdPartyAccessToken) : ZalgoPromise<string> => {
            return reviseRequest(thirdPartyAccessToken, subscriptionID, subscriptionPayload, partnerAttributionID);
        });
    }

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }
    return reviseRequest(accessToken, subscriptionID, subscriptionPayload, partnerAttributionID);
}

type SubscriptionAPICredentials = {|
    buyerAccessToken : ?string
|};

export type SubscriptionResponse = {||};

export function activateSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      `post`,
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }/activate`
    }).then(({ data }) => {
        return data;
    });
}

export function getSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }`
    }).then(({ data }) => {
        return data;
    });
}

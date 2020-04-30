/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import { request } from 'belter/src';

import { CREATE_SUBSCRIPTIONS_API_URL, SMART_API_URI } from '../config';
import { getLogger } from '../lib';

import { callSmartAPI } from './api';

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

export type SubscriptionResponse = {||};

type SubsriptionOptions = {|
    partnerAttributionID : ?string
|};

export function createSubscription(accessToken : string, subscriptionPayload : SubscriptionCreateRequest, { partnerAttributionID } : SubsriptionOptions) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': partnerAttributionID
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

export function reviseSubscription(accessToken : string, subscriptionID : string, subscriptionPayload : ?SubscriptionCreateRequest, { partnerAttributionID } : SubsriptionOptions) : ZalgoPromise<string> {
    getLogger().info(`rest_api_create_subscription_id`);

    if (!accessToken) {
        throw new Error(`Access token not passed`);
    }

    if (!subscriptionID) {
        throw new Error(`Expected subscription id to be passed as first argument to revise subscription api`);
    }

    if (!subscriptionPayload) {
        throw new Error(`Expected subscription payload to be passed`);
    }

    const headers : Object = {
        'Authorization':                 `Bearer ${ accessToken }`,
        'PayPal-Partner-Attribution-Id': partnerAttributionID
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

type SubscriptionAPICredentials = {|
    buyerAccessToken : ?string
|};

export function activateSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        method:      `post`,
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }/activate`
    });
}

export function getSubscription(subscriptionID : string, { buyerAccessToken } : SubscriptionAPICredentials) : ZalgoPromise<SubscriptionResponse> {
    return callSmartAPI({
        accessToken: buyerAccessToken,
        url:         `${ SMART_API_URI.SUBSCRIPTION }/${ subscriptionID }`
    });
}

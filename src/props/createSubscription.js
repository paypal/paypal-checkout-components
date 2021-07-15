/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { createAccessToken, createSubscription as createSubcriptionID, reviseSubscription } from '../api';
import { getLogger } from '../lib';

export type XCreateSubscriptionDataType = {||};

export type XCreateSubscriptionActionsType = {|
    subscription : {|
        create : (Object) => ZalgoPromise<string>,
        revise : (string, Object) => ZalgoPromise<string>
    |}
|};

export type XCreateSubscription = (?XCreateSubscriptionDataType, ?XCreateSubscriptionActionsType) => ZalgoPromise<string>;

export function buildXCreateSubscriptionData() : XCreateSubscriptionDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID, merchantID, clientID } : {| facilitatorAccessToken : string, partnerAttributionID? : ?string, merchantID? : $ReadOnlyArray<string>, clientID : string |}) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return createSubcriptionID(facilitatorAccessToken, data, { partnerAttributionID, merchantID, clientID });
    };

    const revise = (subscriptionID : string, data) => {
        return reviseSubscription(facilitatorAccessToken, subscriptionID, data, { partnerAttributionID, merchantID, clientID });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

type CreateSubscriptionXProps = {|
    createSubscription : ?XCreateSubscription,
    partnerAttributionID? : ?string,
    merchantID? : $ReadOnlyArray<string>,
    clientID : string
|};

export function getCreateSubscription({ createSubscription, partnerAttributionID, merchantID, clientID } : CreateSubscriptionXProps, { facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ?CreateSubscription {
    if (createSubscription) {
        // Recreate the accessToken if merchantId is passed.
        if (merchantID && merchantID[0]) {
            getLogger().info(`src_props_subscriptions_recreate_access_token_cache`);
            createAccessToken(clientID, { targetSubject: merchantID[0] });
        }
        return () => {
            return createSubscription(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID, merchantID, clientID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        };
    }
}

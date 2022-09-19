/* @flow */

import { type ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { createAccessToken, createSubscription as createSubcriptionID, reviseSubscription } from '../api';
import { getLogger } from '../lib';

export type XCreateSubscriptionDataType = {|
    paymentSource : $Values<typeof FUNDING> | null
|};

export type XCreateSubscriptionActionsType = {|
    subscription : {|
        create : (Object) => ZalgoPromise<string>,
        revise : (string, Object) => ZalgoPromise<string>
    |}
|};

export type XCreateSubscription = (?XCreateSubscriptionDataType, ?XCreateSubscriptionActionsType) => ZalgoPromise<string>;

export function buildXCreateSubscriptionData({ paymentSource } : {| paymentSource : $Values<typeof FUNDING> | null |}) : XCreateSubscriptionDataType {
    return { paymentSource };
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
    clientID : string,
    paymentSource : $Values<typeof FUNDING> | null
|};

export function getCreateSubscription({ createSubscription, partnerAttributionID, merchantID, clientID, paymentSource } : CreateSubscriptionXProps, { facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ?CreateSubscription {
    if (createSubscription) {
        // Recreate the accessToken if merchantId is passed.
        if (merchantID && merchantID[0]) {
            getLogger().info(`src_props_subscriptions_recreate_access_token_cache`);
            createAccessToken(clientID, { targetSubject: merchantID[0] });
        }
        return () => {
            return createSubscription(buildXCreateSubscriptionData({ paymentSource }), buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID, merchantID, clientID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        };
    }
}

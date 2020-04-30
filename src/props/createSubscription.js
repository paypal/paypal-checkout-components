/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { createSubscription as createSubcriptionID, reviseSubscription } from '../api';

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

export function buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID } : {| facilitatorAccessToken : string, partnerAttributionID : ?string |}) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return createSubcriptionID(facilitatorAccessToken, data, { partnerAttributionID });
    };

    const revise = (subscriptionID : string, data) => {
        return reviseSubscription(facilitatorAccessToken, subscriptionID, data, { partnerAttributionID });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

type CreateSubscriptionXProps = {|
    createSubscription : ?XCreateSubscription,
    partnerAttributionID : ?string
|};

export function getCreateSubscription({ createSubscription, partnerAttributionID } : CreateSubscriptionXProps, { facilitatorAccessToken } : {| facilitatorAccessToken : string |}) : ?CreateSubscription {
    if (createSubscription) {
        return () => {
            return createSubscription(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        };
    }
}

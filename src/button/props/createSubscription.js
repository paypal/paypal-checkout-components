/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { createSubscription, reviseSubscription } from '../../api';

import type { XProps } from './types';

export type XCreateSubscriptionDataType = {||};

export type XCreateSubscriptionActionsType = {|
    subscription : {
        create : (Object) => ZalgoPromise<string>,
        revise : (string, Object) => ZalgoPromise<string>
    }
|};

export type XCreateSubscription = (?XCreateSubscriptionDataType, ?XCreateSubscriptionActionsType) => ZalgoPromise<string>;

export function buildXCreateSubscriptionData() : XCreateSubscriptionDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID } : { facilitatorAccessToken : string, partnerAttributionID : ?string }) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return createSubscription(facilitatorAccessToken, data, { partnerAttributionID });
    };

    const revise = (subscriptionID : string, data) => {
        return reviseSubscription(facilitatorAccessToken, subscriptionID, data, { partnerAttributionID });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

export function getCreateSubscription(xprops : XProps, { facilitatorAccessToken } : { facilitatorAccessToken : string }) : ?CreateSubscription {
    const { createSubscription: createSubscriptionFunc, partnerAttributionID } = xprops;
    if (createSubscriptionFunc) {
        return () => {
            return createSubscriptionFunc(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ facilitatorAccessToken, partnerAttributionID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        };
    }
}

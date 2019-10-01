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

export function buildXCreateSubscriptionActions({ facilitatorAccessTokenPromise, partnerAttributionID } : { facilitatorAccessTokenPromise : ZalgoPromise<string>, partnerAttributionID : ?string }) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return facilitatorAccessTokenPromise.then(accessToken => {
            return createSubscription(accessToken, data, { partnerAttributionID });
        });
    };

    const revise = (subscriptionID : string, data) => {
        return facilitatorAccessTokenPromise.then(accessToken => {
            return reviseSubscription(accessToken, subscriptionID, data, { partnerAttributionID });
        });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

export function getCreateSubscription(xprops : XProps, { facilitatorAccessTokenPromise } : { facilitatorAccessTokenPromise : ZalgoPromise<string> }) : ?CreateSubscription {
    const { createSubscription: createSubscriptionFunc, partnerAttributionID } = xprops;
    if (createSubscriptionFunc) {
        return () => {
            return createSubscriptionFunc(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ facilitatorAccessTokenPromise, partnerAttributionID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        };
    }
}

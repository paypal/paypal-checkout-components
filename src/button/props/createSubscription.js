/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import { createAccessToken, createSubscription, reviseSubscription } from '../../api';

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

export function buildXCreateSubscriptionActions({ clientID, partnerAttributionID } : { clientID : string, partnerAttributionID : ?string }) : XCreateSubscriptionActionsType {
    const create = (data) => {
        return createAccessToken(clientID).then(accessToken => {
            return createSubscription(accessToken, data, { partnerAttributionID });
        });
    };

    const revise = (subscriptionID : string, data) => {
        return createAccessToken(clientID).then(accessToken => {
            return reviseSubscription(accessToken, subscriptionID, data, { partnerAttributionID });
        });
    };

    return {
        subscription: { create, revise }
    };
}

export type CreateSubscription = XCreateSubscription;

export function getCreateSubscription(xprops : XProps) : ?CreateSubscription {
    const { createSubscription: createSubscriptionFunc, partnerAttributionID } = xprops;
    const { clientID } = xprops;
    if (createSubscriptionFunc) {
        return memoize(() => {
            return createSubscriptionFunc(buildXCreateSubscriptionData(), buildXCreateSubscriptionActions({ clientID, partnerAttributionID })).then(subscriptionID => {
                if (!subscriptionID || typeof subscriptionID !== 'string') {
                    throw new Error(`Expected an subscription id to be passed to createSubscription`);
                }

                return subscriptionID;
            });
        });
    }
}

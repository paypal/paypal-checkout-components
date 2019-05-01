/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';

import { createAccessToken, createOrderID, billingTokenToOrderID } from '../../api';

import type { CreateBillingAgreement } from './createBillingAgreement';
import type { XProps } from './types';

export type XCreateOrderDataType = {|
    
|};

export type XCreateOrderActionsType = {|
    order : {
        create : (Object) => ZalgoPromise<string>
    }
|};

export type XCreateOrder = (XCreateOrderDataType, XCreateOrderActionsType) => ZalgoPromise<string>;

export function buildXCreateOrderData() : XCreateOrderDataType {
    // $FlowFixMe
    return {};
}

export function buildXCreateOrderActions({ clientID } : { clientID : string }) : XCreateOrderActionsType {
    const create = (data) => {
        return createAccessToken(clientID).then(accessToken => {
            return createOrderID(accessToken, data);
        });
    };

    return {
        order: { create }
    };
}

export type CreateOrder = () => ZalgoPromise<string>;

export function getCreateOrder(xprops : XProps, { createBillingAgreement } : { createBillingAgreement : ?CreateBillingAgreement }) : CreateOrder {
    const { createOrder, clientID } = xprops;

    return memoize(() => {
        if (createBillingAgreement) {
            return createBillingAgreement().then(billingTokenToOrderID);
        } else if (createOrder) {
            return createOrder(buildXCreateOrderData(), buildXCreateOrderActions({ clientID }));
        } else {
            throw new Error(`No mechanism to create order`);
        }
    });
}

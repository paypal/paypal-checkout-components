/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import { FPTI_KEY } from '@paypal/sdk-constants/src';

import { createAccessToken, createOrderID, billingTokenToOrderID, subscriptionIdToCartId } from '../../api';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../../constants';
import { getLogger } from '../../lib';

import type { CreateSubscription } from './createSubscription';
import type { CreateBillingAgreement } from './createBillingAgreement';
import type { XProps } from './types';
 

export type XCreateOrderDataType = {||};

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

export function getCreateOrder(xprops : XProps, { createBillingAgreement, createSubscription } : { createBillingAgreement : ?CreateBillingAgreement, createSubscription : ?CreateSubscription }) : CreateOrder {
    const { createOrder, clientID, buttonSessionID } = xprops;

    const data = buildXCreateOrderData();
    const actions = buildXCreateOrderActions({ clientID });

    return memoize(() => {
        if (createBillingAgreement) {
            return createBillingAgreement().then(billingTokenToOrderID);
        }  else if (createSubscription) {
            return createSubscription().then(subscriptionIdToCartId);
        } else if (createOrder) {
            return createOrder(data, actions).then(orderID => {
                if (!orderID || typeof orderID !== 'string')  {
                    throw new Error(`Expected an order id to be passed to createOrder`);
                }

                getLogger().track({
                    [ FPTI_KEY.STATE ]:              FPTI_STATE.BUTTON,
                    [ FPTI_KEY.TRANSITION ]:         FPTI_TRANSITION.RECEIVE_ORDER,
                    [ FPTI_KEY.CONTEXT_TYPE ]:       FPTI_CONTEXT_TYPE.ORDER_ID,
                    [ FPTI_KEY.CONTEXT_ID ]:         orderID,
                    [ FPTI_KEY.BUTTON_SESSION_UID ]: buttonSessionID
                }).flush();

                return orderID;
            });
        } else {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value:         '0.01'
                        }
                    }
                ]
            });
        }
    });
}

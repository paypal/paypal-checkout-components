/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import { FPTI_KEY, SDK_QUERY_KEYS, INTENT, CURRENCY } from '@paypal/sdk-constants/src';

import { createOrderID, billingTokenToOrderID, subscriptionIdToCartId } from '../../api';
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

export type CreateOrder = () => ZalgoPromise<string>;

export function buildXCreateOrderData() : XCreateOrderDataType {
    // $FlowFixMe
    return {};
}

type OrderOptions = {|
    facilitatorAccessTokenPromise : ZalgoPromise<string>,
    intent : $Values<typeof INTENT>,
    currency : $Values<typeof CURRENCY>,
    merchantID : $ReadOnlyArray<string>,
    partnerAttributionID : ?string
|};

export function buildCreateOrder({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID } : OrderOptions) : CreateOrder {
    return (data) => {
    
        let order : Object = { ...data };
    
        if (order.intent && order.intent.toLowerCase() !== intent) {
            throw new Error(`Unexpected intent: ${ order.intent } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.INTENT }=${ order.intent.toLowerCase() } in the paypal script tag.`);
        }

        order = { ...order, intent: intent.toUpperCase() };
    
        order.purchase_units = order.purchase_units.map(unit => {
            if (unit.amount.currency_code && unit.amount.currency_code !== currency) {
                throw new Error(`Unexpected currency: ${ unit.amount.currency_code } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.CURRENCY }=${ unit.amount.currency_code } in the paypal script tag.`);
            }

            let payee = unit.payee;
    
            if (payee && merchantID && merchantID.length) {
                if (!merchantID[0]) {
                    throw new Error(`Pass ${ SDK_QUERY_KEYS.MERCHANT_ID }=XYZ in the paypal script tag.`);
                }
    
                if (payee.merchant_id && payee.merchant_id !== merchantID[0]) {
                    throw new Error(`Expected payee.merchant_id to be "${ merchantID[0] }"`);
                }
            }
    
            if (merchantID) {
                payee = {
                    ...payee,
                    merchant_id: merchantID[0]
                };
            }
    
            return { ...unit, payee, amount: { ...unit.amount, currency_code: currency } };
        });
    
        order.application_context = order.application_context || {};

        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return createOrderID(order, { facilitatorAccessToken, partnerAttributionID });
        });
    };
}

export function buildXCreateOrderActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID } : OrderOptions) : XCreateOrderActionsType {
    const create = buildCreateOrder({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID });

    return {
        order: { create }
    };
}

export function getCreateOrder(xprops : XProps, { facilitatorAccessTokenPromise, createBillingAgreement, createSubscription } : { facilitatorAccessTokenPromise : ZalgoPromise<string>, createBillingAgreement : ?CreateBillingAgreement, createSubscription : ?CreateSubscription }) : CreateOrder {
    const { createOrder, buttonSessionID, intent, currency, merchantID, partnerAttributionID } = xprops;

    const data = buildXCreateOrderData();
    const actions = buildXCreateOrderActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID });

    return memoize(() => {
        return ZalgoPromise.try(() => {
            if (createBillingAgreement) {
                return createBillingAgreement().then(billingTokenToOrderID);
            } else if (createSubscription) {
                return createSubscription().then(subscriptionIdToCartId);
            } else if (createOrder) {
                return createOrder(data, actions);
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
        }).then(orderID => {
            if (!orderID || typeof orderID !== 'string') {
                throw new Error(`Expected an order id to be passed`);
            }
    
            if (orderID.indexOf('PAY-') === 0 || orderID.indexOf('PAYID-') === 0) {
                throw new Error(`Do not pass PAY-XXX or PAYID-XXX directly into createOrder. Pass the EC-XXX token instead`);
            }
    
            getLogger().track({
                [FPTI_KEY.STATE]:              FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:         FPTI_TRANSITION.RECEIVE_ORDER,
                [FPTI_KEY.CONTEXT_TYPE]:       FPTI_CONTEXT_TYPE.ORDER_ID,
                [FPTI_KEY.CONTEXT_ID]:         orderID,
                [FPTI_KEY.BUTTON_SESSION_UID]: buttonSessionID
            }).flush();
    
            return orderID;
        });
    });
}

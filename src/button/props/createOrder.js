/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize } from 'belter/src';
import { FPTI_KEY, SDK_QUERY_KEYS, INTENT, CURRENCY } from '@paypal/sdk-constants/src';
import { getDomain } from 'cross-domain-utils/src';

import { createOrderID, billingTokenToOrderID, subscriptionIdToCartId, createPaymentToken } from '../../api';
import { FPTI_STATE, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../../constants';
import { getLogger } from '../../lib';
import { ENABLE_PAYMENT_API } from '../../config';

import type { CreateSubscription } from './createSubscription';
import type { CreateBillingAgreement } from './createBillingAgreement';
import type { XProps } from './types';
 

export type XCreateOrderDataType = {||};

type OrderActions = {|
    create : (Object) => ZalgoPromise<string>
|};

type PaymentActions = {|
    create : (Object) => ZalgoPromise<string>
|};

export type XCreateOrderActionsType = {|
    order : OrderActions,
    payment : ?PaymentActions
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

export function buildOrderActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID } : OrderOptions) : OrderActions {
    const create = (data) => {
    
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

    return { create };
}

export function buildPaymentActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID } : OrderOptions) : PaymentActions {
    const create = (data) => {

        let payment : Object = { ...data };

        const expectedIntent = (intent === INTENT.CAPTURE ? 'sale' : intent);

        if (payment.intent && payment.intent !== expectedIntent) {
            throw new Error(`Unexpected intent: ${ payment.intent } passed to order.create. Expected ${ expectedIntent }`);
        }

        payment = { ...payment, intent: expectedIntent };

        payment.transactions = payment.transactions.map(transaction => {
            if (transaction.amount.currency && transaction.amount.currency !== currency) {
                throw new Error(`Unexpected currency: ${ transaction.amount.currency } passed to order.create. Please ensure you are passing /sdk/js?${ SDK_QUERY_KEYS.CURRENCY }=${ transaction.amount.currency } in the paypal script tag.`);
            }

            let payee = transaction.payee;

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

            return { ...transaction, payee, amount: { ...transaction.amount, currency } };
        });

        payment.redirect_urls = payment.redirect_urls || {};
        payment.redirect_urls.return_url = payment.redirect_urls.return_url || `${ getDomain() }/checkoutnow/error`;
        payment.redirect_urls.cancel_url = payment.redirect_urls.cancel_url || `${ getDomain() }/checkoutnow/error`;
        payment.payer = payment.payer || {};
        payment.payer.payment_method = payment.payer.payment_method || 'paypal';

        return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
            return createPaymentToken(payment, { facilitatorAccessToken, partnerAttributionID });
        });
    };

    return { create };
}

export function buildXCreateOrderActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID } : OrderOptions) : XCreateOrderActionsType {
    const order = buildOrderActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID });
    const payment = buildPaymentActions({ facilitatorAccessTokenPromise, intent, currency, merchantID, partnerAttributionID });

    return {
        order,
        payment: ENABLE_PAYMENT_API ? payment : null
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

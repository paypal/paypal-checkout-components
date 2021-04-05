/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src/funding';

import { payWithNonce } from '../api';
import { getLogger, promiseNoop } from '../lib';

import type { PaymentFlow, PaymentFlowInstance } from './types';
import { checkout } from './checkout';

function setupNonce() {
// pass
}

function isNonceEligible({ props, serviceData }) : boolean {
    const { paymentMethodNonce, branded } = props;
    const { wallet } = serviceData;

    const instrument  = wallet?.card?.instruments.filter(({ tokenID })  => (tokenID === paymentMethodNonce))[0];

    if (!paymentMethodNonce) {
        return false;
    }

    if (!wallet) {
        return false;
    }

    if (!instrument) {
        return false;
    }

    if (!branded) {
        return false;
    }

    // Ensure wallet instruments are branded and have a valid tokenID.
    if (wallet.card.instruments.length === 0 ||
        !wallet.card.instruments.some(item => (item.tokenID && item.branded))) {
        return false;
    }

    return true;
}

function isNoncePaymentEligible({ props, payment, serviceData }) : boolean {

    const { branded } = props;
    const { wallet } = serviceData;

    const { fundingSource, paymentMethodID } = payment;

    const instrument  = wallet?.card?.instruments.filter(({ tokenID })  => (tokenID === paymentMethodID))[0];

    if (!instrument) {
        return false;
    }

    if (fundingSource !== FUNDING.CARD) {
        return false;
    }
    
    if (!branded || !instrument.branded) {
        return false;
    }

    if (!instrument?.tokenID) {
        return false;
    }

    return true;
}

function startPaymentWithNonce({ orderID, paymentMethodNonce, clientID, branded, buttonSessionID }) : ZalgoPromise<{| payerID : string |}> {
    getLogger().info('nonce_payment_initiated');

    if (!branded) {
        throw new Error(`Expected payment to be branded`);
    }

    return payWithNonce({ orderID, paymentMethodNonce, clientID, branded, buttonSessionID })
        .catch((error) => {
            getLogger().info('nonce_payment_failed');
            // $FlowFixMe
            error.code = 'PAY_WITH_DIFFERENT_CARD';
            throw error;
        });
}

function initNonce({ props, components, payment, serviceData, config }) : PaymentFlowInstance {
    const { createOrder, onApprove, clientID, branded, buttonSessionID } = props;
    const { wallet } = serviceData;
    const { paymentMethodID } = payment;

    const instrument  = wallet?.card?.instruments.filter(({ tokenID })  => (tokenID === paymentMethodID))[0];
    const paymentMethodNonce = instrument?.tokenID;

    if (!paymentMethodNonce) {
        getLogger().info('nonce_payment_failed');
        throw new Error('PAY_WITH_DIFFERENT_CARD');
    }

    const fallbackToWebCheckout = () => {
        getLogger().info('web_checkout_fallback').flush();
        return checkout.init({
            props, components, serviceData, payment, config
        });
    };

    const restart = () => {
        return fallbackToWebCheckout().start();
    };

    const start = () => {
        return createOrder().then(orderID => {
            getLogger().info('orderid_in_nonce', { orderID });
            return startPaymentWithNonce({ orderID, paymentMethodNonce, clientID, branded, buttonSessionID }).then(({ payerID }) => {
                return onApprove({ payerID }, { restart });
            });
        });
    };

    return {
        start,
        close: promiseNoop
    };
}


export const nonce : PaymentFlow = {
    name:              'nonce',
    setup:             setupNonce,
    isEligible:        isNonceEligible,
    isPaymentEligible: isNoncePaymentEligible,
    init:              initNonce,
    inline:            true
};

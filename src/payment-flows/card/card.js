/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from '../types';
import { getCardFields, hasCardFields, submitCardFields } from '../../card/interface';
import { promiseNoop } from '../../lib';

function setupCardField() {
    // pass
}

function isCardFieldEligible({ props } : IsEligibleOptions) : boolean {
    const { vault, onShippingChange } = props;

    if (vault) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

function isCardFieldPaymentEligible({ payment } : IsPaymentEligibleOptions) : boolean {
    const { win, fundingSource } = payment || {};

    if (win) {
        return false;
    }

    if (fundingSource && fundingSource !== FUNDING.CARD) {
        return false;
    }
    
    if (!hasCardFields()) {
        return false;
    }

    return true;
}

function initCardField({ props } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, branded, vault, intent } = props;

    const click = () => {
        if (!getCardFields()) {
            return false;
        }
    };
    
    const start = () => {
        return submitCardFields({
            createOrder, onApprove, branded: branded ?? true, vault, intent
        });
    };

    const close = promiseNoop;

    return { click, start, close };
}

export const cardField : PaymentFlow = {
    name:              'card_field',
    setup:             setupCardField,
    isEligible:        isCardFieldEligible,
    isPaymentEligible: isCardFieldPaymentEligible,
    init:              initCardField,
    inline:            true,
    spinner:           true
};

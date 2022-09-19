/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from '../types';
import { getCardFields, hasCardFields, submitCardFields } from '../../card/interface';
import { promiseNoop } from '../../lib';

function setupCardField() {
    // pass
}

function isCardFieldEligible({ props } : IsEligibleOptions) : boolean {
    const { vault, onShippingChange, onShippingAddressChange, onShippingOptionsChange } = props;

    if (vault) {
        return false;
    }

    if (onShippingChange || onShippingAddressChange || onShippingOptionsChange) {
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

function initCardField({ serviceData } : InitOptions) : PaymentFlowInstance {
    const { facilitatorAccessToken } = serviceData;

    const click = () => {
        if (!getCardFields()) {
            return false;
        }
    };
    
    const start = () => {
        return submitCardFields({ facilitatorAccessToken });
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

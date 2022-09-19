/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { getDomain } from '@krakenjs/cross-domain-utils/src';
import { extendUrl } from '@krakenjs/belter/src';

import { WEB_CHECKOUT_URI } from '../config';
import { promiseNoop } from '../lib';
import { POPUP_BRIDGE_OPTYPE } from '../props';
import { USER_ACTION } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, SetupOptions, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from './types';

let parentPopupBridge;

function setupPopupBridge({ props } : SetupOptions) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { getPopupBridge } = props;
        if (getPopupBridge) {
            return getPopupBridge().then(bridge => {
                parentPopupBridge = bridge;
            });
        }
    });
}

function isPopupBridgeEligible({ props } : IsEligibleOptions) : boolean {
    const { onShippingChange, onShippingAddressChange, onShippingOptionsChange } = props;

    if (onShippingChange || onShippingAddressChange || onShippingOptionsChange) {
        return false;
    }

    return true;
}

function isPopupBridgePaymentEligible({ payment } : IsPaymentEligibleOptions) : boolean {
    const { win } = payment;

    if (win) {
        return false;
    }

    if (!parentPopupBridge) {
        return false;
    }

    return true;
}

function initPopupBridge({ props, payment } : InitOptions) : PaymentFlowInstance {

    const { createOrder, onApprove, onCancel, commit } = props;

    const { fundingSource } = payment;

    const start = () => {
        return createOrder().then(orderID => {

            if (!parentPopupBridge) {
                throw new Error(`Popup bridge required`);
            }
            
            const url = extendUrl(`${ getDomain() }${ WEB_CHECKOUT_URI }`, {
                query: {
                    fundingSource,
                    token:        orderID,
                    useraction:   commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
                    redirect_uri: parentPopupBridge.nativeUrl,
                    native_xo:    '1'
                }
            });
            return parentPopupBridge.start(url);

        }).then(({ opType, PayerID: payerID, paymentId: paymentID, ba_token: billingToken }) => {
            if (opType === POPUP_BRIDGE_OPTYPE.PAYMENT) {
                if (!payerID && !billingToken) {
                    throw new Error(`Expected payerID to be passed`);
                }

                return onApprove({ payerID, paymentID, billingToken }, { restart: start });
            }

            if (opType === POPUP_BRIDGE_OPTYPE.CANCEL) {
                return onCancel();
            }

            throw new Error(`Unhandleable opType: ${ opType }`);
        });
    };

    return {
        start,
        close: promiseNoop
    };
}

export const popupBridge : PaymentFlow = {
    name:              'popup_bridge',
    setup:             setupPopupBridge,
    isEligible:        isPopupBridgeEligible,
    isPaymentEligible: isPopupBridgePaymentEligible,
    init:              initPopupBridge,
    spinner:           true
};

/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';
import { extendUrl } from 'belter/src';

import type { ButtonProps } from '../button/props';
import { WEB_CHECKOUT_URI } from '../config';
import { promiseNoop } from '../lib';
import { POPUP_BRIDGE_OPTYPE } from '../props';
import { USER_ACTION } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';

let parentPopupBridge;

function setupPopupBridge({ props } : { props : ButtonProps }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { getPopupBridge } = props;
        if (getPopupBridge) {
            return getPopupBridge().then(bridge => {
                parentPopupBridge = bridge;
            });
        }
    });
}

function isPopupBridgeEligible({ props } : { props : ButtonProps }) : boolean {
    const { onShippingChange } = props;

    if (onShippingChange) {
        return false;
    }

    return true;
}

function isPopupBridgePaymentEligible({ payment } : { payment : Payment }) : boolean {
    const { win } = payment;

    if (win) {
        return false;
    }

    if (!parentPopupBridge) {
        return false;
    }

    return true;
}

function initPopupBridge({ props, payment } : { props : ButtonProps, payment : Payment }) : PaymentFlowInstance {
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
                    redirect_uri: parentPopupBridge.nativeUrl
                }
            });

            return parentPopupBridge.start(url);

        }).then(({ opType, PayerID: payerID, paymentId: paymentID, ba_token: billingToken }) => {
            if (opType === POPUP_BRIDGE_OPTYPE.PAYMENT) {
                if (!payerID) {
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

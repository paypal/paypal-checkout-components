/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';
import { extendUrl } from 'belter/src';

import { EXPERIENCE_URI } from '../config';
import { promiseNoop } from '../lib';
import { POPUP_BRIDGE_OPTYPE, type Props } from '../button/props';
import { USER_ACTION } from '../constants';
import { createAccessToken } from '../api';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';

let parentPopupBridge;

function setupPopupBridge({ props } : { props : Props }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { getPopupBridge } = props;
        if (getPopupBridge) {
            return getPopupBridge().then(bridge => {
                parentPopupBridge = bridge;
            });
        }
    });
}

function isPopupBridgeEligible({ props, payment } : { props : Props, payment : Payment }) : boolean {
    const { win } = payment;
    const { onShippingChange } = props;

    if (win) {
        return false;
    }

    if (!parentPopupBridge) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

function initPopupBridge({ props, payment } : { props : Props, payment : Payment }) : PaymentFlowInstance {
    const { clientID, createOrder, onApprove, onCancel, commit } = props;
    const { fundingSource } = payment;

    const start = () => {
        const facilitatorAccessTokenPromise = createAccessToken(clientID);

        return createOrder().then(orderID => {
            if (!parentPopupBridge) {
                throw new Error(`Popup bridge required`);
            }
            
            const url = extendUrl(`${ getDomain() }${ EXPERIENCE_URI.CHECKOUT }`, {
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
                return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                    return onApprove({ payerID, paymentID, billingToken, facilitatorAccessToken }, { restart: start });
                });
            }

            if (opType === POPUP_BRIDGE_OPTYPE.CANCEL) {
                return onCancel();
            }

            throw new Error(`Unhandleable opType: ${ opType }`);
        });
    };

    return {
        start,
        close:        promiseNoop,
        triggerError: err => {
            throw err;
        }
    };
}

export const popupBridge : PaymentFlow = {
    setup:      setupPopupBridge,
    isEligible: isPopupBridgeEligible,
    init:       initPopupBridge,
    spinner:    true
};

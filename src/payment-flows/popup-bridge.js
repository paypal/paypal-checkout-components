/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';
import { extendUrl } from 'belter/src';

import type { PopupBridge, CreateOrder, OnApprove, OnCancel, OnShippingChange } from '../button/props';
import type { ProxyWindow } from '../types';
import { EXPERIENCE_URI } from '../config';
import { promiseNoop } from '../lib';
import { POPUP_BRIDGE_OPTYPE } from '../button/props/getPopupBridge';

type PopupBridgeEligibleProps = {|
    win : ?ProxyWindow,
    popupBridge : ?PopupBridge,
    onShippingChange : ?OnShippingChange
|};

export function isPopupBridgeEligible({ win, popupBridge, onShippingChange } : PopupBridgeEligibleProps) : boolean {
    if (win) {
        return false;
    }

    if (!popupBridge) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

type PopupBridgeInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type PopupBridgeProps = {|
    popupBridge : ?PopupBridge,
    createOrder : CreateOrder,
    onApprove : OnApprove,
    onCancel : OnCancel,
    commit : boolean
|};

const USER_ACTION = {
    COMMIT:   'commit',
    CONTINUE: 'continue'
};

export function initPopupBridge(props : PopupBridgeProps) : PopupBridgeInstance {
    const { popupBridge, createOrder, onApprove, onCancel, commit } = props;

    if (!popupBridge) {
        throw new Error(`Popup bridge required`);
    }

    const start = () => {
        return createOrder().then(orderID => {
            const url = extendUrl(`${ getDomain() }${ EXPERIENCE_URI.CHECKOUT }`, {
                query: {
                    token:        orderID,
                    useraction:   commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
                    redirect_uri: popupBridge.nativeUrl
                }
            });

            return popupBridge.start(url);

        }).then(({ opType, PayerID: payerID, paymentId: paymentID, ba_token: billingToken }) => {
            if (opType === POPUP_BRIDGE_OPTYPE.PAYMENT) {
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
        close:        promiseNoop,
        triggerError: err => {
            throw err;
        }
    };
}

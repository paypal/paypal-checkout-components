/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { getDomain } from 'cross-domain-utils/src';
import { extendUrl } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { PopupBridge, CreateOrder, OnApprove, OnCancel, OnShippingChange, GetPopupBridge } from '../button/props';
import type { ProxyWindow } from '../types';
import { EXPERIENCE_URI } from '../config';
import { promiseNoop } from '../lib';
import { POPUP_BRIDGE_OPTYPE } from '../button/props/getPopupBridge';
import { USER_ACTION } from '../constants';
import { createAccessToken } from '../api';

let popupBridge;

export function setupPopupBridge({ getPopupBridge } : { getPopupBridge : GetPopupBridge }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (getPopupBridge) {
            return getPopupBridge().then(bridge => {
                popupBridge = bridge;
            });
        }
    });
}

type PopupBridgeEligibleProps = {|
    win : ?ProxyWindow,
    onShippingChange : ?OnShippingChange
|};

export function isPopupBridgeEligible({ win, onShippingChange } : PopupBridgeEligibleProps) : boolean {
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
    clientID : string,
    popupBridge : ?PopupBridge,
    createOrder : CreateOrder,
    onApprove : OnApprove,
    onCancel : OnCancel,
    commit : boolean,
    fundingSource : $Values<typeof FUNDING>
|};

export function initPopupBridge(props : PopupBridgeProps) : PopupBridgeInstance {
    const { clientID, createOrder, onApprove, onCancel, commit, fundingSource } = props;

    const start = () => {
        const facilitatorAccessTokenPromise = createAccessToken(clientID);

        return createOrder().then(orderID => {
            if (!popupBridge) {
                throw new Error(`Popup bridge required`);
            }
            
            const url = extendUrl(`${ getDomain() }${ EXPERIENCE_URI.CHECKOUT }`, {
                query: {
                    fundingSource,
                    token:        orderID,
                    useraction:   commit ? USER_ACTION.COMMIT : USER_ACTION.CONTINUE,
                    redirect_uri: popupBridge.nativeUrl
                }
            });

            return popupBridge.start(url);

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

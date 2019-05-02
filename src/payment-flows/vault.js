/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { validatePaymentMethod } from '../api';
import type { CreateOrder, OnApprove, OnShippingChange } from '../button/props';

type VaultCaptureEligibleProps = {|
    paymentMethodID : ?string,
    onShippingChange : ?OnShippingChange
|};

export function isVaultCaptureEligible({ paymentMethodID, onShippingChange } : VaultCaptureEligibleProps) : boolean {
    if (!paymentMethodID) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

type VaultInstance = {|
    start : () => ZalgoPromise<mixed>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

type VaultProps = {|
    createOrder : CreateOrder,
    paymentMethodID : ?string,
    onApprove : OnApprove,
    clientAccessToken : ?string
|};

export function initVault(props : VaultProps) : VaultInstance {
    const { createOrder, paymentMethodID, onApprove, clientAccessToken } = props;

    if (!paymentMethodID) {
        throw new Error(`Payment method id required for vault capture`);
    }

    if (!clientAccessToken) {
        throw new Error(`Client access token required for vault capture`);
    }

    const restart = () => {
        return ZalgoPromise.try(() => {
            throw new Error(`Vault capture restart not implemented`);
        });
    };

    return {
        start: () => {
            return createOrder().then(orderID => {
                return validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID })
                    .then(() => onApprove({}, { restart }));
            });
        },
        close:        () => ZalgoPromise.resolve(),
        triggerError: err => {
            throw err;
        }
    };
}

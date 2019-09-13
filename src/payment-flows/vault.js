/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import type { ProxyWindow } from '../types';
import { validatePaymentMethod, type ValidatePaymentMethodResponse, createAccessToken } from '../api';
import type { CreateOrder, OnApprove, OnShippingChange } from '../button/props';
import { TARGET_ELEMENT } from '../constants';

type VaultCaptureEligibleProps = {|
    win : ?ProxyWindow,
    paymentMethodID : ?string,
    onShippingChange : ?OnShippingChange
|};

export function isVaultCaptureEligible({ win, paymentMethodID, onShippingChange } : VaultCaptureEligibleProps) : boolean {
    if (win) {
        return false;
    }
    
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
    clientID : string,
    createOrder : CreateOrder,
    paymentMethodID : ?string,
    onApprove : OnApprove,
    clientAccessToken : ?string,
    enableThreeDomainSecure : boolean
|};


type ThreeDomainSecureProps = {|
    createOrder : CreateOrder
|};

function handleThreeDomainSecure({ createOrder } : ThreeDomainSecureProps) : ZalgoPromise<void> {
    
    const promise = new ZalgoPromise();
    const instance = window.paypal.ThreeDomainSecure({
        createOrder,
        onSuccess: () => promise.resolve(),
        onCancel:  () => promise.reject(new Error(`3DS cancelled`)),
        onError:   (err) => promise.reject(err)
    });

    return instance.renderTo(window.parent, TARGET_ELEMENT.BODY)
        .then(() => promise)
        .finally(instance.close);
}

type HandleValidateResponse = {|
    status : number,
    body : ValidatePaymentMethodResponse,
    createOrder : CreateOrder
|};

function handleValidateResponse({ status, body, createOrder } : HandleValidateResponse) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (status === 422 && body.links && body.links.some(link => link.rel === '3ds-contingency-resolution')) {
            return handleThreeDomainSecure({ createOrder });
        }

        if (status !== 200) {
            throw new Error(`Validate payment failed with status: ${ status }`);
        }
    });
}

export function initVault(props : VaultProps) : VaultInstance {
    const { clientID, createOrder, paymentMethodID, onApprove, clientAccessToken, enableThreeDomainSecure } = props;

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

    const start = () => {
        const facilitatorAccessTokenPromise = createAccessToken(clientID);

        return ZalgoPromise.try(() => {
            return createOrder();
        }).then((orderID) => {
            return validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure });
        }).then(({ status, body }) => {
            return handleValidateResponse({ status, body, createOrder });
        }).then(() => {
            return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                return onApprove({ facilitatorAccessToken }, { restart });
            });
        });
    };

    return {
        start,
        close:        () => ZalgoPromise.resolve(),
        triggerError: err => {
            throw err;
        }
    };
}

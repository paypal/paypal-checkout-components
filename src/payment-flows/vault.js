/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { ProxyWindow, ThreeDomainSecureFlowType } from '../types';
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

type ThreeDomainSecureProps = {|
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    createOrder : CreateOrder,
    getParent : () => CrossDomainWindowType
|};

function handleThreeDomainSecure({ ThreeDomainSecure, createOrder, getParent } : ThreeDomainSecureProps) : ZalgoPromise<void> {
    
    const promise = new ZalgoPromise();
    const instance = ThreeDomainSecure({
        createOrder,
        onSuccess: () => promise.resolve(),
        onCancel:  () => promise.reject(new Error(`3DS cancelled`)),
        onError:   (err) => promise.reject(err)
    });

    return instance.renderTo(getParent(), TARGET_ELEMENT.BODY)
        .then(() => promise)
        .finally(instance.close);
}

type HandleValidateResponse = {|
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    status : number,
    body : ValidatePaymentMethodResponse,
    createOrder : CreateOrder,
    getParent : () => CrossDomainWindowType
|};

type VaultProps = {|
    ThreeDomainSecure : ThreeDomainSecureFlowType,
    clientID : string,
    createOrder : CreateOrder,
    paymentMethodID : ?string,
    onApprove : OnApprove,
    clientAccessToken : ?string,
    enableThreeDomainSecure : boolean,
    buttonSessionID : string,
    partnerAttributionID : ?string,
    getParent : () => CrossDomainWindowType
|};

function handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent } : HandleValidateResponse) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (status === 422 && body.links && body.links.some(link => link.rel === '3ds-contingency-resolution')) {
            return handleThreeDomainSecure({ ThreeDomainSecure, createOrder, getParent });
        }

        if (status !== 200) {
            throw new Error(`Validate payment failed with status: ${ status }`);
        }
    });
}

export function initVault(props : VaultProps) : VaultInstance {
    const { ThreeDomainSecure, clientID, createOrder, paymentMethodID, onApprove, clientAccessToken,
        enableThreeDomainSecure, buttonSessionID, partnerAttributionID, getParent } = props;

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
            return validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, buttonSessionID, partnerAttributionID });
        }).then(({ status, body }) => {
            return handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent });
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

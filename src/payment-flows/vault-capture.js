/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import type { ThreeDomainSecureFlowType } from '../types';
import type { CreateOrder } from '../props';
import { validatePaymentMethod, type ValidatePaymentMethodResponse, getSupplementalOrderInfo } from '../api';
import { TARGET_ELEMENT } from '../constants';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions } from './types';
import { checkout } from './checkout';

function setupVaultCapture() {
    // pass
}

function isVaultCaptureEligible({ props } : IsEligibleOptions) : boolean {
    const { onShippingChange } = props;

    if (onShippingChange) {
        return false;
    }

    return true;
}

function isVaultCapturePaymentEligible({ payment } : IsPaymentEligibleOptions) : boolean {
    const { win, paymentMethodID } = payment || {};

    if (win) {
        return false;
    }

    if (!paymentMethodID) {
        return false;
    }

    return true;
}

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

function initVaultCapture({ props, components, payment, serviceData, config } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, clientAccessToken,
        enableThreeDomainSecure, buttonSessionID, partnerAttributionID, getParent } = props;
    const { ThreeDomainSecure } = components;
    const { fundingSource, paymentMethodID } = payment;

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

    const fallbackToWebcheckout = () => {
        return checkout.init({ props, components, serviceData, payment: { ...payment, isClick: false }, config }).start();
    };

    const shippingRequired = (orderID) => {
        return getSupplementalOrderInfo(orderID).then(order => {
            const { flags: { isShippingAddressRequired }, cart: { shippingAddress } } = order.checkoutSession;

            if (!isShippingAddressRequired) {
                return false;
            }

            if (shippingAddress && shippingAddress.isFullAddress) {
                return false;
            }

            return true;
        });
    };

    const start = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return ZalgoPromise.hash({
                validate:        validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, buttonSessionID, partnerAttributionID }),
                requireShipping: shippingRequired(orderID)
            });
        }).then(({ validate, requireShipping }) => {
            if (requireShipping) {
                if (fundingSource !== FUNDING.PAYPAL) {
                    throw new Error(`Shipping address requested for ${ fundingSource } payment`);
                }

                return fallbackToWebcheckout();
            }

            const { status, body } = validate;
            return handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent }).then(() => {
                // $FlowFixMe
                return onApprove({}, { restart });
            });
        });
    };

    return {
        start,
        close: () => ZalgoPromise.resolve()
    };
}

export const vaultCapture : PaymentFlow = {
    name:              'vault_capture',
    setup:             setupVaultCapture,
    isEligible:        isVaultCaptureEligible,
    isPaymentEligible: isVaultCapturePaymentEligible,
    init:              initVaultCapture,
    spinner:           true,
    inline:            true
};

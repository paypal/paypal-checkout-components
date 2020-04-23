/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { destroyElement } from 'belter/src';

import type { ThreeDomainSecureFlowType, MenuChoices } from '../types';
import type { CreateOrder } from '../props';
import { validatePaymentMethod, type ValidatePaymentMethodResponse, getSupplementalOrderInfo, deleteVault } from '../api';
import { TARGET_ELEMENT, BUYER_INTENT } from '../constants';
import { getLogger } from '../lib';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions, MenuOptions } from './types';
import { checkout, CHECKOUT_POPUP_DIMENSIONS } from './checkout';

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

    const fallbackToWebCheckout = () => {
        getLogger().info('web_checkout_fallback').flush();
        return checkout.init({ props, components, serviceData, payment: { ...payment, isClick: false, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING }, config }).start();
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

                return fallbackToWebCheckout();
            }

            const { status, body } = validate;
            return handleValidateResponse({ ThreeDomainSecure, status, body, createOrder, getParent }).then(() => {
                return onApprove({}, { restart });
            });
        });
    };

    return {
        start,
        close: () => ZalgoPromise.resolve()
    };
}

const POPUP_OPTIONS = {
    width:  CHECKOUT_POPUP_DIMENSIONS.WIDTH,
    height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
};

function setupVaultMenu({ props, payment, serviceData, initiatePayment } : MenuOptions) : MenuChoices {
    const { clientAccessToken } = props;
    const { fundingSource, paymentMethodID, button } = payment;
    const { content } = serviceData;

    if (!clientAccessToken || !paymentMethodID) {
        throw new Error(`Client access token and payment method id required`);
    }

    if (fundingSource === FUNDING.PAYPAL) {
        return [
            {
                label:    content.chooseCardOrShipping,
                popup:    POPUP_OPTIONS,
                onSelect: ({ win }) => {
                    return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING } });
                }
            },
            {
                label:    content.useDifferentAccount,
                popup:    POPUP_OPTIONS,
                onSelect: ({ win }) => {
                    return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT } });
                }
            }
        ];
    }

    if (fundingSource === FUNDING.CARD) {
        return [
            {
                label:    content.deleteVaultedCard,
                spinner:  true,
                onSelect: () => {
                    return deleteVault({ paymentMethodID, clientAccessToken }).then(() => {
                        destroyElement(button);
                    });
                }
            }
        ];
    }

    throw new Error(`Can not render menu for ${ fundingSource }`);
}

export const vaultCapture : PaymentFlow = {
    name:              'vault_capture',
    setup:             setupVaultCapture,
    isEligible:        isVaultCaptureEligible,
    isPaymentEligible: isVaultCapturePaymentEligible,
    init:              initVaultCapture,
    setupMenu:         setupVaultMenu,
    spinner:           true,
    inline:            true
};



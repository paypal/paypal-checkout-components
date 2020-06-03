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
import { updateButtonClientConfig } from '../button/orders';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions, MenuOptions, Payment } from './types';
import { checkout, CHECKOUT_POPUP_DIMENSIONS } from './checkout';

const VAULT_MIN_WIDTH = 250;

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
    const { win, paymentMethodID, fundingSource } = payment;

    if (win) {
        return false;
    }

    if (!paymentMethodID) {
        return false;
    }

    if (window.innerWidth < VAULT_MIN_WIDTH && fundingSource === FUNDING.PAYPAL) {
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
    const { createOrder, onApprove, clientAccessToken, clientMetadataID: cmid,
        enableThreeDomainSecure, sessionID, partnerAttributionID, getParent } = props;
    const { ThreeDomainSecure } = components;
    const { fundingSource, paymentMethodID } = payment;

    const clientMetadataID = cmid || sessionID;

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
            const { flags: { isChangeShippingAddressAllowed } } = order.checkoutSession;

            if (isChangeShippingAddressAllowed) {
                return true;
            }

            return false;
        });
    };

    const start = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return ZalgoPromise.hash({
                validate:        validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, clientMetadataID, partnerAttributionID }),
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

function setupVaultMenu({ props, payment, serviceData, components, config } : MenuOptions) : MenuChoices {
    const { clientAccessToken, createOrder, enableThreeDomainSecure, partnerAttributionID, sessionID, clientMetadataID } = props;
    const { fundingSource, paymentMethodID, button } = payment;
    const { content } = serviceData;

    if (!clientAccessToken || !paymentMethodID) {
        throw new Error(`Client access token and payment method id required`);
    }

    const updateClientConfig = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return updateButtonClientConfig({ fundingSource, orderID, inline: false });
        });
    };

    const validate = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return validatePaymentMethod({ clientAccessToken, orderID, paymentMethodID, enableThreeDomainSecure, partnerAttributionID, clientMetadataID: clientMetadataID || sessionID });
        });
    };

    const loadCheckout = ({ payment: checkoutPayment } : {| payment : Payment |}) => {
        return checkout.init({
            props, components, serviceData, config, payment: checkoutPayment
        }).start();
    };

    const CHOOSE_FUNDING_SHIPPING = {
        label:    content.chooseCard || content.chooseCardOrShipping,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            return ZalgoPromise.try(() => {
                return updateClientConfig();
            }).then(() => {
                return validate();
            }).then(() => {
                return loadCheckout({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING } });
            });
        }
    };

    const CHOOSE_ACCOUNT = {
        label:    content.useDifferentAccount,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            return ZalgoPromise.try(() => {
                return updateClientConfig();
            }).then(() => {
                return loadCheckout({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT } });
            });
        }
    };

    const DELETE_CARD = {
        label:    content.deleteVaultedCard,
        spinner:  true,
        onSelect: () => {
            return deleteVault({ paymentMethodID, clientAccessToken }).then(() => {
                destroyElement(button);
            });
        }
    };

    if (fundingSource === FUNDING.PAYPAL) {
        return [
            CHOOSE_FUNDING_SHIPPING,
            CHOOSE_ACCOUNT
        ];
    }

    if (fundingSource === FUNDING.CARD) {
        return [
            DELETE_CARD
        ];
    }

    throw new Error(`Can not render menu for ${ fundingSource }`);
}

function updateVaultClientConfig({ orderID, payment }) : ZalgoPromise<void> {
    const { fundingSource } = payment;
    return updateButtonClientConfig({ fundingSource, orderID, inline: true });
}

export const vaultCapture : PaymentFlow = {
    name:               'vault_capture',
    setup:              setupVaultCapture,
    isEligible:         isVaultCaptureEligible,
    isPaymentEligible:  isVaultCapturePaymentEligible,
    init:               initVaultCapture,
    setupMenu:          setupVaultMenu,
    updateClientConfig: updateVaultClientConfig,
    spinner:            true,
    inline:             true
};



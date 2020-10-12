/* @flow */

import type { CrossDomainWindowType } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';
import { destroyElement } from 'belter/src';
import { initiateInstallments } from '@paypal/installments/src/interface';

import type { ThreeDomainSecureFlowType, MenuChoices } from '../types';
import type { CreateOrder } from '../props';
import { validatePaymentMethod, type ValidatePaymentMethodResponse, getSupplementalOrderInfo, deleteVault, updateButtonClientConfig } from '../api';
import { TARGET_ELEMENT, BUYER_INTENT, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';
import { getLogger } from '../lib';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, IsInstallmentsEligibleOptions, InitOptions, MenuOptions, Payment } from './types';
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

function isVaultCaptureInstallmentsEligible({ props, serviceData } : IsInstallmentsEligibleOptions) : boolean {
    const { enableVaultInstallments } = props;
    const { fundingEligibility } = serviceData;

    if (enableVaultInstallments && (fundingEligibility.card && fundingEligibility.card.installments)) {
        return true;
    }

    return false;
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
        enableThreeDomainSecure, sessionID, partnerAttributionID, getParent, userIDToken, clientID } = props;
    const { ThreeDomainSecure, Installments } = components;
    const { fundingSource, paymentMethodID, button } = payment;
    const { facilitatorAccessToken, buyerCountry } = serviceData;

    const clientMetadataID = cmid || sessionID;
    const accessToken = userIDToken ? facilitatorAccessToken : clientAccessToken;

    if (!paymentMethodID) {
        throw new Error(`Payment method id required for vault capture`);
    }

    if (!accessToken) {
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

    const startPaymentFlow = (orderID, installmentPlan) => {
        return ZalgoPromise.hash({
            validate:        validatePaymentMethod({ accessToken, orderID, paymentMethodID, enableThreeDomainSecure, clientMetadataID, partnerAttributionID, installmentPlan }),
            requireShipping: shippingRequired(orderID)
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

    const start = () => {
        return createOrder().then(orderID => {
            const installmentsEligible = isVaultCaptureInstallmentsEligible({ props, serviceData });
            
            getLogger()
                .info(installmentsEligible ? 'vault_merchant_installments_eligible' : 'vault_merchant_installments_ineligible')
                .track({
                    [FPTI_KEY.TRANSITION]:   installmentsEligible ? FPTI_TRANSITION.INSTALLMENTS_ELIGIBLE : FPTI_TRANSITION.INSTALLMENTS_INELIGIBLE,
                    [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                    [FPTI_KEY.TOKEN]:        orderID,
                    [FPTI_KEY.CONTEXT_ID]:   orderID
                }).flush();

            if (clientID && installmentsEligible) {
                return getSupplementalOrderInfo(orderID).then(order => {
                    const cartAmount = order.checkoutSession.cart.amounts.total.currencyFormatSymbolISOCurrency;
                    return initiateInstallments({ clientID, Installments, paymentMethodID, button, buyerCountry, orderID, accessToken, cartAmount, onPay: startPaymentFlow, getLogger });
                });
            } else {
                return startPaymentFlow(orderID);
            }
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
    const { clientAccessToken, createOrder, enableThreeDomainSecure, partnerAttributionID, sessionID, clientMetadataID, userIDToken } = props;
    const { fundingSource, paymentMethodID, button } = payment;
    const { content, facilitatorAccessToken } = serviceData;

    if (!clientAccessToken || !paymentMethodID) {
        throw new Error(`Client access token and payment method id required`);
    }

    const updateMenuClientConfig = () => {
        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return updateButtonClientConfig({ fundingSource, orderID, inline: false });
        });
    };

    const validate = () => {
        const accessToken = userIDToken ? facilitatorAccessToken : clientAccessToken;

        return ZalgoPromise.try(() => {
            return createOrder();
        }).then(orderID => {
            return validatePaymentMethod({ accessToken, orderID, paymentMethodID, enableThreeDomainSecure, partnerAttributionID, clientMetadataID: clientMetadataID || sessionID });
        });
    };

    const loadCheckout = ({ payment: checkoutPayment } : {| payment : Payment |}) => {
        return checkout.init({
            props, components, serviceData, config, payment: checkoutPayment
        }).start();
    };

    const CHOOSE_FUNDING_SHIPPING = {
        label:    content.payWithDifferentMethod,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {

            getLogger().info('click_choose_funding').track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CLICK_CHOOSE_FUNDING
            }).flush();
            
            return ZalgoPromise.try(() => {
                return updateMenuClientConfig();
            }).then(() => {
                return validate();
            }).then(() => {
                return loadCheckout({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING } });
            });
        }
    };

    const CHOOSE_ACCOUNT = {
        label:    content.payWithDifferentAccount,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {

            getLogger().info('click_choose_account').track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CLICK_CHOOSE_ACCOUNT
            }).flush();

            return ZalgoPromise.try(() => {
                return updateMenuClientConfig();
            }).then(() => {
                return loadCheckout({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT } });
            });
        }
    };

    const DELETE_CARD = {
        label:    content.deleteVaultedCard,
        spinner:  true,
        onSelect: () => {
            // $FlowFixMe
            const element : HTMLElement = button.parentElement || button;

            getLogger().info('click_unlink_account').track({
                [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.CLICK_UNLINK_ACCOUNT
            }).flush();

            return deleteVault({ paymentMethodID, clientAccessToken }).then(() => {
                destroyElement(element);
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
    name:                   'vault_capture',
    setup:                  setupVaultCapture,
    isEligible:             isVaultCaptureEligible,
    isPaymentEligible:      isVaultCapturePaymentEligible,
    init:                   initVaultCapture,
    setupMenu:              setupVaultMenu,
    updateFlowClientConfig: updateVaultClientConfig,
    spinner:                true,
    inline:                 true
};



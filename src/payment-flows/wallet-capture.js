/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { stringifyError } from 'belter/src';
import { FUNDING, WALLET_INSTRUMENT } from '@paypal/sdk-constants/src';

import type { MenuChoices, Wallet, WalletInstrument } from '../types';
import { getSupplementalOrderInfo, oneClickApproveOrder } from '../api';
import { BUYER_INTENT } from '../constants';
import { getLogger } from '../lib';

import type { PaymentFlow, PaymentFlowInstance, IsEligibleOptions, IsPaymentEligibleOptions, InitOptions, MenuOptions } from './types';
import { checkout, CHECKOUT_POPUP_DIMENSIONS } from './checkout';

const WALLET_MIN_WIDTH = 250;

function setupWalletCapture() {
    // pass
}

function isWalletCaptureEligible({ props, serviceData } : IsEligibleOptions) : boolean {
    const { buyerAccessToken, wallet } = serviceData;
    const { onShippingChange } = props;

    if (!wallet) {
        return false;
    }

    if (!buyerAccessToken) {
        return false;
    }

    if (onShippingChange) {
        return false;
    }

    return true;
}

function getInstrument(wallet : Wallet, fundingSource : $Values<typeof FUNDING>, instrumentID : string) : ?WalletInstrument {

    // $FlowFixMe
    const walletFunding = wallet[fundingSource];

    if (!walletFunding) {
        return;
    }

    const instrument = walletFunding.instruments.find(inst => inst.instrumentID === instrumentID);

    if (!instrument) {
        return;
    }

    if (!instrument.type) {
        return;
    }

    return instrument;
}

function isWalletCapturePaymentEligible({ serviceData, payment } : IsPaymentEligibleOptions) : boolean {
    const { wallet } = serviceData;
    const { win, fundingSource, instrumentID } = payment;

    if (win) {
        return false;
    }

    if (!wallet) {
        return false;
    }

    if (!instrumentID) {
        return false;
    }

    const instrument = getInstrument(wallet, fundingSource, instrumentID);

    if (!instrument) {
        return false;
    }

    if (window.innerWidth < WALLET_MIN_WIDTH) {
        return false;
    }

    return true;
}

function initWalletCapture({ props, components, payment, serviceData, config } : InitOptions) : PaymentFlowInstance {
    const { createOrder, onApprove, clientMetadataID } = props;
    const { fundingSource, instrumentID } = payment;
    const { buyerAccessToken, wallet } = serviceData;

    if (!instrumentID) {
        throw new Error(`Instrument id required for wallet capture`);
    }

    if (!buyerAccessToken) {
        throw new Error(`Buyer access token required for wallet capture`);
    }

    // $FlowFixMe
    const walletFunding = wallet[fundingSource];

    if (!walletFunding) {
        throw new Error(`Expected wallet to be present`);
    }

    const instrument = walletFunding.instruments.find(inst => inst.instrumentID === instrumentID);

    if (!instrument) {
        throw new Error(`Expected instrument to be present`);
    }

    const { type: instrumentType } = instrument;

    if (!instrumentType) {
        throw new Error(`Expected instrument type`);
    }

    const getWebCheckoutFallback = () => {
        return checkout.init({
            props, components, serviceData, payment: {
                ...payment, isClick: false, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING
            }, config
        });
    };

    const fallbackToWebCheckout = () => {
        getLogger().info('web_checkout_fallback').flush();
        return getWebCheckoutFallback().start();
    };

    if (!instrument.oneClick) {
        return getWebCheckoutFallback();
    }

    const restart = () => {
        return fallbackToWebCheckout();
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
                requireShipping: shippingRequired(orderID),
                orderApproval:   oneClickApproveOrder({ orderID, instrumentType, buyerAccessToken, instrumentID, clientMetadataID })
            }).then(({ requireShipping, orderApproval }) => {
                if (requireShipping) {
                    return fallbackToWebCheckout();
                }

                const { payerID } = orderApproval;
                return onApprove({ payerID }, { restart });
                
            }).catch(err => {
                getLogger().warn('approve_order_error', { err: stringifyError(err) }).flush();
                return fallbackToWebCheckout();
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

function setupWalletMenu({ payment, serviceData, initiatePayment } : MenuOptions) : MenuChoices {
    const { fundingSource, instrumentID } = payment;
    const { wallet, content, buyerAccessToken } = serviceData;

    if (!buyerAccessToken) {
        throw new Error(`Can not render wallet menu without buyer access token`);
    }

    if (!wallet) {
        throw new Error(`Can not render wallet menu without wallet`);
    }

    if (!instrumentID) {
        throw new Error(`Can not render wallet menu without instrumentID`);
    }

    const instrument = getInstrument(wallet, fundingSource, instrumentID);

    if (!instrument) {
        throw new Error(`Can not render wallet menu without instrument`);
    }

    const CHOOSE_CARD = {
        label:    content.chooseCard || content.chooseCardOrShipping,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING } });
        }
    };

    const CHOOSE_ACCOUNT = {
        label:    content.useDifferentAccount,
        popup:    POPUP_OPTIONS,
        onSelect: ({ win }) => {
            return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT } });
        }
    };

    if (fundingSource === FUNDING.PAYPAL) {
        if (instrument.type === WALLET_INSTRUMENT.CREDIT) {
            return [
                CHOOSE_ACCOUNT
            ];
        }

        return [
            CHOOSE_CARD,
            CHOOSE_ACCOUNT
        ];
    }

    if (fundingSource === FUNDING.CREDIT) {
        return [
            CHOOSE_ACCOUNT
        ];
    }

    throw new Error(`Can not render menu for ${ fundingSource }`);
}

export const walletCapture : PaymentFlow = {
    name:              'wallet_capture',
    setup:             setupWalletCapture,
    isEligible:        isWalletCaptureEligible,
    isPaymentEligible: isWalletCapturePaymentEligible,
    init:              initWalletCapture,
    setupMenu:         setupWalletMenu,
    spinner:           true,
    inline:            true,
    instant:           true
};

/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups } from 'belter/src';
import { FUNDING, SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';
import { getParent, getTop, type CrossDomainWindowType } from 'cross-domain-utils/src';

import { enableVault } from '../api';
import { CONTEXT, TARGET_ELEMENT } from '../constants';
import { unresolvedPromise } from '../lib';
import type { FundingEligibilityType, ProxyWindow } from '../types';
import type { Props, Components, ServiceData, Config, CreateBillingAgreement, CreateSubscription } from '../button/props';

import type { PaymentFlow, PaymentFlowInstance, Payment } from './types';

export const CHECKOUT_POPUP_DIMENSIONS = {
    WIDTH:  500,
    HEIGHT: 590
};

let checkoutOpen = false;
let canRenderTop = false;

function getRenderWindow() : Object {
    const top = getTop(window);
    if (canRenderTop && top) {
        return top;
    } else {
        return getParent();
    }
}

function setupCheckout({ components } : { components : Components }) : ZalgoPromise<void> {
    const { Checkout } = components;

    checkoutOpen = false;

    const [ parent, top ] = [ getParent(window), getTop(window) ];

    const tasks = {};

    if (top && parent && parent !== top) {
        tasks.canRenderTo = Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }

    return ZalgoPromise.hash(tasks).then(noop);
}

function isCheckoutEligible() : boolean {
    return true;
}

type VaultAutoSetupEligibleProps = {|
    vault : boolean,
    clientAccessToken : ?string,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    fundingSource : $Values<typeof FUNDING>,
    fundingEligibility : FundingEligibilityType
|};

function isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource, fundingEligibility } : VaultAutoSetupEligibleProps) : boolean {
    if (!clientAccessToken) {
        return false;
    }

    if (createBillingAgreement || createSubscription) {
        return false;
    }

    const fundingSourceEligible = Boolean(fundingEligibility[fundingSource] && fundingEligibility[fundingSource].vaultable);

    if (vault && !fundingSourceEligible) {
        throw new Error(`SDK received ${ SDK_QUERY_KEYS.VAULT }=true parameter, but ${ fundingSource } is not vaultable.`);
    }

    if (vault) {
        return true;
    }

    if (fundingSourceEligible) {
        return true;
    }

    return false;
}

type EnableVaultSetupOptions = {|
    orderID : string,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType,
    fundingSource : $Values<typeof FUNDING>,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription
|};

function enableVaultSetup({ orderID, vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource, fundingEligibility } : EnableVaultSetupOptions) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        if (!clientAccessToken) {
            return;
        }
        
        if (isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource, fundingEligibility })) {
            return enableVault({ orderID, clientAccessToken }).catch(err => {
                if (vault) {
                    throw err;
                }
            });
        }
    });
}

function getContext({ win, isClick } : { win : ?(CrossDomainWindowType | ProxyWindow), isClick : ?boolean }) : $Values<typeof CONTEXT> {
    if (win) {
        return CONTEXT.POPUP;
    }

    if (isClick && supportsPopups()) {
        return CONTEXT.POPUP;
    }

    return CONTEXT.IFRAME;
}

function initCheckout({ props, components, serviceData, payment, config } : { props : Props, components : Components, serviceData : ServiceData, payment : Payment, config : Config }) : PaymentFlowInstance {
    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const { Checkout } = components;
    const { buttonSessionID, createOrder, onApprove, onCancel,
        onShippingChange, locale, commit, onError, vault, clientAccessToken,
        createBillingAgreement, createSubscription } = props;
    const { button, win, fundingSource, card, isClick } = payment;
    const { fundingEligibility, buyerCountry } = serviceData;
    const { cspNonce } = config;

    const context = getContext({ win, isClick });

    let approved = false;

    const restart = memoize(() : ZalgoPromise<void> =>
        initCheckout({ props, components, serviceData, config, payment: { button, win, fundingSource, card } })
            .start().finally(unresolvedPromise));

    const onClose = () => {
        checkoutOpen = false;
        if (!approved) {
            return onCancel();
        }
    };

    let buyerAccessToken;

    const { renderTo, close: closeCheckout } = Checkout({
        window: win,
        buttonSessionID,
        clientAccessToken,

        createOrder: () => {
            return createOrder().then(orderID => {
                return enableVaultSetup({ orderID, vault, clientAccessToken, fundingEligibility, fundingSource, createBillingAgreement, createSubscription }).then(() => {
                    return orderID;
                });
            });
        },

        onApprove: ({ payerID, paymentID, billingToken, subscriptionID }) => {
            approved = true;

            return closeCheckout().then(() => {
                return onApprove({ payerID, paymentID, billingToken, subscriptionID, buyerAccessToken }, { restart });
            });
        },

        onAuth: ({ accessToken }) => {
            buyerAccessToken = accessToken;
        },

        onCancel: () => {
            return closeCheckout().then(() => {
                return onCancel();
            });
        },

        onShippingChange: onShippingChange
            ? (data, actions) => {
                return onShippingChange({ buyerAccessToken, ...data }, actions);
            } : null,

        onError,
        onClose,

        fundingSource,
        card,
        buyerCountry,
        locale,
        commit,
        cspNonce
    });

    checkoutOpen = true;
    const renderPromise = renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, context);

    const close = () => {
        checkoutOpen = false;
        return closeCheckout();
    };

    const start = () => {
        return renderPromise.then(noop);
    };

    return { start, close };
}

export const checkout : PaymentFlow = {
    setup:      setupCheckout,
    isEligible: isCheckoutEligible,
    init:       initCheckout,
    popup:      true
};

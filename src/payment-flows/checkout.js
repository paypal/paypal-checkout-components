/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups } from 'belter/src';
import { FUNDING, CARD, COUNTRY, SDK_QUERY_KEYS } from '@paypal/sdk-constants/src';
import { getParent, getTop } from 'cross-domain-utils/src';

import { enableVault, createAccessToken } from '../api';
import { CONTEXT, TARGET_ELEMENT } from '../constants';
import { unresolvedPromise } from '../lib';
import type { ProxyWindow, LocaleType, FundingEligibilityType } from '../types';
import type { CreateOrder, OnApprove, OnCancel, OnShippingChange, CreateBillingAgreement, CreateSubscription } from '../button/props';

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

export function setupCheckout() : ZalgoPromise<void> {
    checkoutOpen = false;

    const [ parent, top ] = [ getParent(window), getTop(window) ];

    const tasks = {};

    if (top && parent && parent !== top) {
        tasks.canRenderTo = window.paypal.Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });
    }

    return ZalgoPromise.hash(tasks).then(noop);
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

export function getDefaultContext() : $Values<typeof CONTEXT> {
    return supportsPopups() ? CONTEXT.POPUP : CONTEXT.IFRAME;
}

type CheckoutProps= {|
    clientID : string,
    win? : ?ProxyWindow,
    buttonSessionID : string,
    context? : $Values<typeof CONTEXT>,
    fundingSource : $Values<typeof FUNDING>,
    card : ?$Values<typeof CARD>,
    buyerCountry : $Values<typeof COUNTRY>,
    createOrder : CreateOrder,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    onApprove : OnApprove,
    onCancel : OnCancel,
    onShippingChange : ?OnShippingChange,
    cspNonce : ?string,
    locale : LocaleType,
    commit : boolean,
    onError : (mixed) => ZalgoPromise<void>,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType,
    validationPromise? : ZalgoPromise<boolean>
|};

type CheckoutInstance = {|
    start : () => ZalgoPromise<void>,
    close : () => ZalgoPromise<void>,
    triggerError : (mixed) => ZalgoPromise<void>
|};

export function initCheckout(props : CheckoutProps) : CheckoutInstance {
    const { clientID, win, buttonSessionID, fundingSource, card, buyerCountry, createOrder, onApprove, onCancel,
        onShippingChange, cspNonce, context, locale, commit, onError, vault, clientAccessToken, fundingEligibility,
        createBillingAgreement, createSubscription, validationPromise = ZalgoPromise.resolve(true) } = props;

    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    let approved = false;

    const restart = memoize(() : ZalgoPromise<void> =>
        initCheckout({ ...props, context: CONTEXT.IFRAME }).start().finally(unresolvedPromise));

    const onClose = () => {
        checkoutOpen = false;
        return validationPromise.then(valid => {
            if (valid && !approved) {
                return onCancel();
            }
        });
    };

    const facilitatorAccessTokenPromise = createAccessToken(clientID);
    let buyerAccessToken;

    const { renderTo, close: closeCheckout, onError: triggerError } = window.paypal.Checkout({
        window: win,
        buttonSessionID,
        clientAccessToken,

        createOrder: () => {
            return validationPromise.then(valid => {
                if (!valid) {
                    return unresolvedPromise();
                }

                return createOrder().then(orderID => {
                    return enableVaultSetup({ orderID, vault, clientAccessToken, fundingEligibility, fundingSource, createBillingAgreement, createSubscription }).then(() => {
                        return orderID;
                    });
                });
            });
        },

        onApprove: ({ payerID, paymentID, billingToken, subscriptionID }) => {
            approved = true;

            return ZalgoPromise.all([
                facilitatorAccessTokenPromise,
                closeCheckout()
            ]).then(([ facilitatorAccessToken ]) => {
                return onApprove({ payerID, paymentID, billingToken, subscriptionID, facilitatorAccessToken, buyerAccessToken }, { restart });
            });
        },

        onAuth: ({ accessToken }) => {
            buyerAccessToken = accessToken;
        },

        onCancel: () => {
            return validationPromise.then(valid => {
                if (valid) {
                    return closeCheckout().then(() => {
                        return onCancel();
                    });
                }
            });
        },

        onShippingChange: onShippingChange
            ? (data, actions) => {
                return facilitatorAccessTokenPromise.then(facilitatorAccessToken => {
                    return onShippingChange({ facilitatorAccessToken, buyerAccessToken, ...data }, actions);
                });
            } : null,

        getFacilitatorAccessToken: () => {
            return facilitatorAccessTokenPromise;
        },

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
        return validationPromise.then(valid => {
            return valid ? renderPromise : close();
        }).then(noop);
    };

    return { start, close, triggerError };
}

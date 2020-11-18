/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { memoize, noop, supportsPopups, stringifyError, extendUrl, PopupOpenError } from 'belter/src';
import { FUNDING, FPTI_KEY, CURRENCY, COUNTRY, INTENT, CARD, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { getParent, getTop, type CrossDomainWindowType } from 'cross-domain-utils/src';

import type { ProxyWindow, ConnectOptions } from '../types';
import { type CreateBillingAgreement, type CreateSubscription } from '../props';
import { enableVault, exchangeAccessTokenForAuthCode, getConnectURL, getFundingEligibility, updateButtonClientConfig, getSmartWallet  } from '../api';
import { CONTEXT, TARGET_ELEMENT, BUYER_INTENT, FPTI_TRANSITION, FPTI_CONTEXT_TYPE } from '../constants';
import { unresolvedPromise, getLogger } from '../lib';
import { openPopup } from '../ui';
import { FUNDING_SKIP_LOGIN } from '../config';

import type { PaymentFlow, PaymentFlowInstance, SetupOptions, InitOptions } from './types';

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
    } else if (getParent()) {
        return getParent();
    } else {
        return window;
    }
}

function setupCheckout({ components } : SetupOptions) : ZalgoPromise<void> {
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

function isCheckoutPaymentEligible() : boolean {
    return true;
}

type ConnectEligibleOptions = {|
    connect : ?ConnectOptions,
    vault : boolean,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    fundingSource : $Values<typeof FUNDING>
|};


function isConnectEligible({ connect, vault, fundingSource, createBillingAgreement, createSubscription } : ConnectEligibleOptions) : boolean {
    if (!connect) {
        return false;
    }

    if (vault) {
        return false;
    }

    if (fundingSource !== FUNDING.PAYPAL && fundingSource !== FUNDING.CREDIT) {
        return false;
    }

    if (createBillingAgreement || createSubscription) {
        return false;
    }

    return true;
}

type IsFundingSourceVaultableOptions = {|
    accessToken : string,
    fundingSource : $Values<typeof FUNDING>,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    vault : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

function isFundingSourceVaultable({ accessToken, fundingSource, clientID, merchantID, buyerCountry, currency, commit, vault, intent, disableFunding, disableCard } : IsFundingSourceVaultableOptions) : ZalgoPromise<boolean> {
    return ZalgoPromise.try(() => {
        if (fundingSource !== FUNDING.PAYPAL) {
            return false;
        }

        return getFundingEligibility(`
                ${ fundingSource } {
                    vaultable
                }
            `, {
            accessToken, clientID, merchantID, buyerCountry, currency, commit, vault,
            intent, disableFunding, disableCard
        }).then(newFundingEligibility => {
            if (newFundingEligibility[fundingSource] && newFundingEligibility[fundingSource].vaultable) {
                return true;
            } else {
                return false;
            }
        });
    });
}

type VaultAutoSetupEligibleProps = {|
    vault : boolean,
    clientAccessToken : ?string,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    fundingSource : $Values<typeof FUNDING>,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

function isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
    clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard } : VaultAutoSetupEligibleProps) : ZalgoPromise<boolean> {

    return ZalgoPromise.try(() => {
        if (!clientAccessToken) {
            return false;
        }

        if (createBillingAgreement || createSubscription) {
            return false;
        }

        if (vault) {
            return true;
        }

        return isFundingSourceVaultable({ accessToken: clientAccessToken, fundingSource, clientID, merchantID, buyerCountry, currency,
            commit, vault, intent, disableFunding, disableCard }).catch(err => {

            getLogger().warn('funding_vaultable_error', { err: stringifyError(err) });
            return false;
        });
    });
}

type EnableVaultSetupOptions = {|
    orderID : string,
    vault : boolean,
    clientAccessToken : ?string,
    fundingEligibility : FundingEligibilityType,
    fundingSource : $Values<typeof FUNDING>,
    createBillingAgreement : ?CreateBillingAgreement,
    createSubscription : ?CreateSubscription,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

function enableVaultSetup({ orderID, vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
    clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard } : EnableVaultSetupOptions) : ZalgoPromise<void> {

    return ZalgoPromise.try(() => {
        return isVaultAutoSetupEligible({ vault, clientAccessToken, createBillingAgreement, createSubscription, fundingSource,
            clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard });

    }).then(eligible => {
        if (eligible && clientAccessToken) {
            return enableVault({ orderID, clientAccessToken }).catch(err => {
                if (vault) {
                    throw err;
                }
            });
        }
    });
}

function getContext({ win, isClick } : {| win : ?(CrossDomainWindowType | ProxyWindow), isClick : ?boolean |}) : $Values<typeof CONTEXT> {
    if (win) {
        return CONTEXT.POPUP;
    }

    if (isClick && supportsPopups()) {
        return CONTEXT.POPUP;
    }

    return CONTEXT.IFRAME;
}

function initCheckout({ props, components, serviceData, payment, config } : InitOptions) : PaymentFlowInstance {
    if (checkoutOpen) {
        throw new Error(`Checkout already rendered`);
    }

    const { Checkout } = components;
    const { sessionID, buttonSessionID, createOrder, onApprove, onCancel,
        onShippingChange, locale, commit, onError, vault, clientAccessToken,
        createBillingAgreement, createSubscription, onClick, amount,
        clientID, connect, clientMetadataID: cmid, onAuth, userIDToken, env,
        currency, intent, disableFunding, disableCard, enableFunding, standaloneFundingSource } = props;
    let { button, win, fundingSource, card, isClick, buyerAccessToken = serviceData.buyerAccessToken,
        venmoPayloadID, buyerIntent } = payment;
    const { fundingEligibility, buyerCountry, sdkMeta, merchantID } = serviceData;
    const { cspNonce } = config;

    let context = getContext({ win, isClick });
    const connectEligible = isConnectEligible({ connect, createBillingAgreement, createSubscription, vault, fundingSource });

    let approved = false;
    let forceClosed = false;

    const init = () => {
        return Checkout({
            window: win,
            sessionID,
            buttonSessionID,
            clientAccessToken,
            venmoPayloadID,

            createAuthCode: () => {
                return ZalgoPromise.try(() => {
                    const fundingSkipLogin = FUNDING_SKIP_LOGIN[fundingSource];

                    if (payment.createAccessToken) {
                        return payment.createAccessToken();
                    } else if (buyerAccessToken) {
                        return buyerAccessToken;
                    } else if (clientID && userIDToken && fundingSkipLogin) {
                        const clientMetadataID = cmid || sessionID;

                        return getSmartWallet({ clientID, merchantID, currency, amount, clientMetadataID, userIDToken, env, cspNonce }).then(wallet => {
                            // $FlowFixMe
                            const walletInstruments = wallet[fundingSkipLogin] && wallet[fundingSkipLogin].instruments;

                            if (walletInstruments) {
                                for (const instrument of walletInstruments) {
                                    if (instrument.accessToken) {
                                        return instrument.accessToken;
                                    }
                                }
                            }
                        });
                    }
                }).then(accessToken => {
                    if (accessToken && (buyerIntent === BUYER_INTENT.PAY || buyerIntent === BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING)) {
                        return exchangeAccessTokenForAuthCode(accessToken);
                    }
                }).catch(err => {
                    getLogger().warn('exchange_access_token_auth_code_error', { err: stringifyError(err) });
                });
            },

            getConnectURL: (connect && connectEligible) ? ({ payerID }) => {
                if (!clientID) {
                    throw new Error(`Expected clientID`);
                }

                return createOrder().then(orderID => {
                    return getConnectURL({ orderID, payerID, clientID, fundingSource, connect }).then(connectURL => {
                        getLogger()
                            .info('connect_redirect', { connectURL })
                            .track({
                                [FPTI_KEY.TRANSITION]:   FPTI_TRANSITION.CONNECT_REDIRECT,
                                [FPTI_KEY.CONTEXT_TYPE]: FPTI_CONTEXT_TYPE.ORDER_ID,
                                [FPTI_KEY.TOKEN]:        orderID,
                                [FPTI_KEY.CONTEXT_ID]:   orderID
                            }).flush();

                        return extendUrl(connectURL, {
                            query: {
                                sdkMeta
                            }
                        });
                    }).catch(err => {
                        getLogger().error('connect_redirect_error', { err: stringifyError(err) });
                        throw err;
                    });
                });
            } : null,

            createOrder: () => {
                return createOrder().then(orderID => {
                    return ZalgoPromise.try(() => {
                        if (clientID && buyerIntent === BUYER_INTENT.PAY) {
                            return enableVaultSetup({ orderID, vault, clientAccessToken, fundingEligibility, fundingSource, createBillingAgreement, createSubscription,
                                clientID, merchantID, buyerCountry, currency, commit, intent, disableFunding, disableCard });
                        }
                    }).then(() => {
                        return orderID;
                    });
                });
            },

            onApprove: ({ payerID, paymentID, billingToken, subscriptionID, authCode }) => {
                approved = true;
                getLogger().info(`spb_onapprove_access_token_${ buyerAccessToken ? 'present' : 'not_present' }`).flush();

                // eslint-disable-next-line no-use-before-define
                return close().then(() => {
                    // eslint-disable-next-line no-use-before-define
                    return onApprove({ payerID, paymentID, billingToken, subscriptionID, buyerAccessToken, authCode }, { restart }).catch(noop);
                });
            },

            onAuth: ({ accessToken }) => {

                const access_token = accessToken ? accessToken : buyerAccessToken;

                return onAuth({ accessToken: access_token }).then(token => {
                    buyerAccessToken = token;
                });
            },

            onCancel: () => {
                // eslint-disable-next-line no-use-before-define
                return close().then(() => {
                    return onCancel();
                });
            },

            onShippingChange: onShippingChange
                ? (data, actions) => {
                    return onShippingChange({ buyerAccessToken, ...data }, actions);
                } : null,

            onClose: () => {
                checkoutOpen = false;
                if (!forceClosed && !approved) {
                    return onCancel();
                }
            },

            onError,

            fundingSource,
            card,
            buyerCountry,
            locale,
            commit,
            cspNonce,
            clientMetadataID: cmid,
            enableFunding,
            standaloneFundingSource
        });
    };

    let instance;

    const close = () => {
        checkoutOpen = false;
        return ZalgoPromise.try(() => {
            if (instance) {
                forceClosed = true;
                return instance.close();
            }
        });
    };

    const start = memoize(() => {
        instance = init();
        return instance.renderTo(getRenderWindow(), TARGET_ELEMENT.BODY, context).catch(err => {
            if (checkoutOpen) {
                throw err;
            }
        });
    });

    const restart = memoize(() : ZalgoPromise<void> => {
        return initCheckout({ props, components, serviceData, config, payment: { button, fundingSource, card, buyerIntent, isClick: false } })
            .start().finally(unresolvedPromise);
    });

    const click = () => {
        if (!win && supportsPopups()) {
            try {
                win = openPopup({ width: CHECKOUT_POPUP_DIMENSIONS.WIDTH, height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT });
            } catch (err) {
                getLogger().warn('popup_open_error_iframe_fallback', { err: stringifyError(err) });

                if (err instanceof PopupOpenError) {
                    context = CONTEXT.IFRAME;
                } else {
                    throw err;
                }
            }
        }

        if (!onClick) {
            start();
            return;
        }

        return ZalgoPromise.try(() => {
            return onClick ? onClick({ fundingSource }) : true;
        }).then(valid => {
            if (win && !valid) {
                win.close();
            }
        });
    };

    return { click, start, close };
}

function updateCheckoutClientConfig({ orderID, payment }) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {
        const { buyerIntent, fundingSource } = payment;
        const updateClientConfigPromise = updateButtonClientConfig({ fundingSource, orderID, inline: false });

        // Block
        if (buyerIntent === BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING) {
            return updateClientConfigPromise;
        }
    });
}

export const checkout : PaymentFlow = {
    name:                   'checkout',
    setup:                  setupCheckout,
    isEligible:             isCheckoutEligible,
    isPaymentEligible:      isCheckoutPaymentEligible,
    init:                   initCheckout,
    updateFlowClientConfig: updateCheckoutClientConfig
};

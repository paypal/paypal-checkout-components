/* @flow */

import { querySelectorAll, onClick, noop } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { ProxyWindow } from 'post-robot/src';

import { setupCheckout, initCheckout, initCardFields, initVault, isCardFieldsEligible, isVaultCaptureEligible, isVaultSetupEligible } from './flows';
import { getAuth } from './api';
import { createOrderOrBillingAgreement, validateOrder, updateClientConfig, enableVault } from './orders';
import { CLIENT_CONFIG_ENABLED } from './config';
import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW, DATA_ATTRIBUTES, CLASS } from './constants';
import { setupLogger } from './log';

function onClickValidate({ fundingSource, card }) : ZalgoPromise<boolean> {
    let valid = true;

    return ZalgoPromise.try(() => {
        if (window.xprops.onClick) {
            return window.xprops.onClick({ fundingSource, card }, {
                resolve: () => ZalgoPromise.try(() => {
                    valid = true;
                }),
                reject: () => ZalgoPromise.try(() => {
                    valid = false;
                })
            });
        }
    }).then(() => {
        return valid;
    });
}

function getSelectedFunding(button : HTMLElement) : { fundingSource : $Values<typeof FUNDING>, card : $Values<typeof CARD>, paymentMethodID : ?string } {
    const fundingSource = button.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
    const paymentMethodID = button.getAttribute(DATA_ATTRIBUTES.PAYMENT_METHOD_ID);
    const card = button.getAttribute(DATA_ATTRIBUTES.CARD);

    // $FlowFixMe
    return { fundingSource, card, paymentMethodID };
}

export function setupButton(fundingEligibility : Object) : ZalgoPromise<void> {

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    setupLogger();

    const buyerCountry = window.xprops.buyerCountry || fundingEligibility.buyerCountry || COUNTRY.US;

    if (fundingEligibility.fundingEligibility) {
        fundingEligibility = fundingEligibility.fundingEligibility;
    }

    let buttonEnabled = true;
    let buttonProcessing = false;

    const checkout = ({ button, win, fundingSource, card, paymentMethodID } : { button : HTMLElement, win? : ProxyWindow, fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD>, paymentMethodID? : ?string }) => {
        if (buttonProcessing) {
            return;
        }
        
        const validationPromise = onClickValidate({ fundingSource, card });

        if (!buttonEnabled) {
            return ZalgoPromise.try(() => {
                if (win) {
                    return win.close();
                }
            });
        }

        const { clientAccessToken } = window.xprops;

        const isVaultCapture = isVaultCaptureEligible({ fundingSource, paymentMethodID });
        const isVaultSetup = isVaultSetupEligible({ clientAccessToken, fundingSource, fundingEligibility }) && !isVaultCapture;
        const isCardFields = isCardFieldsEligible({ fundingSource }) && !isVaultSetup;

        buttonProcessing = true;
        if (isVaultCapture) {
            button.classList.add(CLASS.LOADING);
        }

        const orderPromise = validationPromise.then(valid => {
            if (valid) {
                return createOrderOrBillingAgreement();
            } else {
                return new ZalgoPromise(noop);
            }
        }).then(orderID => {
            return ZalgoPromise.try(() => {
                if (isVaultSetup) {
                    return enableVault({ orderID, clientAccessToken }).catch(err => {
                        if (window.xprops.vault) {
                            throw err;
                        }
                    });
                }
            }).then(() => {
                return orderID;
            });
        });

        const createOrder = () => orderPromise;

        const { start, close, onError } = (() => {

            if (isVaultCapture) {
                return initVault({
                    createOrder,
                    fundingSource,
                    buyerCountry,
                    // $FlowFixMe
                    paymentMethodID
                });
            }

            if (isCardFields && !isVaultSetup) {
                return initCardFields({
                    createOrder,
                    fundingSource,
                    card,
                    buyerCountry
                });
            }

            return initCheckout({
                window: win,
                createOrder,
                fundingSource,
                card,
                validationPromise,
                buyerCountry
            });
        })();
        
        if (CLIENT_CONFIG_ENABLED) {
            createOrder().then(orderID => {
                updateClientConfig({
                    orderID,
                    fundingSource,
                    integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
                    userExperienceFlow:  isCardFields ? USER_EXPERIENCE_FLOW.INLINE : USER_EXPERIENCE_FLOW.INCONTEXT,
                    productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
                });
            });
        }

        return validationPromise.then(valid => {
            if (!valid) {
                return close();
            }

            return start()
                .then(createOrder)
                .then(validateOrder);
        }).catch(err => {
            return ZalgoPromise.all([
                onError(err),
                close()
            ]);
        }).finally(() => {
            buttonProcessing = false;
            button.classList.remove(CLASS.LOADING);
        });
    };

    const tasks = {};

    tasks.onInit = ZalgoPromise.try(() => {
        if (window.xprops.onInit) {
            return window.xprops.onInit({}, {
                enable: () => ZalgoPromise.try(() => {
                    buttonEnabled = true;
                }),
                disable: () => ZalgoPromise.try(() => {
                    buttonEnabled = false;
                })
            });
        }
    });

    querySelectorAll(`[ ${ DATA_ATTRIBUTES.FUNDING_SOURCE } ]`).forEach(button => {
        const { fundingSource, card, paymentMethodID } = getSelectedFunding(button);

        onClick(button, event => {
            event.preventDefault();
            event.stopPropagation();
            checkout({ button, fundingSource, card, paymentMethodID });
        });
    });

    tasks.getAuth = getAuth().then(noop);

    tasks.prerender = tasks.onInit.then(() => {
        return window.xprops.getPrerenderDetails().then((prerenderDetails) => {
            if (prerenderDetails) {
                const { win, fundingSource, card } = prerenderDetails;
                const button = document.querySelector(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }=${ fundingSource }]`);
                
                if (!button) {
                    throw new Error(`Can not find button element`);
                }

                return checkout({ button, win, fundingSource, card });
            }
        });
    });

    tasks.remember = ZalgoPromise.try(() => {
        if (fundingEligibility && fundingEligibility.venmo && fundingEligibility.venmo.eligible) {
            return window.xprops.remember([ FUNDING.VENMO ]);
        }
    });

    tasks.setupCheckout = setupCheckout();

    return ZalgoPromise.hash(tasks).then(noop);
}

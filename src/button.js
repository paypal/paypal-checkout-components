/* @flow */

import { querySelectorAll, onClick, noop } from 'belter/src';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import type { ProxyWindow } from 'post-robot/src';

import { setupCheckout, initCheckout } from './checkout';
import { getAuth } from './api';
import { initCardFields } from './card-fields';
import { createOrderOrBillingAgreement, validateOrder, updateClientConfig } from './orders';
import { INLINE_GUEST_ENABLED, CLIENT_CONFIG_ENABLED } from './config';
import { INTEGRATION_ARTIFACT, USER_EXPERIENCE_FLOW, PRODUCT_FLOW } from './constants';

function onClickAndValidate({ fundingSource, card }) : ZalgoPromise<boolean> {
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

function getSelectedFunding(button : HTMLElement) : { fundingSource : $Values<typeof FUNDING>, card : $Values<typeof CARD> } {
    const fundingSource = button.getAttribute('data-funding-source');
    const card = button.getAttribute('data-card');

    // $FlowFixMe
    return { fundingSource, card };
}

export function setupButton(fundingEligibility : Object) : ZalgoPromise<void> {

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    const buyerCountry = window.xprops.buyerCountry || fundingEligibility.buyerCountry || COUNTRY.US;

    if (fundingEligibility.fundingEligibility) {
        fundingEligibility = fundingEligibility.fundingEligibility;
    }

    let buttonEnabled = true;

    const start = ({ win, fundingSource, card } : { win? : ProxyWindow, fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD> }) => {
        const validationPromise = onClickAndValidate({ fundingSource, card });

        if (!buttonEnabled) {
            if (win) {
                return win.close();
            }

            return;
        }

        const orderPromise = validationPromise.then(valid => {
            if (valid) {
                return createOrderOrBillingAgreement();
            } else {
                return new ZalgoPromise(noop);
            }
        });

        const isInlineGuest = (fundingSource === FUNDING.CARD && INLINE_GUEST_ENABLED);
        const createOrder = () => orderPromise;

        const { instance, render } = isInlineGuest
            ? initCardFields({ createOrder, fundingSource, card, buyerCountry })
            : initCheckout({ window: win, createOrder, fundingSource, card, validationPromise, buyerCountry });

        if (CLIENT_CONFIG_ENABLED) {
            createOrder().then(orderID => {
                updateClientConfig({
                    orderID,
                    fundingSource,
                    integrationArtifact: INTEGRATION_ARTIFACT.PAYPAL_JS_SDK,
                    userExperienceFlow:  isInlineGuest ? USER_EXPERIENCE_FLOW.INCONTEXT : USER_EXPERIENCE_FLOW.INLINE,
                    productFlow:         PRODUCT_FLOW.SMART_PAYMENT_BUTTONS
                });
            });
        }

        return ZalgoPromise.try(() => {
            if (isInlineGuest) {
                return validationPromise.then(valid => {
                    if (valid) {
                        return render();
                    }
                });
            } else {
                return ZalgoPromise.all([
                    render(),
                    validationPromise.then(valid => {
                        if (!valid) {
                            return instance.close();
                        }
                    })
                ]);
            }
        }).then(() => {
            return validationPromise.then(valid => {
                if (valid) {
                    return createOrder().then(validateOrder);
                }
            });
        }).catch(err => {
            return ZalgoPromise.all([
                instance.close(),
                instance.onError(err)
            ]);
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

    querySelectorAll('.paypal-button').forEach(button => {
        const { fundingSource, card } = getSelectedFunding(button);

        onClick(button, event => {
            event.preventDefault();
            event.stopPropagation();
            start({ fundingSource, card });
        });
    });

    tasks.getAuth = getAuth().then(noop);

    tasks.prerender = tasks.onInit.then(() => {
        return window.xprops.getPrerenderDetails().then((prerenderDetails) => {
            if (prerenderDetails) {
                const { win, fundingSource, card } = prerenderDetails;
                return start({ win, fundingSource, card });
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

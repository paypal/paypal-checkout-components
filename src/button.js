/* @flow */

import { querySelectorAll, onClick, noop } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { renderCheckout, setupCheckout, getDefaultContext } from './checkout';
import { getAuth } from './api';

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

export function setupButton(fundingEligibility : ?Object) : ZalgoPromise<void> {
    let buttonEnabled = true;

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

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
        const fundingSource = button.getAttribute('data-funding-source');
        const card = button.getAttribute('data-card');

        onClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            const validationPromise = onClickAndValidate({ fundingSource, card });

            if (!buttonEnabled) {
                return;
            }

            renderCheckout({ fundingSource, card }, getDefaultContext(), validationPromise).catch(noop);
        });
    });

    tasks.getAuth = getAuth().then(noop);

    tasks.prerender = tasks.onInit.then(() => {
        return window.xprops.getPrerenderDetails().then((prerenderDetails) => {
            if (prerenderDetails) {
                const { win, order, fundingSource, card } = prerenderDetails;
                const validationPromise = onClickAndValidate({ fundingSource, card });

                if (!buttonEnabled) {
                    return win.close();
                }

                renderCheckout({
                    window:      win,
                    createOrder: order ? (() => order) : null,
                    fundingSource,
                    card
                }, getDefaultContext(), validationPromise).catch(noop);
            }
        });
    });

    tasks.remember = ZalgoPromise.try(() => {
        if (fundingEligibility && fundingEligibility.venmo.eligible) {
            return window.xprops.remember([ FUNDING.VENMO ]);
        }
    });

    tasks.setupCheckout = setupCheckout();

    return ZalgoPromise.hash(tasks).then(noop);
}

/* @flow */

import { querySelectorAll, onClick, noop } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { renderCheckout, setupCheckout, getDefaultContext } from './checkout';
import { getAuth } from './api';

export function setupButton(fundingEligibility : ?Object) : ZalgoPromise<void> {
    let buttonEnabled = true;

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    const tasks = {};

    if (window.xprops.onInit) {
        tasks.onInit = window.xprops.onInit({}, {
            enable: () => ZalgoPromise.try(() => {
                buttonEnabled = true;
            }),
            disable: () => ZalgoPromise.try(() => {
                buttonEnabled = false;
            })
        });
    }

    querySelectorAll('.paypal-button').forEach(button => {
        const fundingSource = button.getAttribute('data-funding-source');
        const card = button.getAttribute('data-card');

        onClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            let valid = buttonEnabled;

            const validationPromise = ZalgoPromise.try(() => {
                if (window.xprops.onClick) {
                    return window.xprops.onClick({ fundingSource, card }, {
                        resolve: () => ZalgoPromise.try(() => {
                            valid = true;
                        }),
                        reject:  () => ZalgoPromise.try(() => {
                            valid = false;
                        })
                    });
                }
            }).then(() => {
                return valid;
            });

            if (!valid) {
                return;
            }

            renderCheckout({ fundingSource, validationPromise }, getDefaultContext(), validationPromise).catch(noop);
        });
    });

    tasks.getAuth = getAuth().then(noop);

    tasks.getPrerender = window.xprops.getPrerenderDetails().then((prerenderDetails) => {
        if (prerenderDetails) {
            const { win, order, fundingSource } = prerenderDetails;

            renderCheckout({
                window:      win,
                createOrder: () => order,
                fundingSource
            }).catch(noop);
        }
    });

    if (fundingEligibility && fundingEligibility.venmo.eligible) {
        tasks.remember = window.xprops.remember([ FUNDING.VENMO ]);
    }

    tasks.setupCheckout = setupCheckout();

    return ZalgoPromise.hash(tasks).then(noop);
}

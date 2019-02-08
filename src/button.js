/* @flow */

import { querySelectorAll, onClick, noop } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { renderCheckout, setupCheckout } from './checkout';
import { getAuth } from './api';

export function setupButton(fundingEligibility : ?Object) {

    if (!window.paypal) {
        throw new Error(`PayPal library not loaded`);
    }

    querySelectorAll('.paypal-button').forEach(button => {
        const fundingSource = button.getAttribute('data-funding-source');
        const card = button.getAttribute('data-card');

        onClick(button, event => {
            event.preventDefault();
            event.stopPropagation();

            if (window.xprops.onClick) {
                window.xprops.onClick({ fundingSource, card });
            }

            renderCheckout({ fundingSource }).catch(noop);
        });
    });

    getAuth().then(noop);

    window.xprops.getPrerenderDetails().then((prerenderDetails) => {
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
        window.xprops.remember([ FUNDING.VENMO ]);
    }

    setupCheckout();
}

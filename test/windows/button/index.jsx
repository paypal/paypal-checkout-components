/* @flow */
/** @jsx node */

import { noop, supportsPopups, getElement } from 'belter/src';
import { type ZalgoPromise } from 'zalgo-promise/src';
import { node, html } from 'jsx-pragmatic/src';
import { CONTEXT } from 'zoid/src';

import { Buttons as ButtonsTemplate } from '../../../src/buttons/template';
import { getElements, errorOnWindowOpen, generateOrderID } from '../../tests/common';

let { action, type, authed = false, bridge = false, delay = 0, onRender, checkout, selector, remembered, captureOrder = noop } = window.xprops.test;

const body = document.body;
if (body) {
    body.innerHTML = (
        <ButtonsTemplate { ...window.xprops } />
    ).render(html());
}

if (bridge) {
    errorOnWindowOpen();
    delay = 100;
}

function renderCheckout(props = {}, context = CONTEXT.POPUP) {


    window.paypal.Checkout({

        payment: window.xprops.createBillingAgreement
            ? () => {
                return window.xprops.createBillingAgreement().then(() => {
                    return generateOrderID();
                });
            }
            : window.xprops.createOrder,
        
        onAuthorize(data, actions) : void | ZalgoPromise<void> {

            return window.xprops.onApprove({
                ...data,

                order: {}

            }, {
                ...actions,

                order: {
                    capture: captureOrder,

                    get() : Object {
                        return {};
                    }
                },

                restart() {
                    renderCheckout(props, CONTEXT.IFRAME);
                }

            }).catch(err => {
                return window.props.onError(err);
            });
        },

        onAuth() {
            // pass
        },

        onShippingChange(data, actions) : ZalgoPromise<void> {
            return window.xprops.onShippingChange(data, actions);
        },

        onCancel: window.xprops.onCancel,
        onError:  window.xprops.onError,
        commit:   window.xprops.commit,
        locale:   window.xprops.locale,
        test:     {
            action: action || 'checkout',
            type,
            ...checkout
        },

        ...props
    }).renderTo(window.parent, 'body', supportsPopups() ? context : CONTEXT.IFRAME).catch(err => {

        if (err instanceof window.paypal.PopupOpenError) {
            return renderCheckout(props);
        }

        throw err;
    });
}

getElements('.paypal-button', document).forEach(el => {
    el.addEventListener('click', () => {

        if (window.xprops.onClick) {
            window.xprops.onClick();
        }

        renderCheckout({
            fundingSource: el.getAttribute('data-funding-source')
        });
    });
});

if (action === 'auth') {

    if (authed && window.xprops.onAuth) {
        window.xprops.onAuth();
    }

} else if (action === 'remember') {

    window.xprops.remember([ remembered ]);

} else if (action === 'checkout' || action === 'shippingChange' ||  action === 'cancel' || action === 'error' || action === 'popout') {

    if (delay) {
        setTimeout(() => {
            getElement(selector || '.paypal-button', document).click();
        }, delay);
    } else {
        getElement(selector || '.paypal-button', document).click();
    }
} else {
    window.xprops.getPrerenderDetails().then(prerenderDetails => {
        if (!prerenderDetails) {
            return;
        }

        const { win, order, fundingSource } = prerenderDetails;

        if (!order) {
            throw new Error(`Expected order to be passed`);
        }

        if (!fundingSource) {
            throw new Error(`Expected fundingSource to be passed`);
        }

        return renderCheckout({
            window:      win,
            createOrder: () => order,
            fundingSource
        });
    });
}

if (onRender) {
    onRender({
        // eslint-disable-next-line unicorn/prefer-spread
        fundingSources: Array.from(new Set(getElements('[data-funding-source]').map(el => el.getAttribute('data-funding-source')))),
        click() {
            getElement('.paypal-button', document).click();
        }
    });
}

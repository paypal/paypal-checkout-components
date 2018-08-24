/* @flow */
/* @jsx jsxToHTML */

import { jsxToHTML } from 'belter/src'; // eslint-disable-line no-unused-vars
import { type ZalgoPromise } from 'zalgo-promise/src';

import { Buttons } from '../../../src/button/template';
import { getElement, getElements, errorOnWindowOpen } from '../../tests/common';

let { action, flow = 'popup', authed = false, bridge = false, delay = 0, onRender, checkout, selector, remembered } = window.xprops.test;

let body = document.body;
if (body) {
    body.innerHTML = (
        <Buttons { ...window.xprops } />
    ).toString();
}

if (flow === 'iframe') {
    let client = window.paypal.client();
    client.Checkout.contexts.iframe = true;
}

if (bridge) {
    errorOnWindowOpen();
    delay = 100;
}

function renderCheckout(props = {}) {
    let client = window.paypal.client();

    client.Checkout.renderTo(window.xchild.getParentRenderWindow(), {

        payment: window.xprops.createOrder,
        onAuthorize(data, actions) : void | ZalgoPromise<void> {

            return window.xprops.onApprove({
                ...data,

                order: {}

            }, {
                ...actions,

                order: {
                    capture() {
                        // pass
                    },

                    get() : Object {
                        return {};
                    }
                },

                restart() {
                    client.Checkout.contexts.iframe = true;
                    renderCheckout();
                }

            }).catch(err => {
                return window.xchild.error(err);
            });
        },

        onAuth() {
            // pass
        },

        onCancel: window.xprops.onCancel,
        onError:  window.xprops.onError,
        commit:   window.xprops.commit,
        locale:   window.xprops.locale,
        test:     {
            action: action || 'checkout',
            ...checkout
        },

        ...props
    }, 'body');
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

} else if (action === 'checkout' || action === 'cancel' || action === 'error' || action === 'popout') {

    if (delay) {
        setTimeout(() => {
            getElement(selector || '.paypal-button', document).click();
        }, delay);
    } else {
        getElement(selector || '.paypal-button', document).click();
    }
}

if (onRender) {
    onRender({
        fundingSources: Array.from(new Set(getElements('[data-funding-source]').map(el => el.getAttribute('data-funding-source')))),
        click() {
            getElement('.paypal-button', document).click();
        }
    });
}

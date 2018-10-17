/* @flow */
/** @jsx jsxToHTML */

import { jsxToHTML, noop } from 'belter/src';
import { type ZalgoPromise } from 'zalgo-promise/src';

import { Buttons as ButtonsTemplate } from '../../../src/buttons/template';
import { getElement, getElements, errorOnWindowOpen } from '../../tests/common';

let { action, flow = 'popup', authed = false, bridge = false, delay = 0, onRender, checkout, selector, remembered, captureOrder = noop } = window.xprops.test;

const body = document.body;
if (body) {
    body.innerHTML = (
        <ButtonsTemplate { ...window.xprops } />
    ).toString();
}

if (flow === 'iframe') {

    window.paypal.Checkout.contexts.iframe = true;
}

if (bridge) {
    errorOnWindowOpen();
    delay = 100;
}

function renderCheckout(props = {}) {


    window.paypal.Checkout.renderTo(window.xchild.getParentRenderWindow(), {

        payment: window.xprops.createOrder,
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
                    window.paypal.Checkout.contexts.iframe = true;
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
        // eslint-disable-next-line unicorn/prefer-spread
        fundingSources: Array.from(new Set(getElements('[data-funding-source]').map(el => el.getAttribute('data-funding-source')))),
        click() {
            getElement('.paypal-button', document).click();
        }
    });
}

/* @flow */
/** @jsx node */

import { noop } from 'belter/src';
import { type ZalgoPromise } from 'zalgo-promise/src';
import { node, html } from 'jsx-pragmatic/src';

import { Buttons as ButtonsTemplate } from '../../../src/buttons/template';
import { getElement, getElements, errorOnWindowOpen } from '../../tests/common';

let { action, flow = 'popup', authed = false, bridge = false, delay = 0, onRender, checkout, selector, remembered, captureOrder = noop } = window.xprops.test;

const body = document.body;
if (body) {
    body.innerHTML = (
        <ButtonsTemplate { ...window.xprops } />
    ).render(html());
}

if (flow === 'iframe') {

    window.paypal.Checkout.contexts.iframe = true;
}

if (bridge) {
    errorOnWindowOpen();
    delay = 100;
}

function renderCheckout(props = {}) {


    window.paypal.Checkout.renderTo(window.parent, {

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
    }, 'body').catch(err => {

        if (err instanceof window.paypal.PopupOpenError) {
            window.paypal.Checkout.contexts.iframe = true;
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

} else if (action === 'checkout' || action === 'cancel' || action === 'error' || action === 'popout') {

    if (delay) {
        setTimeout(() => {
            getElement(selector || '.paypal-button', document).click();
        }, delay);
    } else {
        getElement(selector || '.paypal-button', document).click();
    }
} else {
    window.xprops.getPrerenderDetails().then(({ win, order, fundingSource }) => {
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

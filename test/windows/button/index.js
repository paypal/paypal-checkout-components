/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';
import { componentTemplate } from 'src/components/button/templates';
import { getElement, errorOnWindowOpen } from '../../tests/common';

let { action, flow = 'popup', authed = false, bridge = false, delay = 0, onRender } = window.xprops.test;

let button = componentTemplate({ props: window.xprops });

if (document.body) {
    document.body.innerHTML = button;
}

if (flow === 'iframe') {
    window.paypal.Checkout.contexts.iframe = true;
}

if (bridge) {
    errorOnWindowOpen();
}

function renderCheckout() {
    window.paypal.Checkout.renderTo(window.xchild.getParentRenderWindow(), {

        payment: window.xprops.payment,
        onAuthorize(data, actions) : void | ZalgoPromise<void> {

            return window.xprops.onAuthorize({
                ...data,

                payment: {}

            }, {
                ...actions,

                payment: {
                    execute() {
                        // pass
                    },

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
        onError: window.xprops.onError,
        commit: window.xprops.commit,
        locale: window.xprops.locale,
        test: {
            action: action || 'checkout'
        }
    });
}

getElement('#paypal-button', document).addEventListener('click', (event : Event) => {

    if (window.xprops.onClick) {
        window.xprops.onClick();
    }

    renderCheckout();
});

if (action === 'auth') {

    if (authed && window.xprops.onAuth) {
        window.xprops.onAuth();
    }

} else if (action === 'checkout' || action === 'cancel' || action === 'fallback' || action === 'error' || action === 'popout') {

    if (delay) {
        setTimeout(() => {
            getElement('#paypal-button', document).click();
        }, delay);
    } else {
        getElement('#paypal-button', document).click();
    }
}

if (onRender) {
    onRender({
        click() {
            getElement('#paypal-button', document).click();
        }
    });
}

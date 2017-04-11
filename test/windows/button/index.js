/* @flow */

import { getElement, errorOnWindowOpen } from '../../tests/common';

let { action, flow = 'popup', authed = false, bridge = false, delay = 0, onRender } = window.xprops.test;

if (flow === 'iframe') {
    window.paypal.Checkout.contexts.iframe = true;
}

if (bridge) {
    errorOnWindowOpen();
}

function renderCheckout() {
    window.paypal.Checkout.renderTo(window.xchild.getParentRenderWindow(), {

        payment: window.xprops.payment,
        onAuthorize(data, actions) : void | SyncPromise<void> {

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

getElement('#button', document).addEventListener('click', (event : Event) => {

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
            getElement('#button', document).click();
        }, delay);
    } else {
        getElement('#button', document).click();
    }
}

if (onRender) {
    onRender({
        click() {
            getElement('#button', document).click();
        }
    });
}

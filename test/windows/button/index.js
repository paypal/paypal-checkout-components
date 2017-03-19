/* @flow */

import { getElement, errorOnWindowOpen } from '../../tests/common';

let { action, flow, authed, bridge, delay } = window.xprops.test;

if (flow === 'lightbox') {
    window.paypal.Checkout.contexts.lightbox = true;
}

if (bridge) {
    errorOnWindowOpen();
}

function renderCheckout() {
    window.paypal.Checkout.renderTo(window.top.frames[0], {

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
                    window.paypal.Checkout.contexts.lightbox = true;
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
        test: window.xprops.test
    });
}

getElement('#button', document).addEventListener('click', (event : Event) => {
    renderCheckout();
});

if (action === 'auth') {

    if (authed && window.xprops.onAuth) {
        window.xprops.onAuth();
    }

} else {

    if (delay) {
        setTimeout(() => {
            getElement('#button', document).click();
        }, delay);
    } else {
        getElement('#button', document).click();
    }
}




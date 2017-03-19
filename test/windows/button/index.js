/* @flow */

import 'babel-polyfill';
import 'src/load';
import { getElement } from '../../tests/common';

let [ , testGroup ] = window.xprops.testAction.split(':');

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
        testAction: window.xprops.testAction
    });
}

getElement('#button', document).addEventListener('click', (event : Event) => {
    renderCheckout();
});

if (testGroup === 'authed' && window.xprops.onAuth) {
    window.xprops.onAuth();
}




/* @flow */

import { prefix } from 'beaver-logger/client';

import { onDocumentReady } from '../lib';
import { ENV } from '../constants';

import { LOG_PREFIX, ATTRIBUTES, CLASSES } from './constants';
import { setup } from './interface';

let { error, debug } = prefix(LOG_PREFIX);

/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

function invokeReady(method) {

    onDocumentReady(() => {
        debug(`paypal_checkout_ready`);
        setTimeout(() => {

            if (!window.paypal) {
                error(`paypal_checkout_ready_no_window_paypal`);
            }

            method();
        }, 1);
    });
}

function onKey(obj : Object, key : string, callback : Function) {

    if (!obj) {
        return;
    }

    let value = obj[key];

    if (value) {
        value = callback(value) || value;
    }

    try {

        delete obj[key];

        Object.defineProperty(obj, key, {

            configurable: true,

            set(item) {
                value = item;

                if (value) {
                    value = callback(value) || value;
                }
            },

            get() : mixed {
                return value;
            }
        });

    } catch (err) {
        // pass
    }
}

onKey(window, 'paypalCheckoutReady', method => {

    if (typeof method === 'function') {

        let oneTimeReady = function () : void {
            if (!method.called) {
                method.called = true;
                return method.apply(this, arguments);
            }
        };

        invokeReady(oneTimeReady);

        return oneTimeReady;
    }
});


/*  Scan for buttons
    ----------------

    Scan for any buttons on the page with a data-paypal-button attribute and auto-attach the PaypalCheckout component to them
*/

onDocumentReady(() => {

    let buttons = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTES.BUTTON }]`));

    if (buttons && buttons.length) {
        debug(`data_paypal_button`, { number: buttons.length });

        for (let button of buttons) {

            let id = button.getAttribute(ATTRIBUTES.MERCHANT_ID);

            let environment;

            if (button.hasAttribute(ATTRIBUTES.ENV)) {
                environment = button.getAttribute(ATTRIBUTES.ENV);
            } else if (button.hasAttribute(ATTRIBUTES.SANDBOX)) {
                environment = ENV.SANDBOX;
            }

            setup(id, { environment, button });
        }
    }

    // Show hidden buttons

    Array.prototype.slice.call(document.getElementsByClassName(CLASSES.HIDDEN_BUTTON)).forEach(el => {
        el.className = el.className.replace(CLASSES.HIDDEN_BUTTON, '');
    });
});

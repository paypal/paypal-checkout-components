
import logger from 'beaver-logger/client';

import { onDocumentReady } from '../lib';
import { ENV } from '../config';

import { LOG_PREFIX, ATTRIBUTES, CLASSES } from './constants';
import { setup } from './interface';

let $logger = logger.prefix(LOG_PREFIX);

/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

function invokeReady(method) {

    onDocumentReady(() => {
        $logger.debug(`paypal_checkout_ready`);
        setTimeout(() => {

            if (!window.paypal) {
                $logger.error(`paypal_checkout_ready_no_window_paypal`);
            }

            method();
        }, 1);
    });
}

if (typeof window.paypalCheckoutReady === 'function') {
    $logger.debug(`paypal_checkout_ready_preset`);
    invokeReady(window.paypalCheckoutReady);
}

let _paypalCheckoutReady = window.paypalCheckoutReady;

try {
    delete window.paypalCheckoutReady;

    Object.defineProperty(window, 'paypalCheckoutReady', {

        set(method) {
            $logger.debug(`paypal_checkout_ready_setter`);

            _paypalCheckoutReady = function() {
                if (!method.called) {
                    method.called = true;
                    return method.apply(this, arguments);
                }
            };

            invokeReady(_paypalCheckoutReady);
        },

        get() {
            $logger.warn(`paypal_checkout_ready_getter`);
            return _paypalCheckoutReady;
        }
    });
} catch (err) {
    $logger.warn(`paypal_checkout_ready_setter_error`, { error: err.stack || err.toString() });
}


/*  Scan for buttons
    ----------------

    Scan for any buttons on the page with a data-paypal-button attribute and auto-attach the PaypalCheckout component to them
*/

onDocumentReady(() => {

    let buttons = Array.prototype.slice.call(document.querySelectorAll(`[${ATTRIBUTES.BUTTON}]`));

    if (buttons && buttons.length) {
        $logger.debug(`data_paypal_button`, { number: buttons.length });

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

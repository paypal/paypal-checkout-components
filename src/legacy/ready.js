
import logger from 'beaver-logger/client';

import { onDocumentReady } from '../lib';
import { LOG_PREFIX } from './constants';

let $logger = logger.prefix(LOG_PREFIX);

/*  PayPal Checkout Ready
    ---------------------

    Call window.paypalCheckoutReady on document ready, if it has been defined by the merchant
*/

function invokeReady(method) {

    if (method.called) {
        return $logger.warn(`ready_called_multiple_times`);
    }

    method.called = true;

    onDocumentReady(() => {
        $logger.debug(`paypal_checkout_ready`);
        setTimeout(function() {

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

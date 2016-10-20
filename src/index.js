
import { config } from './config';
import { isPayPalDomain } from './lib/util';

import publicInterface from './interface/public';
import paypalInterface from './interface/paypal';

if (window.paypal && window.paypal.version === config.version) {

    let error = 'PayPal Checkout Integration Script already loaded on page';

    if (window.console) {
        if (window.console.warn) {
            window.console.warn(error);
        } else {
            window.console.log(error);
        }
    }

    module.exports = window.paypal;

} else {

    let paypal = (isPayPalDomain() || config.test) ? paypalInterface : publicInterface;

    module.exports = paypal;
    module.exports.default = module.exports;

    if (window.paypal) {

        window.paypal = {
            ...window.paypal,
            ...paypal
        };

    } else {
        window.paypal = paypal;
    }


    window.PAYPAL = require('./legacy/interface');
}

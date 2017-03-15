/* @flow */

import { beacon, checkpoint } from './lib/beacon';
import { uniqueID } from './lib/util';
import { extendPayPalNamespace } from './namespace';

function isPayPalDomain() : boolean {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(/^https?:\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/));
}

if (window.paypal && window.paypal.version === __MINOR_VERSION__) {

    checkpoint('load_again');

    let error = 'PayPal Checkout Integration Script already loaded on page';

    if (window.console) {
        if (window.console.warn) {
            window.console.warn(error);
        } else {
            window.console.log(error);
        }
    }

    module.exports = module.exports.default = window.paypal;

} else {

    window.pp_uid = window.pp_uid || uniqueID();

    checkpoint('load');

    try {

        let isPublic = (!isPayPalDomain() && !__TEST__);

        let paypal = isPublic
            ? require('./interface/public')
            : require('./interface/paypal');

        module.exports = module.exports.default = extendPayPalNamespace(paypal);

    } catch (err) {

        beacon('bootstrap_error', {
            message: err ? err.toString() : 'undefined',
            stack: err.stack || err.toString(),
            errtype: ({}).toString.call(err)
        });

        throw err;
    }
}

/* @flow weak */

import { beacon, checkpoint } from './lib/beacon';
import { uniqueID } from './lib/util';

function isPayPalDomain() {
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

    module.exports = window.paypal;
    module.exports.default = window.paypal;

} else {

    window.pp_uid = window.pp_uid || uniqueID();

    checkpoint('load');

    try {

        let paypal = (isPayPalDomain() || __TEST__) ? require('./interface/paypal') : require('./interface/public');

        for (let paypalNamespace of [ window.paypal, window.PAYPAL ]) {

            if (!paypalNamespace) {
                continue;
            }

            let apps = paypal.apps;

            if (paypalNamespace.apps) {
                apps = { ...paypalNamespace.apps, ...apps };
            }

            paypal = { ...paypalNamespace, ...paypal, apps };
        }

        module.exports = paypal;

        window.paypal = paypal;
        window.PAYPAL = paypal;
        window.ppxo = paypal;

    } catch (err) {

        beacon('bootstrap_error', {
            message: err ? err.toString() : 'undefined',
            stack: err.stack || err.toString(),
            errtype: ({}).toString.call(err)
        });

        throw err;
    }
}

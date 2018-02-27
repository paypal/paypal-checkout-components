/* @flow */

import { beacon } from './lib/beacon';
import { extendNamespace } from './lib/namespace';

if (window.paypal && window.paypal.version === __MINOR_VERSION__) {

    beacon('bootstrap_already_loaded_same_version', {
        version: __MINOR_VERSION__
    });

    throw new Error(`PayPal Checkout Integration Script with same version (${ __MINOR_VERSION__ }) already loaded on page`);

} else if (window.paypal && window.paypal.version && window.paypal.version !== __MINOR_VERSION__ && window.paypal.Button && window.paypal.Button.render) {

    beacon('bootstrap_already_loaded_different_version', {
        existingVersion: window.paypal.version,
        version:         __MINOR_VERSION__
    });

    throw new Error(`PayPal Checkout Integration Script with different version (${ window.paypal.version }) already loaded on page, current version: ${ __MINOR_VERSION__ }`);

} else {

    try {
        let _interface = require('./index');
        extendNamespace(_interface, [ 'paypal', 'PAYPAL', 'ppxo' ], [ 'apps' ]);

    } catch (err) {

        beacon('bootstrap_error', {
            message: err ? err.toString() : 'undefined',
            stack:   err.stack || err.toString(),
            errtype: ({}).toString.call(err)
        });

        throw err;
    }
}

/* @flow */

import { beacon } from './lib/beacon';
import { extendNamespace } from './lib/namespace';
import { stringifyError } from './lib/util';
import { isPayPalDomain } from './lib/security';

if (!__PAYPAL_CHECKOUT__.__MAJOR__ && !isPayPalDomain() && !__TEST__) {
    throw new Error(`Do not integrate with versioned script url`);
}

if (window.paypal && window.paypal.version === __PAYPAL_CHECKOUT__.__MINOR_VERSION__) {

    beacon('bootstrap_already_loaded_same_version', {
        version: __PAYPAL_CHECKOUT__.__MINOR_VERSION__
    });

    throw new Error(`PayPal Checkout Integration Script with same version (${ __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }) already loaded on page`);

} else if (window.paypal && window.paypal.version && window.paypal.version !== __PAYPAL_CHECKOUT__.__MINOR_VERSION__ && window.paypal.Button && window.paypal.Button.render) {

    beacon('bootstrap_already_loaded_different_version', {
        existingVersion: window.paypal.version,
        version:         __PAYPAL_CHECKOUT__.__MINOR_VERSION__
    });

    throw new Error(`PayPal Checkout Integration Script with different version (${ window.paypal.version }) already loaded on page, current version: ${ __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }`);

} else {

    try {
        const _interface = require('./index');
        extendNamespace(_interface, [ 'paypal', 'PAYPAL', 'ppxo' ], [ 'apps' ]);

    } catch (err) {

        beacon('bootstrap_error', {
            error:   stringifyError(err),
            errtype: ({}).toString.call(err)
        });

        throw err;
    }
}

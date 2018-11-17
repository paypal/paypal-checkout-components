/* @flow */

import { isPayPalDomain } from 'paypal-braintree-web-client/src';

import { Checkout as _Checkout } from '../checkout';

export let Checkout;
if (isPayPalDomain()) {
    Checkout = _Checkout;
}

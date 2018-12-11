/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';

import { Checkout as _Checkout } from '../checkout';

export let Checkout;
if (isPayPalDomain()) {
    Checkout = _Checkout;
}

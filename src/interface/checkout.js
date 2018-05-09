/* @flow */

import { ZalgoPromise as Promise } from 'zalgo-promise/src';
import { attach } from 'paypal-braintree-web-client/src';

import { Checkout } from '../checkout';

attach('checkout', () => {
    return {
        Checkout,
        Promise
    };
});

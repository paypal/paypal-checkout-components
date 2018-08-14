/* @flow */

import { ZalgoPromise as Promise } from 'zalgo-promise/src';
import { attach } from 'paypal-braintree-web-client/src';

import { Checkout } from '../checkout';
import { allowIframe } from '../lib';

attach('checkout', () => {
    return {
        Checkout,
        Promise,
        allowIframe
    };
});

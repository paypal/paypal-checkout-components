/* @flow */

import { ZalgoPromise as Promise } from 'zalgo-promise/src';
import { attach } from 'paypal-braintree-web-client/src';

import { Button } from '../button';
import { Checkout } from '../checkout';
import { FUNDING } from '../constants';
import { allowIframe } from '../lib';

attach('buttons', () => {
    return {
        Button,
        Checkout,
        Promise,
        FUNDING,
        allowIframe
    };
});

/* @flow */

import { ZalgoPromise as Promise } from 'zalgo-promise/src';
import { attach } from 'paypal-braintree-web-client/src';

import { Button } from '../button';
import { FUNDING } from '../constants';

attach('buttons', () => {
    return {
        Button,
        Promise,
        FUNDING
    };
});

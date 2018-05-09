/* @flow */

import { ZalgoPromise as Promise } from 'zalgo-promise/src';
import { destroyAll } from 'xcomponent/src';
import { attach } from 'paypal-braintree-web-client/src';

import { Button } from './button';
import { Checkout } from './checkout';
import { FUNDING } from './constants';

import './hacks'; // eslint-disable-line import/no-unassigned-import

attach('buttons', () => {
    return {
        Button,
        Promise,
        FUNDING
    };
});

attach('checkout', () => {
    return {
        Checkout
    };
});

if (__TEST__) {
    window.paypal = window.paypal.client();
    window.paypal.destroyAll = destroyAll;
}

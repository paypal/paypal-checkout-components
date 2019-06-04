/* @flow */

import { setupSDK } from '@paypal/sdk-client/src';

import * as paypalCheckout from './src/interface/button'; // eslint-disable-line import/no-namespace

setupSDK([
    {
        name:     'paypal-checkout',
        requirer: () => paypalCheckout
    }
]);

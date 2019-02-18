/* @flow */

import { setupSDK, insertMockSDKScript } from '@paypal/sdk-client/src';

import * as paypalCheckout from '../src/interface/button'; // eslint-disable-line import/no-namespace

insertMockSDKScript();

window.mockDomain = 'mock://www.paypal.com';

setupSDK([
    {
        name:     'paypal-checkout',
        requirer: () => paypalCheckout
    }
]);

/* @flow */

import { setupSDK, insertMockSDKScript } from '@paypal/sdk-client/src';

import * as paypalCheckout from '../src/interface/button'; // eslint-disable-line import/no-namespace
import * as paypalWallet from '../src/interface/wallet'; // eslint-disable-line import/no-namespace
import * as paypalMarks from '../src/interface/marks'; // eslint-disable-line import/no-namespace
import * as paypalFields from '../src/interface/fields'; // eslint-disable-line import/no-namespace
import * as paypalPaymentFields from '../src/interface/payment-fields'; // eslint-disable-line import/no-namespace

// the enable-funding=venmo flag is temporarily needed for the venmo experiment
insertMockSDKScript({
    query:      { 'client-id': 'test', 'enable-funding': 'venmo' },
    attributes: { 'data-csp-nonce': 'test' }
});

window.mockDomain = 'mock://www.paypal.com';

setupSDK([
    {
        name:     'paypal-checkout',
        requirer: () => paypalCheckout
    },
    {
        name:     'paypal-wallet',
        requirer: () => paypalWallet
    },
    {
        name:     'paypal-marks',
        requirer: () => paypalMarks
    },
    {
        name:     'paypal-fields',
        requirer: () => ({ ...paypalFields, ...paypalPaymentFields })
    }
]);

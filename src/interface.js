
import './bridge';

import xcomponent from 'xcomponent/src';
import postRobot from 'post-robot/src';

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import { createBraintreePayment, tokenizeBraintreePayment } from './braintree';
import { createCheckoutToken, createBillingToken } from './rest';

postRobot.CONFIG.ALLOW_POSTMESSAGE_POPUP = false;

import './fallback';

export { Button, Checkout, PayPalCheckout } from './components';
export { checkout, apps } from './legacy/interface';
export { setup } from './setup';
export { config } from './config';
export { isEligible } from './eligibility';
export { request } from './lib';

export let api = {
    braintree: {
        create:   createBraintreePayment,
        tokenize: tokenizeBraintreePayment
    },
    payment:   createCheckoutToken,
    billing:   createBillingToken
};

module.exports.xcomponent = xcomponent;
module.exports.postRobot = postRobot;

export let onPossiblyUnhandledException = Promise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;


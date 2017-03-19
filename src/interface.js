/* @flow */

import * as _postRobot from 'post-robot/src';
export let postRobot = _postRobot;

import * as _xcomponent from 'post-robot/src';
export let xcomponent = _xcomponent;

export { PopupOpenError } from 'xcomponent/src';

import { SyncPromise } from 'sync-browser-mocks/src/promise';
export { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export { rest } from './api';
export { Button } from './components';
export { checkout, apps } from './legacy';
export { setup } from './setup';
export { config, ENV, USERS } from './config';
export { request, isEligible, isWebView } from './lib';

export let onPossiblyUnhandledException = SyncPromise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;


// -------------------------------------------------------------

import { isPayPalDomain } from './lib';
import { Checkout as CheckoutComponent } from './components';

export let Checkout;
export let PayPalCheckout;

if (isPayPalDomain() || __TEST__) {
    Checkout = CheckoutComponent;
    PayPalCheckout = CheckoutComponent;
}

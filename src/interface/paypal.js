/* @flow */

export { default as postRobot } from 'post-robot/src';

import { SyncPromise } from 'sync-browser-mocks/src/promise';
export { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export { rest } from '../api';
export { Button, Checkout, Checkout as PayPalCheckout } from '../components';
export { checkout, apps } from '../legacy';
export { setup } from '../setup';
export { config } from '../config';
export { request, isEligible } from '../lib';

export let onPossiblyUnhandledException = SyncPromise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;

module.exports.default = module.exports;

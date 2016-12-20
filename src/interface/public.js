/* @flow */

export { default as postRobot } from 'post-robot/src';

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
export { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

export { rest } from '../api';
export { Button } from '../components';
export { checkout, apps } from '../legacy';
export { setup } from '../setup';
export { config } from '../config';
export { request, isEligible } from '../lib';

export let onPossiblyUnhandledException = Promise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;

module.exports.default = module.exports;

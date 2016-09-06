
import './bridge';

import xcomponent from 'xcomponent/src';
import postRobot from 'post-robot/src';
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

import './fallback';

export * from './components';
export * from './legacy';
export * from './setup';

module.exports.xcomponent = xcomponent;
module.exports.postRobot = postRobot;

export let onPossiblyUnhandledException = Promise.onPossiblyUnhandledException;

export let version = __MINOR_VERSION__;


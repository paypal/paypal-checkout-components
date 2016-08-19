
import './bridge';

import xcomponent from 'xcomponent/src';
import postRobot from 'post-robot/src';

export * from './components';
export * from './legacy';
export * from './setup';

module.exports.xcomponent = xcomponent;
module.exports.postRobot = postRobot;

export let version = __MINOR_VERSION__;


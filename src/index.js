
import xcomponent from 'xcomponent/src';

export * from './components';
export * from './legacy';

import './bridge';

module.exports.xcomponent = xcomponent;
module.exports.postRobot = xcomponent.postRobot;

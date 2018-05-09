/* @flow */

import { destroyAll } from 'xcomponent/src';

import './hacks'; // eslint-disable-line import/no-unassigned-import
import './interface/button'; // eslint-disable-line import/no-unassigned-import
import './interface/checkout'; // eslint-disable-line import/no-unassigned-import

if (__TEST__) {
    window.paypal.destroyAll = destroyAll;
}

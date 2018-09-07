/* @flow */

import './hacks'; // eslint-disable-line import/no-unassigned-import
import './checkout'; // eslint-disable-line import/no-unassigned-import

import { setup } from './setup';

export { Button } from '../button';
export { FUNDING } from '../constants';

export function setupButtons() {
    setup();
}

/* @flow */

import './hacks'; // eslint-disable-line import/no-unassigned-import
import { setup } from './setup';

export { Checkout } from '../checkout';
export { allowIframe } from '../lib';

export function setupCheckout() {
    setup();
}

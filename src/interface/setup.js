/* @flow */

import { once } from 'belter/src';

import { setupLogger } from '../lib';

export const setup = once(() => {
    setupLogger();
});

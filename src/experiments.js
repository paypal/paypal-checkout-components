/* @flow */

import { type Experiment } from 'belter/src';

import { createExperiment } from './lib';

export const nativeFakeoutExperiment : Experiment = createExperiment('native_popup_fakeout', 10);

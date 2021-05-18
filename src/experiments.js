/* @flow */

import { type Experiment } from 'belter/src';

import { createExperiment } from './lib';
import { UPGRADE_LSAT_RAMP } from './constants';

export const upgradeLSATExperiment : Experiment = createExperiment(UPGRADE_LSAT_RAMP.EXP_NAME, { sample: UPGRADE_LSAT_RAMP.RAMP });

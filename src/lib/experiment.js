/* @flow */

import { info, track, flush as flushLogs } from 'beaver-logger/client';
import { experiment, type Experiment } from 'belter/src';

import { FPTI } from '../constants';

export function createExperiment(name : string, sample : number) : Experiment {

    return experiment({
        name,
        sample,

        logTreatment({ treatment }) {
            track({
                [ FPTI.KEY.STATE ]:           FPTI.STATE.PXP,
                [ FPTI.KEY.TRANSITION ]:      FPTI.TRANSITION.PXP,
                [ FPTI.KEY.EXPERIMENT_NAME ]: name,
                [ FPTI.KEY.TREATMENT_NAME ]:  treatment
            });
            flushLogs();
        },

        logCheckpoint({ treatment, checkpoint, payload }) {
            info(`${ name }_${ treatment }_${ checkpoint }`, payload);
            flushLogs();
        }
    });
}

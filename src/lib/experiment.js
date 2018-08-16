/* @flow */


import { logger, FPTI_KEY } from 'paypal-braintree-web-client/src';
import { experiment, type Experiment } from 'belter/src';

import { FPTI_STATE, FPTI_TRANSITION } from '../constants';

export function createExperiment(name : string, sample : number) : Experiment {
    return experiment({
        name,
        sample,

        logTreatment({ treatment }) {
            logger.track({
                [ FPTI_KEY.STATE ]:           FPTI_STATE.PXP,
                [ FPTI_KEY.TRANSITION ]:      FPTI_TRANSITION.PXP,
                [ FPTI_KEY.EXPERIMENT_NAME ]: name,
                [ FPTI_KEY.TREATMENT_NAME ]:  treatment
            });
            logger.flush();
        },

        logCheckpoint({ treatment, checkpoint, payload }) {
            logger.info(`${ name }_${ treatment }_${ checkpoint }`, payload);
            logger.flush();
        }
    });
}

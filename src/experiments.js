/* @flow */

import { getLogger } from 'paypal-braintree-web-client/src';
import { FPTI_KEY } from 'paypal-sdk-constants/src';

import { FPTI_STATE, FPTI_CONTEXT_TYPE } from './constants';
import { getSessionState } from './lib';

export function trackExperiment({ experiment, treatment, state, token } : { experiment : string, treatment : string, state : string, token : ?string }) {

    if (!experiment || !treatment) {
        return;
    }

    getSessionState(session => {
        session.externalExperiment          = experiment;
        session.externalExperimentTreatment = treatment;

        if (token) {
            session.externalExperimentToken = token;
        }
    });

    getSessionState(session => {
        const logger = getLogger();

        let event        = `${ experiment }_${ treatment }_${ state }`;
        const loggedEvents = session.loggedExperimentEvents = session.loggedExperimentEvents || [];
        const duplicate    = loggedEvents.indexOf(event) !== -1;

        if (duplicate) {
            logger.info(`duplicate_${ event }`);

        } else {
            logger.info(event);
            loggedEvents.push(event);

            const edge = window.navigator && window.navigator.userAgent && window.navigator.userAgent.match(/Edge\/[0-9]{2}/);

            if (edge) {
                event = logger.info(`${ edge[0].toLowerCase().replace('/', '_') }_${ event }`);
            }

            logger.track({
                [ FPTI_KEY.STATE ]:           FPTI_STATE.CHECKOUT,
                [ FPTI_KEY.TRANSITION ]:      state,
                [ FPTI_KEY.EXPERIMENT_NAME ]: experiment,
                [ FPTI_KEY.TREATMENT_NAME ]:  treatment,
                [ FPTI_KEY.TOKEN ]:           token,
                [ FPTI_KEY.CONTEXT_ID ]:      token,
                [ FPTI_KEY.CONTEXT_TYPE ]:    token ? FPTI_CONTEXT_TYPE.ORDER_ID : FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID
            });

            logger.immediateFlush();
        }
    });
}

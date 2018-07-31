/* @flow */

import { info, track, immediateFlush } from 'beaver-logger/client';
import { eventEmitter } from 'belter/src';

import { FPTI } from './constants';
import { getSessionState } from './lib';

export let onAuthorizeListener = eventEmitter();

function log(experiment : string, treatment : string, token : ?string, state : string) {

    getSessionState(session => {

        let event        = `${ experiment }_${ treatment }_${ state }`;
        let loggedEvents = session.loggedExperimentEvents = session.loggedExperimentEvents || [];
        let duplicate    = loggedEvents.indexOf(event) !== -1;

        if (duplicate) {
            info(`duplicate_${ event }`);

        } else {
            info(event);
            loggedEvents.push(event);

            let edge = window.navigator && window.navigator.userAgent && window.navigator.userAgent.match(/Edge\/[0-9]{2}/);

            if (edge) {
                event = info(`${ edge[0].toLowerCase().replace('/', '_') }_${ event }`);
            }

            track({
                [ FPTI.KEY.STATE ]:           FPTI.STATE.CHECKOUT,
                [ FPTI.KEY.TRANSITION ]:      state,
                [ FPTI.KEY.EXPERIMENT_NAME ]: experiment,
                [ FPTI.KEY.TREATMENT_NAME ]:  treatment,
                [ FPTI.KEY.TOKEN ]:           token,
                [ FPTI.KEY.CONTEXT_ID ]:      token,
                [ FPTI.KEY.CONTEXT_TYPE ]:    token ? FPTI.CONTEXT_TYPE.EC_TOKEN : FPTI.CONTEXT_TYPE.BUTTON_SESSION_ID
            });

            immediateFlush();
        }
    });
}

export function logExperimentTreatment({ experiment, treatment, state, token } : { experiment : string, treatment : string, state : string, token : ?string }) {

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

    log(experiment, treatment, token, state);
}

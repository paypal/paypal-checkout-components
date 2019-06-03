/* @flow */

import { info, track, immediateFlush } from 'beaver-logger/client';

import { FPTI, PAYMENT_TYPE } from './constants';
import { getReturnToken, getSessionState, getDomainSetting, eventEmitter } from './lib';

export const onAuthorizeListener = eventEmitter();

function log(experiment : string, treatment : string, token : ?string, state : string) {

    getSessionState(session => {

        let event        = `${ experiment }_${ treatment }_${ state }`;
        const loggedEvents = session.loggedExperimentEvents = session.loggedExperimentEvents || [];
        const duplicate    = loggedEvents.indexOf(event) !== -1;

        if (duplicate) {
            info(`duplicate_${ event }`);

        } else {
            info(event);
            loggedEvents.push(event);

            const edge = window.navigator && window.navigator.userAgent && window.navigator.userAgent.match(/Edge\/[0-9]{2}/);

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
                [ FPTI.KEY.CONTEXT_TYPE ]:    token ? FPTI.CONTEXT_TYPE[PAYMENT_TYPE.EC_TOKEN] : FPTI.CONTEXT_TYPE.BUTTON_SESSION_ID
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

function logReturn(token : string) {

    const {
        externalExperiment,
        externalExperimentTreatment,
        externalExperimentToken
    } = getSessionState(session => session);

    if (externalExperiment && externalExperimentTreatment && externalExperimentToken === token) {
        log(externalExperiment, externalExperimentTreatment, token, `complete`);
    } else {
        info(`experiment_mismatch`, {
            token,
            externalExperiment,
            externalExperimentTreatment,
            externalExperimentToken
        });
    }
}

if (getDomainSetting('log_authorize')) {

    onAuthorizeListener.once(({ paymentToken }) => {
        setTimeout(() => {
            logReturn(paymentToken);
        }, 1);
    });

    const returnToken = getReturnToken();

    if (returnToken) {
        setTimeout(() => {
            if (returnToken) {
                logReturn(returnToken);
            }
        }, 1);
    }
}

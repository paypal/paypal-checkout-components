/* @flow */

import { info, track, immediateFlush } from 'beaver-logger/client';

import { FPTI } from './config';
import { getReturnToken, getSessionState, getDomainSetting, eventEmitter } from './lib';

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

export function logExperimentTreatment(experiment : string, treatment : string, token : ?string) {

    let exp;
    let state;

    if (experiment === 'walmart_paypal_incontext' || experiment === 'walmart_paypal_incontext_redirect') {
        exp   = 'walmart_paypal_incontext';
        state = 'redirect';
    } else if (experiment === 'walmart_paypal_incontext_click') {
        exp   = 'walmart_paypal_incontext';
        state = 'click';
    } else {
        exp = experiment;
        state = 'start';
    }

    getSessionState(session => {
        session.externalExperiment          = exp;
        session.externalExperimentTreatment = treatment;

        if (token) {
            session.externalExperimentToken = token;
        }
    });

    log(exp, treatment, token, state);
}

function logReturn(token : string) {

    let {
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

    let returnToken = getReturnToken();

    if (returnToken) {
        setTimeout(() => {
            if (returnToken) {
                logReturn(returnToken);
            }
        }, 1);
    }
}

/* @flow */

import { info, track, immediateFlush } from 'beaver-logger/client';

import { FPTI } from './config';
import { getReturnToken, getSessionState, getDomainSetting, eventEmitter } from './lib';

export let onAuthorizeListener = eventEmitter();

function log(experiment : string, treatment : string, token : ?string, state : string) {

    info(`experiment_group_${ experiment }_${ treatment }_${ state }`);

    let transition = (state === 'start')
        ? FPTI.TRANSITION.EXTERNAL_EXPERIMENT
        : FPTI.TRANSITION.EXTERNAL_EXPERIMENT_COMPLETE;

    track({
        [ FPTI.KEY.STATE ]:           FPTI.STATE.CHECKOUT,
        [ FPTI.KEY.TRANSITION ]:      transition,
        [ FPTI.KEY.EXPERIMENT_NAME ]: experiment,
        [ FPTI.KEY.TREATMENT_NAME ]:  treatment,
        [ FPTI.KEY.TOKEN ]:           token,
        [ FPTI.KEY.CONTEXT_ID ]:      token,
        [ FPTI.KEY.CONTEXT_TYPE ]:    token ? FPTI.CONTEXT_TYPE.EC_TOKEN : FPTI.CONTEXT_TYPE.UID
    });

    immediateFlush();
}

export function logExperimentTreatment(experiment : string, treatment : string, token : ?string) {

    if (experiment === 'walmart_paypal_incontext') {
        experiment = 'walmart_paypal_incontext_redirect';
    }

    let { existingTreatment, existingToken } = getSessionState(session => {

        let externalExperimentTreatment = session.externalExperimentTreatment;
        let externalExperimentToken     = session.externalExperimentToken;

        session.externalExperiment          = experiment;
        session.externalExperimentTreatment = treatment;
        session.externalExperimentToken     = token;

        if (token) {
            session.experimentToken = token;
        }

        return {
            existingTreatment: externalExperimentTreatment,
            existingToken:     externalExperimentToken
        };
    });

    if (existingTreatment) {
        info(`duplicate_experiment_start`);

        if (existingTreatment !== treatment) {
            info(`duplicate_experiment_start_different_treatment`, { treatment, existingTreatment });
        }

        if (existingToken && existingToken !== token) {
            info(`duplicate_experiment_complete_different_token`, { token, existingToken });
        }

        return;
    }

    log(experiment, treatment, token, 'start');
}

function logReturn(token : string, mechanism : string) {

    let { experiment, treatment, complete, existingToken } = getSessionState(session => {

        let externalExperiment           = session.externalExperiment;
        let externalExperimentTreatment  = session.externalExperimentTreatment;
        let externalExperimentComplete   = session.externalExperimentComplete;
        let externalExperimentToken      = session.externalExperimentToken;

        session.externalExperimentComplete = true;
        session.externalExperimentToken    = token;

        return {
            experiment:      externalExperiment,
            treatment:       externalExperimentTreatment || 'unknown',
            complete:        externalExperimentComplete,
            existingToken:   externalExperimentToken || 'unknown'
        };
    });

    if (complete) {
        info(`duplicate_experiment_complete`);

        if (existingToken !== token) {
            info(`duplicate_experiment_complete_different_token`, { token, existingToken });
        }

        return;
    }

    log(experiment, treatment, token, `complete_${ mechanism }`);
}

if (getDomainSetting('log_authorize')) {

    onAuthorizeListener.once(({ paymentToken }) => {
        logReturn(paymentToken, 'callback');
    });

    let returnToken = getReturnToken();

    if (returnToken) {
        logReturn(returnToken, 'redirect');
    }
}

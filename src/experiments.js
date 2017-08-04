/* flow */

import * as $logger from 'beaver-logger/client';

import { FPTI } from './config';
import { onAuthorizeListener } from './components/button';
import { getReturnToken, getSessionState, getDomainSetting } from './lib';

function log(experiment : string, treatment : string, token : string, state : string) {

    $logger.info(`experiment_group_${experiment}_${treatment}_${state}`);

    let transition = (state === 'start')
        ? FPTI.TRANSITION.EXTERNAL_EXPERIMENT
        : FPTI.TRANSITION.EXTERNAL_EXPERIMENT_COMPLETE;

    $logger.track({
        [ FPTI.KEY.STATE ]: FPTI.STATE.CHECKOUT,
        [ FPTI.KEY.TRANSITION ]: transition,
        [ FPTI.KEY.EXPERIMENT_NAME ]: experiment,
        [ FPTI.KEY.TREATMENT_NAME ]: treatment,
        [ FPTI.KEY.TOKEN ]: token,
        [ FPTI.KEY.CONTEXT_ID ]: token,
        [ FPTI.KEY.CONTEXT_TYPE ]: token ? FPTI.CONTEXT_TYPE.EC_TOKEN : FPTI.CONTEXT_TYPE.UID
    });

    $logger.immediateFlush();
}

export function logExperimentTreatment(experiment : string, treatment : string, token : string) {

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

    let state = existingTreatment ? 'start_duplicate' : 'start';

    if (existingTreatment) {
        $logger.info(`duplicate_experiment_start`);

        if (existingTreatment !== treatment) {
            $logger.info(`duplicate_experiment_start_different_treatment`, { treatment, existingTreatment });
        }

        if (existingToken && existingToken !== token) {
            $logger.info(`duplicate_experiment_complete_different_token`, { token, existingToken });
        }
    }

    log(experiment, treatment, token, state);
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
            treatment:       externalExperimentTreatment,
            complete:        externalExperimentComplete,
            existingToken:   externalExperimentToken
        };
    });

    let state = complete ? 'complete_duplicate' : 'complete';

    if (complete) {
        $logger.info(`duplicate_experiment_complete`);

        if (existingToken !== token) {
            $logger.info(`duplicate_experiment_complete_different_token`, { token, existingToken });
        }
    }

    log(experiment, treatment, token, `${ state }_${ mechanism }`);
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

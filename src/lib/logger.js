/* @flow */

import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';
import { config, FPTI } from '../config';
import { getCommonSessionID } from './session';
import { getDomainSetting } from './util';

function getRefererDomain() : string {
    return (window.xchild && window.xchild.getParentDomain)
        ? window.xchild.getParentDomain()
        : window.location.host;
}

export function initLogger() {

    $logger.addPayloadBuilder(() => {
        return {
            referer: getRefererDomain(),
            host: window.location.host,
            path: window.location.pathname,
            env: config.env,
            country: config.locale.country,
            lang: config.locale.lang,
            uid: getCommonSessionID(),
            ver: __MINOR_VERSION__
        };
    });

    $logger.addMetaBuilder(() => {
        return {
            state: config.state
        };
    });

    $logger.addTrackingBuilder(() => {
        return {
            [ FPTI.KEY.FEED ]: FPTI.FEED.CHECKOUTJS,
            [ FPTI.KEY.DATA_SOURCE ]: FPTI.DATA_SOURCE.CHECKOUT,
            [ FPTI.KEY.CONTEXT_TYPE ]: FPTI.CONTEXT_TYPE.UID,
            [ FPTI.KEY.SESSION_UID ]: getCommonSessionID(),
            [ FPTI.KEY.CONTEXT_ID ]: getCommonSessionID(),
            [ FPTI.KEY.REFERER ]: getRefererDomain()
        };
    });

    let prefix = 'ppxo';

    if (getDomainSetting('log_domain_prefix')) {
        prefix = `${ prefix }_${ window.location.host.replace(/[^a-zA-Z0-9_]/g, '_') }`;
    }

    $logger.init({
        uri: config.loggerUrl,
        heartbeat: false,
        logPerformance: false,
        prefix,
        logLevel: __DEFAULT_LOG_LEVEL__
    });
}

export function setLogLevel(logLevel : string) {

    if ($logger.logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${logLevel}`);
    }

    config.logLevel = logLevel;
    $logger.config.logLevel = logLevel;
    postRobot.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

export function logExperimentTreatment(experiment : string, treatment : string, token : string) {

    $logger.info(`experiment_group_${experiment}_${treatment}`);

    $logger.track({
        [ FPTI.KEY.STATE ]: FPTI.STATE.CHECKOUT,
        [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.EXTERNAL_EXPERIMENT,
        [ FPTI.KEY.EXPERIMENT_NAME ]: experiment,
        [ FPTI.KEY.TREATMENT_NAME ]: treatment,
        [ FPTI.KEY.TOKEN ]: token,
        [ FPTI.KEY.CONTEXT_ID ]: token,
        [ FPTI.KEY.CONTEXT_TYPE ]: token ? FPTI.CONTEXT_TYPE.EC_TOKEN : FPTI.CONTEXT_TYPE.UID
    });

    $logger.flush();
}

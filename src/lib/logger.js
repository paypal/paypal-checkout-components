/* @flow */

import * as postRobot from 'post-robot/src';
import * as $logger from 'beaver-logger/client';
import { config, FPTI } from '../config';
import { getPageID } from './util';

export function initLogger() {

    $logger.addPayloadBuilder(() => {
        return {
            host: window.location.host,
            path: window.location.pathname,
            env: config.env,
            country: config.locale.country,
            lang: config.locale.lang,
            uid: getPageID(),
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
            [ FPTI.KEY.UID ]: getPageID(),
            [ FPTI.KEY.CONTEXT_ID ]: getPageID(),
            [ FPTI.KEY.REFERER ]: window.location.host
        };
    });

    $logger.init({
        uri: config.loggerUrl,
        heartbeat: false,
        logPerformance: false,
        prefix: `ppxo`,
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

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
            [ FPTI.KEY.FEED ]: 'checkoutjs',
            [ FPTI.KEY.UID ]: getPageID()
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

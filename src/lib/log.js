
import $logger from 'beaver-logger/client';
import postRobot from 'post-robot/src';

import { config } from '../config';

export function setLogLevel(logLevel : string) {

    if ($logger.logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${logLevel}`);
    }

    config.logLevel = logLevel;
    $logger.config.logLevel = logLevel;
    postRobot.CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

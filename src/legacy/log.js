
import $logger from 'beaver-logger/client';

import { LOG_PREFIX } from './constants';

export function logDebug(event, payload = {}) {
    $logger.debug(`${LOG_PREFIX}_${event}`, payload);
}

export function logInfo(event, payload = {}) {
    $logger.info(`${LOG_PREFIX}_${event}`, payload);
}

export function logWarning(event, payload = {}) {
    $logger.warn(`${LOG_PREFIX}_${event}`, payload);
}

export function logError(event, payload = {}) {
    $logger.error(`${LOG_PREFIX}_${event}`, payload);
}

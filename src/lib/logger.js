
import $logger from 'beaver-logger/client';
import xcomponent from 'xcomponent/src';
import { config } from '../config';

export function initLogger() {

    xcomponent.registerLogger($logger);

    $logger.addPayloadBuilder(() => {
        return {
            host: window.location.host,
            path: window.location.pathname,
            env: config.env,
            country: config.locale.country,
            lang: config.locale.lang
        };
    });

    $logger.addMetaBuilder(() => {
        return {
            state: config.state
        };
    });

    let logUrl = config.env && config.loggerUrls[config.env] || config.loggerUrls.production;

    $logger.init({
        uri: logUrl,
        heartbeat: false,
        logPerformance: false
    });
}


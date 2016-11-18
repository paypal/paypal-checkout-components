
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
            lang: config.locale.lang,
            uid: window.pp_uid,
            ver: __MINOR_VERSION__
        };
    });

    $logger.addMetaBuilder(() => {
        return {
            state: config.state
        };
    });

    $logger.init({
        uri: config.loggerUrl,
        heartbeat: false,
        logPerformance: false,
        prefix: `ppxo`
    });
}


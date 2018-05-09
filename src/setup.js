/* @flow */

import { info, track, warn, error, flush as flushLogs } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config } from './config';
import { FPTI } from './constants';
import { initLogger, checkForCommonErrors, stringifyError,
    stringifyErrorMessage, isEligible, once } from './lib';

function domainToEnv(domain : string) : ?string {
    for (let env of Object.keys(config.paypalUrls)) {
        if (config.paypalUrls[env] === domain) {
            return env;
        }
    }
}

function setDomainEnv(domain : string) {
    let currentDomainEnv = domainToEnv(domain);

    if (currentDomainEnv && currentDomainEnv !== 'test') {
        config.env = currentDomainEnv;
    }
}

setDomainEnv(`${ window.location.protocol }//${ window.location.host }`);

ZalgoPromise.onPossiblyUnhandledException(err => {

    error('unhandled_error', {
        stack:   stringifyError(err),
        errtype: ({}).toString.call(err)
    });

    track({
        [ FPTI.KEY.ERROR_CODE ]: 'checkoutjs_error',
        [ FPTI.KEY.ERROR_DESC ]: stringifyErrorMessage(err)
    });

    return flushLogs().catch(err2 => {
        if (window.console) {
            try {
                if (window.console.error) {
                    window.console.error('Error flushing:', stringifyError(err2));
                } else if (window.console.log) {
                    window.console.log('Error flushing:', stringifyError(err2));
                }
            } catch (err3) {
                setTimeout(() => {
                    throw err3;
                }, 1);
            }
        }
    });
});

export let setup = once(() => {

    if (!isEligible()) {
        warn('ineligible');
    }

    checkForCommonErrors();

    initLogger();

    info(`setup_${ config.env }`);
});

setup();

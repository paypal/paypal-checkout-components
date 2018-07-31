/* @flow */

import { info, track, warn, error, flush as flushLogs } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';
import { stringifyError, stringifyErrorMessage, once } from 'belter/src';

import { config } from './config';
import { FPTI } from './constants';
import { initLogger, checkForCommonErrors, isEligible } from './lib';

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

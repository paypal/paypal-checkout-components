/* @flow */

import { logger, FPTI_KEY } from 'paypal-braintree-web-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { stringifyError, stringifyErrorMessage, once } from 'belter/src';

import { CURRENT_ENV } from './globals';
import { checkForCommonErrors, isEligible, setupLogger } from './lib';

ZalgoPromise.onPossiblyUnhandledException(err => {

    logger.error('unhandled_error', {
        stack:   stringifyError(err),
        errtype: ({}).toString.call(err)
    });

    logger.track({
        [ FPTI_KEY.ERROR_CODE ]: 'checkoutjs_error',
        [ FPTI_KEY.ERROR_DESC ]: stringifyErrorMessage(err)
    });

    logger.flush();
});

export let setup = once(() => {

    if (!isEligible()) {
        logger.warn('ineligible');
    }

    checkForCommonErrors();

    setupLogger();

    logger.info(`setup_${ CURRENT_ENV }`);
});

setup();

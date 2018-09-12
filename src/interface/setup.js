/* @flow */

import { getLogger, getEnv } from 'paypal-braintree-web-client/src';
import { once } from 'belter/src';

import { checkForCommonErrors, isEligible, setupLogger } from '../lib';

export let setup = once(() => {
    let logger = getLogger();

    if (!isEligible()) {
        logger.warn('ineligible');
    }

    if (__DEBUG__) {
        checkForCommonErrors();
    }

    setupLogger();

    logger.info(`setup_${ getEnv() }`);
});

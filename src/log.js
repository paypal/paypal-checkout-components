/* @flow */

import { Logger, type LoggerType } from 'beaver-logger/src';
import { noop, stringifyError, stringifyErrorMessage, inlineMemoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME, FPTI_USER_ACTION } from '@paypal/sdk-constants/src';

import { LOGGER_URL } from './config';

export function getLogger() : LoggerType {
    return inlineMemoize(getLogger, () =>
        Logger({
            url: LOGGER_URL
        }));
}

export function setupLogger() {
    const logger = getLogger();

    logger.addPayloadBuilder(() => {
        return {
            referer: window.location.host,
            uid:     window.xprops.sessionID,
            env:     window.xprops.env
        };
    });

    logger.addTrackingBuilder(() => {
        const { lang, country } = window.xprops.locale;
        const mID = window.xprops.merchantID;

        return {
            [FPTI_KEY.FEED]:                   FPTI_FEED.PAYMENTS_SDK,
            [FPTI_KEY.DATA_SOURCE]:            FPTI_DATA_SOURCE.PAYMENTS_SDK,
            [FPTI_KEY.CLIENT_ID]:              window.xprops.clientID,
            [FPTI_KEY.SELLER_ID]:              mID && mID[0],
            [FPTI_KEY.SESSION_UID]:            window.xprops.sessionID,
            [FPTI_KEY.REFERER]:                window.location.host,
            [FPTI_KEY.LOCALE]:                 `${ lang }_${ country }`,
            [FPTI_KEY.INTEGRATION_IDENTIFIER]: window.xprops.clientID,
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: window.xprops.partnerAttributionID,
            [FPTI_KEY.SDK_NAME]:               FPTI_SDK_NAME.PAYMENTS_SDK,
            [FPTI_KEY.SDK_VERSION]:            window.paypal.version,
            [FPTI_KEY.USER_AGENT]:             window.navigator && window.navigator.userAgent,
            [FPTI_KEY.USER_ACTION]:            window.xprops.commit ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE,
            [FPTI_KEY.CONTEXT_CORRID]:         window.xprops.correlationID
        };
    });

    ZalgoPromise.onPossiblyUnhandledException(err => {

        logger.track({
            [FPTI_KEY.ERROR_CODE]: 'payments_sdk_error',
            [FPTI_KEY.ERROR_DESC]: stringifyErrorMessage(err)
        });

        logger.error('unhandled_error', {
            err: stringifyError(err)
        });

        // eslint-disable-next-line promise/no-promise-in-callback
        logger.flush().catch(noop);
    });
}

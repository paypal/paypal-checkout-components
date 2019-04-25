/* @flow */

import { Logger, type LoggerType } from 'beaver-logger/src';
import { noop, stringifyError, stringifyErrorMessage, inlineMemoize } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FPTI_KEY, FPTI_FEED, FPTI_DATA_SOURCE, FPTI_SDK_NAME, FPTI_USER_ACTION, ENV } from '@paypal/sdk-constants/src';

import { LOGGER_URL } from '../config';
import type { LocaleType } from '../types';

export function getLogger() : LoggerType {
    return inlineMemoize(getLogger, () =>
        Logger({
            url: LOGGER_URL
        }));
}

type LoggerOptions = {|
    env : $Values<typeof ENV>,
    sessionID : string,
    clientID : string,
    partnerAttributionID : ?string,
    commit : boolean,
    correlationID : string,
    locale : LocaleType,
    merchantID : ?string
|};

export function setupLogger({ env, sessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID } : LoggerOptions) {
    const logger = getLogger();

    logger.addPayloadBuilder(() => {
        return {
            referer: window.location.host,
            uid:     sessionID,
            env
        };
    });

    logger.addTrackingBuilder(() => {
        const { lang, country } = locale;
        const mID = merchantID;

        return {
            [FPTI_KEY.FEED]:                   FPTI_FEED.PAYMENTS_SDK,
            [FPTI_KEY.DATA_SOURCE]:            FPTI_DATA_SOURCE.PAYMENTS_SDK,
            [FPTI_KEY.CLIENT_ID]:              clientID,
            [FPTI_KEY.SELLER_ID]:              mID && mID[0],
            [FPTI_KEY.SESSION_UID]:            sessionID,
            [FPTI_KEY.REFERER]:                window.location.host,
            [FPTI_KEY.LOCALE]:                 `${ lang }_${ country }`,
            [FPTI_KEY.INTEGRATION_IDENTIFIER]: clientID,
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]: partnerAttributionID,
            [FPTI_KEY.SDK_NAME]:               FPTI_SDK_NAME.PAYMENTS_SDK,
            [FPTI_KEY.SDK_VERSION]:            window.paypal.version,
            [FPTI_KEY.USER_AGENT]:             window.navigator && window.navigator.userAgent,
            [FPTI_KEY.USER_ACTION]:            commit ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE,
            [FPTI_KEY.CONTEXT_CORRID]:         correlationID
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

/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { isIEIntranet, getPageRenderTime } from '@krakenjs/belter/src';
import { FPTI_KEY, FUNDING } from '@paypal/sdk-constants/src';
import { type LoggerType, getHTTPTransport } from '@krakenjs/beaver-logger/src';

import {  FPTI_TRANSITION, FPTI_STATE, AMPLITUDE_KEY, FPTI_CONTEXT_TYPE } from '../../constants';
import { enableAmplitude, getLogger, setupLogger, getSDKVersion } from '../../lib';

export function setupNativeQRLogger() : LoggerType {
    const { env, sessionID, buttonSessionID, sdkCorrelationID, clientID, fundingSource = FUNDING.VENMO, locale, getParent, orderID } = window.xprops;

    const parent = getParent();
    const sdkVersion = getSDKVersion();
    const buyerCountry = locale.country;

    const logger = getLogger();
    logger.configure({
        transport: parent && getHTTPTransport(parent)
    });

    setupLogger({ env, sessionID, clientID, sdkCorrelationID, locale, sdkVersion, buyerCountry, fundingSource });
    enableAmplitude({ env });

    logger.addPayloadBuilder(() => {
        return {
            buttonSessionID,
            [AMPLITUDE_KEY.USER_ID]: buttonSessionID
        };
    });

    logger.addTrackingBuilder(() => {
        return {
            [FPTI_KEY.STATE]:                        FPTI_STATE.BUTTON,
            [FPTI_KEY.CONTEXT_TYPE]:                 FPTI_CONTEXT_TYPE.ORDER_ID,
            [FPTI_KEY.CONTEXT_ID]:                   orderID,
            [FPTI_KEY.BUTTON_SESSION_UID]:           buttonSessionID,
            [FPTI_KEY.BUTTON_VERSION]:               __SMART_BUTTONS__.__MINOR_VERSION__,
            [AMPLITUDE_KEY.USER_ID]:                 buttonSessionID
        };
    });

    if (isIEIntranet()) {
        logger.warn('button_child_intranet_mode');
    }

    ZalgoPromise.hash({
        pageRenderTime: getPageRenderTime()
    }).then(({ pageRenderTime }) => {

        logger.track({
            [FPTI_KEY.TRANSITION]:     FPTI_TRANSITION.QR_LOAD,
            [FPTI_KEY.SELECTED_FI]:    fundingSource,
            [FPTI_KEY.PAGE_LOAD_TIME]: pageRenderTime ? pageRenderTime.toString() : ''
        });

        logger.flush();
    });
    return logger;
}

/* @flow */

import { isIEIntranet, getPageRenderTime } from 'belter/src';
import { FUNDING, FPTI_KEY, ENV } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { LocaleType } from '../types';
import { getLogger, setupLogger } from '../lib';
import { DATA_ATTRIBUTES, FPTI_TRANSITION, FTPI_WALLET_KEY, FPTI_STATE, FPTI_CONTEXT_TYPE } from '../constants';

type WalletLoggerOptions = {|
    env : $Values<typeof ENV>,
    sessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    commit : boolean,
    correlationID : string,
    locale : LocaleType,
    walletSessionID : string,
    merchantID : $ReadOnlyArray<string>,
    merchantDomain : string,
    version : string
|};

export function setupWalletLogger({ env, sessionID, walletSessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID, merchantDomain, version } : WalletLoggerOptions) : ZalgoPromise<void> {
    const logger = getLogger();

    setupLogger({ env, sessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID, merchantDomain, version });

    logger.addPayloadBuilder(() => {
        return {
            walletSessionID
        };
    });

    logger.addTrackingBuilder(() => {
        return {
            [FPTI_KEY.STATE]:                     FPTI_STATE.WALLET,
            [FPTI_KEY.CONTEXT_TYPE]:              FPTI_CONTEXT_TYPE.WALLET_SESSION_ID,
            [FPTI_KEY.CONTEXT_ID]:                walletSessionID,
            [FPTI_KEY.STATE]:                     FPTI_STATE.WALLET,
            [FTPI_WALLET_KEY.WALLET_SESSION_UID]: walletSessionID,
            [FTPI_WALLET_KEY.WALLET_VERSION]:     __SMART_WALLET__.__MINOR_VERSION__
        };
    });

    if (isIEIntranet()) {
        logger.warn('wallet_child_intranet_mode');
    }

    return getPageRenderTime().then(pageRenderTime => {

        const fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.CARD) || el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        logger.track({
            [FPTI_KEY.TRANSITION]:                    FPTI_TRANSITION.WALLET_LOAD,
            [FPTI_KEY.FUNDING_LIST]:                  fundingSources.join(':'),
            [FPTI_KEY.FUNDING_COUNT]:                 fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]:                pageRenderTime ? pageRenderTime.toString() : ''
        });

        logger.flush();
    });
}

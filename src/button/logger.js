/* @flow */

import { isIEIntranet, getPageRenderTime, querySelectorAll } from 'belter/src';
import { FPTI_KEY, ENV, FUNDING, FPTI_USER_ACTION } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { LocaleType } from '../types';
import { getLogger, setupLogger, isStorageStateFresh, isIOSSafari, isAndroidChrome } from '../lib';
import { DATA_ATTRIBUTES, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FPTI_BUTTON_KEY, FPTI_STATE, FPTI_CONTEXT_TYPE } from '../constants';
import type { GetQueriedEligibleFunding } from '../props';

import type { ButtonStyle } from './props';

function getTemplateVersion() : string {
    const templateVersion = document.body && document.body.getAttribute(`${ DATA_ATTRIBUTES.RENDER_VERSION }`);
    return (templateVersion || 'unknown').replace(/[^a-zA-Z0-9]+/g, '_');
}

function getClientVersion() : string {
    const clientVersion = document.body && document.body.getAttribute(`${ DATA_ATTRIBUTES.CLIENT_VERSION }`);
    return (clientVersion || 'unknown').replace(/[^a-zA-Z0-9]+/g, '_');
}

type ButtonLoggerOptions = {|
    env : $Values<typeof ENV>,
    sessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    commit : boolean,
    sdkCorrelationID : string,
    buttonCorrelationID : string,
    locale : LocaleType,
    buttonSessionID : string,
    merchantID : $ReadOnlyArray<string>,
    merchantDomain : string,
    sdkVersion : string,
    style : ButtonStyle,
    fundingSource : ?$Values<typeof FUNDING>,
    getQueriedEligibleFunding : GetQueriedEligibleFunding,
    stickinessID : string
|};

export function setupButtonLogger({ env, sessionID, buttonSessionID, clientID, partnerAttributionID, commit, sdkCorrelationID, buttonCorrelationID, locale,
    merchantID, merchantDomain, sdkVersion, style, fundingSource, getQueriedEligibleFunding, stickinessID } : ButtonLoggerOptions) : ZalgoPromise<void> {

    const logger = getLogger();

    setupLogger({ env, sessionID, clientID, sdkCorrelationID, locale, sdkVersion });

    logger.addPayloadBuilder(() => {
        return {
            buttonSessionID,
            buttonCorrelationID
        };
    });

    logger.addTrackingBuilder(() => {
        return {
            [FPTI_KEY.STATE]:                        FPTI_STATE.BUTTON,
            [FPTI_KEY.CONTEXT_TYPE]:                 FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID,
            [FPTI_KEY.CONTEXT_ID]:                   buttonSessionID,
            [FPTI_KEY.STATE]:                        FPTI_STATE.BUTTON,
            [FPTI_KEY.BUTTON_SESSION_UID]:           buttonSessionID,
            [FPTI_KEY.BUTTON_VERSION]:               __SMART_BUTTONS__.__MINOR_VERSION__,
            [FPTI_BUTTON_KEY.BUTTON_CORRELATION_ID]: buttonCorrelationID,
            [FPTI_KEY.STICKINESS_ID]:                stickinessID,
            [FPTI_KEY.PARTNER_ATTRIBUTION_ID]:       partnerAttributionID,
            [FPTI_KEY.USER_ACTION]:                  commit ? FPTI_USER_ACTION.COMMIT : FPTI_USER_ACTION.CONTINUE,
            [FPTI_KEY.SELLER_ID]:                    merchantID[0],
            [FPTI_KEY.MERCHANT_DOMAIN]:              merchantDomain,
            [FPTI_KEY.TIMESTAMP]:                    Date.now().toString()
        };
    });

    if (isIEIntranet()) {
        logger.warn('button_child_intranet_mode');
    }

    return ZalgoPromise.hash({
        pageRenderTime:         getPageRenderTime(),
        queriedEligibleFunding: getQueriedEligibleFunding()
    }).then(({ pageRenderTime, queriedEligibleFunding }) => {

        const fundingSources = querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
        }).filter(Boolean);

        const walletInstruments = querySelectorAll(`[${ DATA_ATTRIBUTES.INSTRUMENT_TYPE }]`).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.INSTRUMENT_TYPE);
        }).filter(Boolean);

        const payNow = querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.PAY_NOW);
        }).some(Boolean);

        const { layout, color, shape, label, tagline = true } = style;

        let native_device = 'non_native';
        if (isIOSSafari()) {
            native_device = 'ios_safari';
        } else if (isAndroidChrome()) {
            native_device = 'android_chrome';
        }

        logger.info(`button_render`);
        logger.info(`button_render_template_version_${ getTemplateVersion() }`);
        logger.info(`button_render_client_version_${ getClientVersion() }`);
        logger.info(`button_render_color_${ color }`);
        logger.info(`button_render_shape_${ shape }`);
        logger.info(`button_render_label_${ label }`);
        logger.info(`button_render_layout_${ layout }`);
        logger.info(`button_render_tagline_${ tagline.toString() }`);
        logger.info(`button_render_funding_count_${ fundingSources.length }`);
        logger.info(`button_render_wallet_instrument_count_${ walletInstruments.length }`);
        logger.info(`button_render_${ native_device }_storage_state_${ isStorageStateFresh() ? 'fresh' : 'not_fresh' }`);

        for (const walletInstrument of walletInstruments) {
            logger.info(`button_render_wallet_instrument_${ walletInstrument }`);
        }

        logger.track({
            [FPTI_KEY.TRANSITION]:                    FPTI_TRANSITION.BUTTON_LOAD,
            [FPTI_KEY.FUNDING_LIST]:                  fundingSources.join(':'),
            [FPTI_KEY.FI_LIST]:                       walletInstruments.join(':'),
            [FPTI_KEY.SELECTED_FI]:                   fundingSource,
            [FPTI_KEY.FUNDING_COUNT]:                 fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]:                pageRenderTime ? pageRenderTime.toString() : '',
            [FPTI_KEY.POTENTIAL_PAYMENT_METHODS]:     queriedEligibleFunding.join(':'),
            [FPTI_KEY.PAY_NOW]:                       payNow.toString(),
            [FPTI_BUTTON_KEY.BUTTON_LAYOUT]:          layout,
            [FPTI_BUTTON_KEY.BUTTON_COLOR]:           color,
            [FPTI_BUTTON_KEY.BUTTON_SIZE]:            'responsive',
            [FPTI_BUTTON_KEY.BUTTON_SHAPE]:           shape,
            [FPTI_BUTTON_KEY.BUTTON_LABEL]:           label,
            [FPTI_BUTTON_KEY.BUTTON_WIDTH]:           window.innerWidth,
            [FPTI_BUTTON_KEY.BUTTON_TYPE]:            FPTI_BUTTON_TYPE.IFRAME,
            [FPTI_BUTTON_KEY.BUTTON_TAGLINE_ENABLED]: tagline ? '1' : '0'
        });

        logger.flush();
    });
}

/* @flow */

import { isIEIntranet, getPageRenderTime } from 'belter/src';
import { FPTI_KEY, ENV } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { LocaleType } from '../types';
import { getLogger, setupLogger } from '../lib';
import { DATA_ATTRIBUTES, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FTPI_BUTTON_KEY, FPTI_STATE, FPTI_CONTEXT_TYPE } from '../constants';

import type { ButtonStyle } from './props';

type ButtonLoggerOptions = {|
    env : $Values<typeof ENV>,
    sessionID : string,
    clientID : ?string,
    partnerAttributionID : ?string,
    commit : boolean,
    correlationID : string,
    locale : LocaleType,
    buttonSessionID : string,
    merchantID : $ReadOnlyArray<string>,
    merchantDomain : string,
    version : string,
    style : ButtonStyle
|};

export function setupButtonLogger({ env, sessionID, buttonSessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID, merchantDomain, version, style } : ButtonLoggerOptions) : ZalgoPromise<void> {
    const logger = getLogger();

    setupLogger({ env, sessionID, clientID, partnerAttributionID, commit, correlationID, locale, merchantID, merchantDomain, version });

    logger.addPayloadBuilder(() => {
        return {
            buttonSessionID
        };
    });

    logger.addTrackingBuilder(() => {
        return {
            [FPTI_KEY.STATE]:                  FPTI_STATE.BUTTON,
            [FPTI_KEY.CONTEXT_TYPE]:           FPTI_CONTEXT_TYPE.BUTTON_SESSION_ID,
            [FPTI_KEY.CONTEXT_ID]:             buttonSessionID,
            [FPTI_KEY.STATE]:                  FPTI_STATE.BUTTON,
            [FPTI_KEY.BUTTON_SESSION_UID]:     buttonSessionID,
            [FPTI_KEY.BUTTON_VERSION]:         __SMART_BUTTONS__.__MINOR_VERSION__
        };
    });

    if (isIEIntranet()) {
        logger.warn('button_child_intranet_mode');
    }

    return getPageRenderTime().then(pageRenderTime => {

        const fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
        });

        const { layout, color, shape, label, tagline = true } = style;

        logger.info(`button_render_color_${ color }`);
        logger.info(`button_render_shape_${ shape }`);
        logger.info(`button_render_label_${ label }`);
        logger.info(`button_render_layout_${ layout }`);
        logger.info(`button_render_tagline_${ tagline.toString() }`);

        logger.track({
            [FPTI_KEY.TRANSITION]:                    FPTI_TRANSITION.BUTTON_LOAD,
            [FPTI_KEY.FUNDING_LIST]:                  fundingSources.join(':'),
            [FPTI_KEY.FUNDING_COUNT]:                 fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]:                pageRenderTime ? pageRenderTime.toString() : '',
            [FTPI_BUTTON_KEY.BUTTON_LAYOUT]:          layout,
            [FTPI_BUTTON_KEY.BUTTON_COLOR]:           color,
            [FTPI_BUTTON_KEY.BUTTON_SIZE]:            'responsive',
            [FTPI_BUTTON_KEY.BUTTON_SHAPE]:           shape,
            [FTPI_BUTTON_KEY.BUTTON_LABEL]:           label,
            [FTPI_BUTTON_KEY.BUTTON_WIDTH]:           window.innerWidth,
            [FTPI_BUTTON_KEY.BUTTON_TYPE]:            FPTI_BUTTON_TYPE.IFRAME,
            [FTPI_BUTTON_KEY.BUTTON_TAGLINE_ENABLED]: tagline ? '1' : '0'
        });

        logger.flush();
    });
}

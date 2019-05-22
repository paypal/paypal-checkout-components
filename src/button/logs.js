/* @flow */

import { isIEIntranet, getPageRenderTime } from 'belter/src';
import { FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';

import { getLogger } from '../lib';
import { DATA_ATTRIBUTES, FPTI_TRANSITION, FPTI_BUTTON_TYPE, FTPI_BUTTON_KEY } from '../constants';

export function triggerButtonLogs() {
    const logger = getLogger();

    if (isIEIntranet()) {
        logger.warn('button_child_intranet_mode');
    }

    const xprops = window.xprops;

    if (!xprops) {
        throw new Error(`No xprops found`);
    }

    getPageRenderTime().then(pageRenderTime => {

        const fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ DATA_ATTRIBUTES.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(DATA_ATTRIBUTES.CARD) || el.getAttribute(DATA_ATTRIBUTES.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        const style = xprops.style || {};

        logger.track({
            [FPTI_KEY.TRANSITION]:           FPTI_TRANSITION.BUTTON_LOAD,
            [FPTI_KEY.FUNDING_LIST]:         fundingSources.join(':'),
            [FPTI_KEY.FUNDING_COUNT]:        fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]:       pageRenderTime ? pageRenderTime.toString() : '',
            [FTPI_BUTTON_KEY.BUTTON_LAYOUT]:  (style && style.layout),
            [FTPI_BUTTON_KEY.BUTTON_COLOR]:   (style && style.color),
            [FTPI_BUTTON_KEY.BUTTON_SIZE]:    (style && style.size),
            [FTPI_BUTTON_KEY.BUTTON_SHAPE]:   (style && style.shape),
            [FTPI_BUTTON_KEY.BUTTON_LABEL]:   (style && style.label),
            [FTPI_BUTTON_KEY.BUTTON_WIDTH]:   window.innerWidth,
            [FTPI_BUTTON_KEY.BUTTON_TYPE]:    FPTI_BUTTON_TYPE.IFRAME
        });

        logger.flush();
    });
}

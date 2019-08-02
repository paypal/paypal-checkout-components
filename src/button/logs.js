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

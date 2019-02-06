
/* @flow */

import { type ZoidComponent } from 'zoid/src';
import { getLogger, createOrder } from '@paypal/sdk-client/src';
import { getPageRenderTime, isIEIntranet } from 'belter/src';
import { FUNDING, FPTI_KEY } from '@paypal/sdk-constants/src';

import { ATTRIBUTE, FPTI_STATE, FPTI_TRANSITION, FPTI_BUTTON_TYPE, BUTTON_LAYOUT } from '../constants';

import { type ButtonProps } from './props';

export function setupButtonChild(Buttons : ZoidComponent<ButtonProps>) : void {

    if (isIEIntranet()) {
        return window.xchild.error(new Error(`Can not render button in IE Intranet mode`));
    }

    const xprops = Buttons.xprops;

    if (!xprops) {
        throw new Error(`No xprops found`);
    }

    getPageRenderTime().then(pageRenderTime => {
        const logger = getLogger();

        const fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        let layout = BUTTON_LAYOUT.HORIZONTAL;
        if (xprops.style && xprops.style.layout) {
            layout = xprops.style.layout;
        }

        logger.track({
            [FPTI_KEY.STATE]:          FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:     FPTI_TRANSITION.BUTTON_LOAD,
            [FPTI_KEY.BUTTON_TYPE]:    FPTI_BUTTON_TYPE.IFRAME,
            [FPTI_KEY.FUNDING_LIST]:   fundingSources.join(':'),
            [FPTI_KEY.FUNDING_COUNT]:  fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]: pageRenderTime ? pageRenderTime.toString() : '',
            [FPTI_KEY.BUTTON_LAYOUT]:  layout
        });

        logger.flush();
    });
    

    xprops.proxyRest({ createOrder });
}


/* @flow */

import { getLogger, FPTI_KEY } from 'paypal-braintree-web-client/src';
import { getPageRenderTime, isIEIntranet } from 'belter/src';

import { ATTRIBUTE, FUNDING, FPTI_STATE, FPTI_TRANSITION, FPTI_BUTTON_TYPE, BUTTON_LAYOUT } from '../constants';

import typeof { Button } from './component';

export function setupButtonChild(ButtonComponent : Button) : void {

    if (isIEIntranet()) {
        return window.xchild.error(new Error(`Can not render button in IE Intranet mode`));
    }

    getPageRenderTime().then(pageRenderTime => {
        let logger = getLogger();

        let fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        let xprops = ButtonComponent.xprops;

        logger.track({
            [FPTI_KEY.STATE]:          FPTI_STATE.BUTTON,
            [FPTI_KEY.TRANSITION]:     FPTI_TRANSITION.BUTTON_LOAD,
            [FPTI_KEY.BUTTON_TYPE]:    FPTI_BUTTON_TYPE.IFRAME,
            [FPTI_KEY.FUNDING_LIST]:   fundingSources.join(':'),
            [FPTI_KEY.FUNDING_COUNT]:  fundingSources.length.toString(),
            [FPTI_KEY.PAGE_LOAD_TIME]: pageRenderTime ? pageRenderTime.toString() : '',
            [FPTI_KEY.BUTTON_LAYOUT]:  (xprops && xprops.style && xprops.style.layout) || BUTTON_LAYOUT.HORIZONTAL
        });

        logger.flush();
    });
}


/* @flow */

import { track, flush as flushLogs } from 'beaver-logger/client';
import { getPageRenderTime } from 'belter/src';

import { ATTRIBUTE, FUNDING, FPTI, BUTTON_LAYOUT } from '../constants';

import typeof { Button } from './component';

export function setupButtonChild(ButtonComponent : Button) {

    getPageRenderTime().then(pageRenderTime => {

        let fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        let xprops = ButtonComponent.xprops;

        track({
            [FPTI.KEY.STATE]:          FPTI.STATE.BUTTON,
            [FPTI.KEY.TRANSITION]:     FPTI.TRANSITION.BUTTON_LOAD,
            [FPTI.KEY.BUTTON_TYPE]:    FPTI.BUTTON_TYPE.IFRAME,
            [FPTI.KEY.FUNDING_LIST]:   fundingSources.join(':'),
            [FPTI.KEY.FUNDING_COUNT]:  fundingSources.length,
            [FPTI.KEY.PAGE_LOAD_TIME]: pageRenderTime,
            [FPTI.KEY.BUTTON_LAYOUT]:  (xprops && xprops.style && xprops.style.layout) || BUTTON_LAYOUT.HORIZONTAL
        });

        flushLogs();
    });
}

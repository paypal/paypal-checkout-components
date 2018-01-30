
/* @flow */

import { track, flush as flushLogs } from 'beaver-logger/client';

import { Checkout } from '../checkout';
import { setupPopupBridgeProxy } from '../integrations/popupBridge';
import { getPageRenderTime, setLogLevel } from '../lib';
import { ATTRIBUTE, FUNDING, FPTI, BUTTON_LAYOUT } from '../constants';

export function setupButtonChild() {

    setupPopupBridgeProxy(Checkout);

    getPageRenderTime().then(pageRenderTime => {

        let fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        track({
            [FPTI.KEY.STATE]:          FPTI.STATE.BUTTON,
            [FPTI.KEY.TRANSITION]:     FPTI.TRANSITION.BUTTON_LOAD,
            [FPTI.KEY.BUTTON_TYPE]:    FPTI.BUTTON_TYPE.IFRAME,
            [FPTI.KEY.FUNDING_LIST]:   fundingSources.join(':'),
            [FPTI.KEY.FUNDING_COUNT]:  fundingSources.length,
            [FPTI.KEY.PAGE_LOAD_TIME]: pageRenderTime,
            [FPTI.KEY.BUTTON_LAYOUT]:  (window.xprops && window.xprops.style && window.xprops.style.layout) || BUTTON_LAYOUT.HORIZONTAL
        });

        flushLogs();
    });

    if (window.xprops.logLevel) {
        setLogLevel(window.xprops.logLevel);
    }
}


/* @flow */

import { track, flush as flushLogs } from 'beaver-logger/client';

import { Checkout } from '../checkout';
import { setupPopupBridgeProxy } from '../integrations/popupBridge';
import { getPageRenderTime, setLogLevel } from '../lib';
import { ATTRIBUTE, FUNDING, FPTI, BUTTON_LAYOUT, BUTTON_COLOR, BUTTON_SIZE, BUTTON_SHAPE, BUTTON_LABEL } from '../constants';

import typeof { Button } from './component';

export function setupButtonChild(ButtonComponent : Button) {
    setupPopupBridgeProxy(Checkout, ButtonComponent);

    getPageRenderTime().then(pageRenderTime => {

        const fundingSources = Array.prototype.slice.call(document.querySelectorAll(`[${ ATTRIBUTE.FUNDING_SOURCE }]`)).map(el => {
            return el.getAttribute(ATTRIBUTE.CARD) || el.getAttribute(ATTRIBUTE.FUNDING_SOURCE);
        }).filter(source => {
            return source && source !== FUNDING.CARD;
        });

        const xprops = ButtonComponent.xprops;

        track({
            [FPTI.KEY.STATE]:          FPTI.STATE.BUTTON,
            [FPTI.KEY.TRANSITION]:     FPTI.TRANSITION.BUTTON_LOAD,
            [FPTI.KEY.BUTTON_TYPE]:    FPTI.BUTTON_TYPE.IFRAME,
            [FPTI.KEY.FUNDING_LIST]:   fundingSources.join(':'),
            [FPTI.KEY.FUNDING_COUNT]:  fundingSources.length,
            [FPTI.KEY.PAGE_LOAD_TIME]: pageRenderTime,
            [FPTI.KEY.BUTTON_LAYOUT]:  (xprops && xprops.style && xprops.style.layout) || BUTTON_LAYOUT.HORIZONTAL,
            [FPTI.KEY.BUTTON_COLOR]:   (xprops && xprops.style && xprops.style.color)  || BUTTON_COLOR.GOLD,
            [FPTI.KEY.BUTTON_SIZE]:    (xprops && xprops.style && xprops.style.size)   || BUTTON_SIZE.SMALL,
            [FPTI.KEY.BUTTON_SHAPE]:   (xprops && xprops.style && xprops.style.shape)  || BUTTON_SHAPE.PILL,
            [FPTI.KEY.BUTTON_LABEL]:   (xprops && xprops.style && xprops.style.label)  || BUTTON_LABEL.CHECKOUT,
            [FPTI.KEY.BUTTON_WIDTH]:   window.innerWidth,
            [FPTI.KEY.MAX_BUTTONS]:    (xprops && xprops.style && xprops.style.maxbuttons)
        });

        flushLogs();
    });

    const xprops = ButtonComponent.xprops || Checkout.xprops;

    if (xprops && xprops.logLevel) {
        setLogLevel(xprops.logLevel);
    }
}

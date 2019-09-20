
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
        
        if (!xprops) {
            return;
        }

        const {
            layout = BUTTON_LAYOUT.HORIZONTAL,
            color = BUTTON_COLOR.GOLD,
            size = BUTTON_SIZE.SMALL,
            shape = BUTTON_SHAPE.PILL,
            label = BUTTON_LABEL.CHECKOUT,
            maxbuttons,
            tagline
        } = (xprops.style || {});

        track({
            [FPTI.KEY.STATE]:                  FPTI.STATE.BUTTON,
            [FPTI.KEY.TRANSITION]:             FPTI.TRANSITION.BUTTON_LOAD,
            [FPTI.KEY.BUTTON_TYPE]:            FPTI.BUTTON_TYPE.IFRAME,
            [FPTI.KEY.FUNDING_LIST]:           fundingSources.join(':'),
            [FPTI.KEY.FUNDING_COUNT]:          fundingSources.length,
            [FPTI.KEY.PAGE_LOAD_TIME]:         pageRenderTime,
            [FPTI.KEY.BUTTON_LAYOUT]:          layout,
            [FPTI.KEY.BUTTON_COLOR]:           color,
            [FPTI.KEY.BUTTON_SIZE]:            size,
            [FPTI.KEY.BUTTON_SHAPE]:           shape,
            [FPTI.KEY.BUTTON_LABEL]:           label,
            [FPTI.KEY.BUTTON_WIDTH]:           window.innerWidth,
            [FPTI.KEY.MAX_BUTTONS]:            maxbuttons,
            [FPTI.KEY.BUTTON_TAGLINE_ENABLED]: tagline ? '1' : '0'
        });

        flushLogs();
    });

    const xprops = ButtonComponent.xprops || Checkout.xprops;

    if (xprops && xprops.logLevel) {
        setLogLevel(xprops.logLevel);
    }

    // $FlowFixMe
    if (xprops.payment && !xprops.createOrder) {
        // $FlowFixMe
        xprops.createOrder = xprops.payment;
    }

    // $FlowFixMe
    if (xprops.onAuthorize && !xprops.onApprove) {
        // $FlowFixMe
        xprops.onApprove = xprops.onAuthorize;
    }

    try {
        if (xprops && xprops.onShippingChange && window.pre &&
            window.pre.inlineGuest && window.pre.inlineGuest.res &&
            window.pre.inlineGuest.res.data && window.pre.inlineGuest.res.data.treatments) {
            window.pre.inlineGuest.res.data.treatments = [];
        }
    } catch (err) {
        // pass
    }
}

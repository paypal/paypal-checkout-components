/* @flow */

import { setTransport, getTransport, addPayloadBuilder, addHeaderBuilder, addMetaBuilder,
    addTrackingBuilder, init } from 'beaver-logger/client';
import { getParent } from 'cross-domain-utils/src';
import { once, getQueryParam } from 'belter/src';

import { LOG_STATE, URLS } from '../config';
import { CURRENT_ENV, VERSION, MERCHANT_ID } from '../globals';
import { FPTI } from '../constants';

import { getSessionID, getButtonSessionID } from './session';
import { proxyMethod } from './proxy';

function getRefererDomain() : string {
    return (window.xchild && window.xchild.getParentDomain)
        ? window.xchild.getParentDomain()
        : window.location.host;
}

let setupProxyLogTransport = once(() => {
    setTransport(proxyMethod('log', getParent(window), getTransport()));
});

function getOrderID() : ?string {
    if (window.root && window.root.token) {
        return window.root.token;
    }

    let queryToken = getQueryParam('token');

    if (queryToken) {
        return queryToken;
    }
}

export function initLogger() {

    setupProxyLogTransport();

    addPayloadBuilder(() => {
        return {
            referer: getRefererDomain(),
            host:    window.location.host,
            path:    window.location.pathname,
            env:     CURRENT_ENV,
            uid:     getSessionID(),
            ver:     VERSION
        };
    });

    addHeaderBuilder(() => {
        return {
            'x-app-name': 'checkoutjs'
        };
    });

    addMetaBuilder(() => {
        return {
            state: LOG_STATE
        };
    });

    addTrackingBuilder((payload = {}) => {

        let sessionID       = getSessionID();
        let orderID         = getOrderID();
        let buttonSessionID = payload[FPTI.KEY.BUTTON_SESSION_UID] || getButtonSessionID();

        let contextType;
        let contextID;

        if (orderID) {
            contextType = FPTI.CONTEXT_TYPE.EC_TOKEN;
            contextID   = orderID;
        } else if (buttonSessionID) {
            contextType = FPTI.CONTEXT_TYPE.BUTTON_SESSION_ID;
            contextID   = buttonSessionID;
        } else {
            contextType = payload[FPTI.KEY.CONTEXT_TYPE];
            contextID   = payload[FPTI.KEY.CONTEXT_ID];
        }

        return {
            [ FPTI.KEY.FEED ]:               FPTI.FEED.CHECKOUTJS,
            [ FPTI.KEY.DATA_SOURCE ]:        FPTI.DATA_SOURCE.CHECKOUT,
            [ FPTI.KEY.CONTEXT_TYPE ]:       contextType,
            [ FPTI.KEY.CONTEXT_ID ]:         contextID,
            [ FPTI.KEY.SELLER_ID ]:          MERCHANT_ID,
            [ FPTI.KEY.SESSION_UID ]:        sessionID,
            [ FPTI.KEY.BUTTON_SESSION_UID ]: buttonSessionID,
            [ FPTI.KEY.VERSION ]:            VERSION,
            [ FPTI.KEY.TOKEN ]:              orderID,
            [ FPTI.KEY.REFERER ]:            getRefererDomain()
        };
    });

    let prefix = 'ppxo';

    init({
        uri:            URLS.LOGGER,
        heartbeat:      false,
        logPerformance: false,
        prefix,
        logLevel:       __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__
    });
}

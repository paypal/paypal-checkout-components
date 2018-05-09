/* @flow */

import { CONFIG as POSTROBOT_CONFIG } from 'post-robot/src';
import { setTransport, getTransport, addPayloadBuilder, addHeaderBuilder, addMetaBuilder,
    addTrackingBuilder, init, logLevels, config as loggerConfig } from 'beaver-logger/client';
import { getParent } from 'cross-domain-utils/src';

import { config } from '../config';
import { FPTI } from '../constants';

import { getSessionID, getButtonSessionID } from './session';
import { proxyMethod } from './proxy';
import { once } from './util';
import { getQueryParam } from './dom';

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
            env:     config.env,
            uid:     getSessionID(),
            ver:     __PAYPAL_CHECKOUT__.__MINOR_VERSION__
        };
    });

    addHeaderBuilder(() => {
        return {
            'x-app-name': 'checkoutjs'
        };
    });

    addMetaBuilder(() => {
        return {
            state: config.state
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
            [ FPTI.KEY.SELLER_ID ]:          config.merchantID,
            [ FPTI.KEY.SESSION_UID ]:        sessionID,
            [ FPTI.KEY.BUTTON_SESSION_UID ]: buttonSessionID,
            [ FPTI.KEY.VERSION ]:            config.version,
            [ FPTI.KEY.TOKEN ]:              orderID,
            [ FPTI.KEY.REFERER ]:            getRefererDomain()
        };
    });

    let prefix = 'ppxo';

    init({
        uri:            config.loggerUrl,
        heartbeat:      false,
        logPerformance: false,
        prefix,
        logLevel:       __PAYPAL_CHECKOUT__.__DEFAULT_LOG_LEVEL__
    });
}

export function setLogLevel(logLevel : string) {

    if (logLevels.indexOf(logLevel) === -1) {
        throw new Error(`Invalid logLevel: ${ logLevel }`);
    }

    config.logLevel = logLevel;
    loggerConfig.logLevel = logLevel;
    POSTROBOT_CONFIG.LOG_LEVEL = logLevel;
    window.LOG_LEVEL = logLevel;
}

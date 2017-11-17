/* @flow */

import { CONFIG as POSTROBOT_CONFIG } from 'post-robot/src';
import { setTransport, getTransport, addPayloadBuilder, addMetaBuilder,
    addTrackingBuilder, init, logLevels, config as loggerConfig } from 'beaver-logger/client';
import { getParent } from 'cross-domain-utils/src';

import { config, FPTI } from '../config';

import { getSessionID, getButtonSessionID } from './session';
import { proxyMethod } from './proxy';
import { getDomainSetting, once } from './util';
import { getQueryParam } from './dom';

function getRefererDomain() : string {
    return (window.xchild && window.xchild.getParentDomain)
        ? window.xchild.getParentDomain()
        : window.location.host;
}

let setupProxyLogTransport = once(() => {
    setTransport(proxyMethod('log', getParent(window), getTransport()));
});

function getToken() : ?string {
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
            country: config.locale.country,
            lang:    config.locale.lang,
            uid:     getSessionID(),
            ver:     __MINOR_VERSION__
        };
    });

    addMetaBuilder(() => {
        return {
            state: config.state
        };
    });

    addTrackingBuilder((payload = {}) => {

        let sessionID       = getSessionID();
        let buttonSessionID = payload[FPTI.KEY.BUTTON_SESSION_UID] || getButtonSessionID();
        let contextType     = buttonSessionID ? FPTI.CONTEXT_TYPE.BUTTON_SESSION_ID : payload[FPTI.KEY.CONTEXT_TYPE];
        let contextID       = buttonSessionID ? buttonSessionID : payload[FPTI.KEY.CONTEXT_ID];

        return {
            [ FPTI.KEY.FEED ]:               FPTI.FEED.CHECKOUTJS,
            [ FPTI.KEY.DATA_SOURCE ]:        FPTI.DATA_SOURCE.CHECKOUT,
            [ FPTI.KEY.CONTEXT_TYPE ]:       contextType,
            [ FPTI.KEY.CONTEXT_ID ]:         contextID,
            [ FPTI.KEY.SELLER_ID ]:          config.merchantID,
            [ FPTI.KEY.SESSION_UID ]:        sessionID,
            [ FPTI.KEY.BUTTON_SESSION_UID ]: buttonSessionID,
            [ FPTI.KEY.VERSION ]:            config.version,
            [ FPTI.KEY.TOKEN ]:              getToken(),
            [ FPTI.KEY.REFERER ]:            getRefererDomain()
        };
    });

    let prefix = 'ppxo';

    if (getDomainSetting('log_domain_prefix')) {
        prefix = `${ prefix }_${ window.location.host.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^www_/, '').replace(/_com$/, '') }`;
    }

    init({
        uri:            config.loggerUrl,
        heartbeat:      false,
        logPerformance: false,
        prefix,
        logLevel:       __DEFAULT_LOG_LEVEL__
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

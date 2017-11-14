/* @flow */

import { info, track, debug, warn, error, flush as flushLogs } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config, FPTI } from './config';
import { initLogger, checkForCommonErrors, setLogLevel, stringifyError,
    stringifyErrorMessage, getResourceLoadTime, isPayPalDomain, isEligible,
    getDomainSetting, once, openMetaFrame, precacheRememberedFunding } from './lib';
import { createPptmScript } from './lib/pptm';

function domainToEnv(domain : string) : ?string {
    for (let env of Object.keys(config.paypalUrls)) {
        if (config.paypalUrls[env] === domain) {
            return env;
        }
    }
}

function setDomainEnv(domain : string) {
    let currentDomainEnv = domainToEnv(domain);

    if (currentDomainEnv && currentDomainEnv !== 'test') {
        config.env = currentDomainEnv;
    }
}

setDomainEnv(`${ window.location.protocol }//${ window.location.host }`);

ZalgoPromise.onPossiblyUnhandledException(err => {

    error('unhandled_error', {
        stack:   stringifyError(err),
        errtype: ({}).toString.call(err)
    });

    track({
        [ FPTI.KEY.ERROR_CODE ]: 'checkoutjs_error',
        [ FPTI.KEY.ERROR_DESC ]: stringifyErrorMessage(err)
    });

    return flushLogs().catch(err2 => {
        if (window.console) {
            try {
                if (window.console.error) {
                    window.console.error('Error flushing:', err2.stack || err2.toString());
                } else if (window.console.log) {
                    window.console.log('Error flushing:', err2.stack || err2.toString());
                }
            } catch (err3) {
                setTimeout(() => {
                    throw err3;
                }, 1);
            }
        }
    });
});


function getCurrentScript() : ? HTMLScriptElement {

    let scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (let script of scripts) {
        if (script.src && (script.src.replace(/^https?:/, '').split('?')[0] === config.scriptUrl || script.hasAttribute('data-paypal-checkout'))) {
            return script;
        }

        if (script.src && (script.src.indexOf('paypal.checkout.v4.js') !== -1)) {
            return script;
        }
    }

    if (document.currentScript) { // eslint-disable-line compat/compat
        debug(`current_script_not_recognized`, { src: document.currentScript.src }); // eslint-disable-line compat/compat
    }
}

let currentScript = getCurrentScript();
let currentProtocol = window.location.protocol.split(':')[0];


type ConfigOptions = {
    env? : ?string,
    stage? : ?string,
    apiStage? : ?string,
    state? : ?string,
    ppobjects? : ?boolean,
    logLevel? : ?string,
    merchantID? : ?string
};

function configure({ env, stage, apiStage, state, ppobjects, logLevel, merchantID } : ConfigOptions = {}) {

    if (env) {
        if (!config.paypalUrls[env]) {
            throw new Error(`Invalid env: ${ env }`);
        }

        delete config.env;
        config.env = env;
    }

    if (stage) {
        delete config.stage;
        config.stage = stage;
    }

    if (apiStage) {
        delete config.apiStage;
        config.apiStage = apiStage;
    }

    if (state) {
        delete config.state;
        config.state = state;
    }

    if (ppobjects) {
        config.ppobjects = true;
    }

    if (merchantID) {
        config.merchantID = merchantID;
    }

    if (logLevel) {
        setLogLevel(logLevel);
    } else {
        setLogLevel(config.logLevel);
    }
}

export let init = once(({ precacheRemembered }) => {

    if (!isEligible()) {
        warn('ineligible');
    }

    checkForCommonErrors();

    initLogger();

    if (!isPayPalDomain()) {
        createPptmScript();
    }

    if (precacheRemembered) {
        precacheRememberedFunding();
    }

    if (getDomainSetting('force_bridge') && !isPayPalDomain()) {
        openMetaFrame(config.env);
    }

    info(`setup_${ config.env }`);

    debug(`current_protocol_${ currentProtocol }`);
});

export function setup(options : ConfigOptions = {}) {
    configure(options);
    init(options);
}

if (currentScript) {
    setup({
        env:                currentScript.getAttribute('data-env'),
        stage:              currentScript.getAttribute('data-stage'),
        apiStage:           currentScript.getAttribute('data-api-stage'),
        state:              currentScript.getAttribute('data-state'),
        logLevel:           currentScript.getAttribute('data-log-level'),
        merchantID:         currentScript.getAttribute('data-merchant-id'),
        precacheRemembered: currentScript.hasAttribute('data-precache-remembered-funding'),
        ppobjects:          true
    });

} else {
    setup();
}

if (!isPayPalDomain()) {

    if (currentScript) {

        let scriptProtocol = currentScript.src.split(':')[0];
        let loadTime = getResourceLoadTime(currentScript.src);

        debug(`current_script_protocol_${ scriptProtocol }`);
        debug(`current_script_protocol_${ currentProtocol === scriptProtocol ? 'match' : 'mismatch' }`);
        debug(`current_script_version_${ config.version.replace(/[^0-9a-zA-Z]+/g, '_') }`);

        if (loadTime) {
            debug(`current_script_time`, { loadTime });
            debug(`current_script_time_${ Math.floor(loadTime / 1000) }`);
        }

        track({
            [ FPTI.KEY.STATE ]:           FPTI.STATE.LOAD,
            [ FPTI.KEY.TRANSITION ]:      FPTI.TRANSITION.SCRIPT_LOAD,
            [ FPTI.KEY.TRANSITION_TIME ]: loadTime
        });

    } else {

        debug(`no_current_script`);
        debug(`no_current_script_version_${ config.version.replace(/[^0-9a-zA-Z]+/g, '_') }`);

        if (document.currentScript) {  // eslint-disable-line compat/compat
            debug(`current_script_not_recognized`, { src: document.currentScript.src });  // eslint-disable-line compat/compat
        }

        track({
            [ FPTI.KEY.STATE ]:      FPTI.STATE.LOAD,
            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.SCRIPT_LOAD
        });
    }
}

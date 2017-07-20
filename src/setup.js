/* @flow */

import * as $logger from 'beaver-logger/client';

import { config, FPTI } from './config';
import { initLogger, checkForCommonErrors, setLogLevel, stringifyError } from './lib';
import { enableCheckoutIframe } from './components';
import { createPptmScript } from './lib/pptm';
import { isPayPalDomain, isEligible } from './lib';

import { ZalgoPromise } from 'zalgo-promise/src';

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

setDomainEnv(`${window.location.protocol}//${window.location.host}`);

initLogger();

ZalgoPromise.onPossiblyUnhandledException(err => {

    $logger.error('unhandled_error', {
        stack: stringifyError(err),
        errtype: ({}).toString.call(err)
    });

    $logger.track({
        [ FPTI.KEY.ERROR_CODE ]: 'checkoutjs_error',
        [ FPTI.KEY.ERROR_DESC ]: stringifyError(err)
    });

    $logger.flush().catch(err2 => {
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
        if (script.src && script.getAttribute('src') === config.scriptUrl || script.hasAttribute('data-paypal-checkout')) {
            return script;
        }

        if (script.src && script.src.indexOf('paypal.checkout.v4.js') !== -1) {
            return script;
        }
    }

    if (document.currentScript) {
        $logger.debug(`current_script_not_recognized`, { src: document.currentScript.src });
    }
}

let currentScript = getCurrentScript();
let currentProtocol = window.location.protocol.split(':')[0];


type SetupOptions = {
    env? : ?string,
    stage? : ?string,
    apiStage? : ?string,
    paypalUrl? : ?string,
    state? : ?string,
    ppobjects? : ?boolean,
    lightbox? : ?boolean,
    logLevel? : ?string
};

export function setup({ env, stage, apiStage, paypalUrl, state, ppobjects, lightbox, logLevel } : SetupOptions = {}) {

    if (!isEligible()) {
        $logger.warn('ineligible');
    }

    checkForCommonErrors();

    if (env) {
        if (!config.paypalUrls[env]) {
            throw new Error(`Invalid env: ${env}`);
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

    if (paypalUrl) {
        delete config.paypalUrl;
        config.paypalUrl = paypalUrl;
        setDomainEnv(config.paypalUrl);
    }

    if (state) {
        delete config.state;
        config.state = state;
    }

    if (ppobjects) {
        config.ppobjects = true;
    }

    if (lightbox) {
        enableCheckoutIframe();
    }

    if (logLevel) {
        setLogLevel(logLevel);
    } else {
        setLogLevel(config.logLevel);
    }

    if (!isPayPalDomain()) {
        createPptmScript();
    }

    $logger.info(`setup_${config.env}`);

    $logger.debug(`current_protocol_${currentProtocol}`);
}

$logger.track({
    [ FPTI.KEY.STATE ]: FPTI.STATE.LOAD,
    [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.SCRIPT_LOAD
});

if (currentScript) {

    setup({
        env:        currentScript.getAttribute('data-env'),
        stage:      currentScript.getAttribute('data-stage'),
        apiStage:   currentScript.getAttribute('data-api-stage'),
        paypalUrl:  currentScript.getAttribute('data-paypal-url'),
        state:      currentScript.getAttribute('data-state'),
        lightbox:   currentScript.hasAttribute('data-enable-lightbox'),
        logLevel:   currentScript.getAttribute('data-log-level'),
        ppobjects:  true
    });

    let scriptProtocol = currentScript.src.split(':')[0];

    $logger.debug(`current_script_protocol_${scriptProtocol}`);
    $logger.debug(`current_script_${ currentProtocol === scriptProtocol ? 'match' : 'mismatch' }_protocol`);

} else {
    $logger.debug(`no_current_script`);

    if (document.currentScript) {
        $logger.debug(`current_script_not_recognized`, { src: document.currentScript.src });
    }
}

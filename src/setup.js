
import $logger from 'beaver-logger/client';

import { config } from './config';
import { setupBridge } from './bridge';
import { initLogger } from './lib';


function domainToEnv(domain) {
    for (let env of Object.keys(config.paypalUrls)) {
        if (config.paypalUrls[env] === domain) {
            return env;
        }
    }
}

function setDomainEnv(domain) {
    let currentDomainEnv = domainToEnv(domain);

    if (currentDomainEnv) {
        config.env = currentDomainEnv;
    }
}

setDomainEnv(`${window.location.protocol}//${window.location.host}`);

export function setup(options = {}) {

    if (options.env) {
        if (!config.paypalUrls[options.env]) {
            throw new Error(`Invalid env: ${options.env}`);
        }

        delete config.env;
        config.env = options.env;
    }

    $logger.info(`ppxo_setup_${config.env}`);

    if (options.paypalUrl) {
        delete config.paypalUrl;
        config.paypalUrl = options.paypalUrl;
        setDomainEnv(config.paypalUrl);
    }

    if (options.state) {
        delete config.state;
        config.state = options.state;
    }

    if (options.noBridge) {
        delete config.enableBridge;
        config.enableBridge = false;
    }

    if (options.ppobjects) {
        config.ppobjects = true;
    }

    if (config.enableBridge) {
        setupBridge(config.env, config.bridgeUrl);
    }

    initLogger();
}

function getCurrentScript() {

    let scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (let script of scripts) {
        if (script.src && script.src.replace(/^https?:/, '') === config.scriptUrl || script.hasAttribute('data-ppxo') || script.hasAttribute('data-paypal-checkout')) {
            return script;
        }
    }
}

let currentScript = getCurrentScript();

if (currentScript) {

    setup({
        env:       currentScript.getAttribute('data-env'),
        paypalUrl: currentScript.getAttribute('data-paypal-url'),
        noBridge:  currentScript.hasAttribute('data-no-bridge'),
        state:     currentScript.getAttribute('data-state'),
        ppobjects: true
    });

} else {
    $logger.debug(`ppxo_no_current_script`);
}

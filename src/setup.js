
import $logger from 'beaver-logger/client';

import { config } from './config';
import { setupBridge } from './bridge';
import { initLogger } from './lib';

export function setup(options = {}) {

    $logger.info(`ppxo_setup_${options.env || config.env}`);

    if (options.env) {
        delete config.env;
        config.env = options.env;
    }

    if (options.paypalUrl) {
        delete config.paypalUrl;
        config.paypalUrl = options.paypalUrl;
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
        if (script.src && script.src.replace(/^https?:/, '') === config.scriptUrl || script.hasAttribute('data-ppxo')) {
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

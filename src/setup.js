
import { config } from './config';
import { setupBridge } from './bridge';

export function setup(options) {

    config.env = options.env || config.env;
    config.bridgeUrl = options.bridgeUrl;

    if (options.noBridge) {
        config.enableBridge = false;
    }

    if (config.enableBridge) {
        setupBridge(config.env, config.bridgeUrl);
    }
}


let currentScript;

if (!currentScript) {
    let scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (let script of scripts) {
        if (script.src === config.scriptUrl) {
            currentScript = script;
        }
    }

    if (!currentScript) {
        currentScript = scripts[scripts.length - 1];
    }
}



if (currentScript) {

    setup({
        env:       currentScript.getAttribute('data-env'),
        bridgeUrl: currentScript.getAttribute('data-bridge-url'),
        noBridge:  currentScript.hasAttribute('no-bridge')
    });
}

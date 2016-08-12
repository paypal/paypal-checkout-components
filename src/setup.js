
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

function getCurrentScript() {

    if (document.currentScript) {
        return document.currentScript;
    }

    let scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (let script of scripts) {
        if (script.src && script.src.replace(/^https?/, '') === config.scriptUrl) {
            return script;
        }
    }
}

let currentScript = getCurrentScript();

if (currentScript) {

    config.ppobjects = true;

    setup({
        env:       currentScript.getAttribute('data-env'),
        bridgeUrl: currentScript.getAttribute('data-bridge-url'),
        noBridge:  currentScript.hasAttribute('no-bridge')
    });
}

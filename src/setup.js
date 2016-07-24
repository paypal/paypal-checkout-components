
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


if (document.currentScript) {
    let script = document.currentScript;

    setup({
        env: script.getAttribute('data-env'),
        bridgeUrl: script.getAttribute('data-bridge-url'),
        noBridge: script.hasAttribute('no-bridge')
    });
}

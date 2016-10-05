
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';

import postRobot from 'post-robot/src';
import { Checkout } from './components';
import { config } from './config';

// This needs to die once we disable fallbacks

export let bridge = new Promise();

postRobot.on('meta', ({ source, data }) => {

    if (data.iframeEligible) {
        Checkout.contexts.lightbox = true;
    }

    $logger.info(data.iframeEligible ?
        `lightbox_eligible_${data.iframeEligibleReason}` :
        `lightbox_ineligible_${data.iframeEligibleReason}`);

    if (config.locales[data.locale.country] && !config.customCountry) {
        config.locale.country = data.locale.country;

        if (config.locales[data.locale.country].indexOf(data.locale.lang) !== -1) {
            config.locale.lang = data.locale.lang;
        } else {
            config.locale.lang = config.locales[data.locale.country][0];
        }
    }
});

export function setupBridge(env, bridgeUrl) {

    if (!postRobot.bridgeRequired(bridgeUrl)) {
        return $logger.debug(`bridge_not_required`, { env });
    }

    $logger.debug(`setup_bridge`, { env });

    let openBridge = postRobot.openBridge(bridgeUrl);

    openBridge.then(win => {
        bridge.resolve(win);
    }, err => {
        bridge.reject(err);
    });

    return openBridge;
}

export function messageBridge(name, data = {}) {
    return bridge.then(bridgeWindow => {
        return postRobot.send(bridgeWindow, name, data);
    });
}

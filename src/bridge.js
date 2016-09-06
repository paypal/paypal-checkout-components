
import $logger from 'beaver-logger/client';

import postRobot from 'post-robot/src';
import { Checkout } from './components';
import { config } from './config';

export let getMeta = postRobot.once('meta').then(data => {

    for (let component of [ Checkout ]) {
        component.contexts.lightbox = data.iframeEligible;
    }

    $logger.info(data.iframeEligible ?
        `ppxo_lightbox_eligible_${data.iframeEligibleReason}` :
        `ppxo_lightbox_ineligible_${data.iframeEligibleReason}`);

    if (config.locales[data.locale.country]) {
        config.locale.country = data.locale.country;

        if (config.locales[data.locale.country].indexOf(data.locale.lang) !== -1) {
            config.locale.lang = data.locale.lang;
        } else {
            config.locale.lang = config.locales[data.locale.country][0];
        }
    }
});

export let bridge;

export function setupBridge() {
    $logger.debug(`ppxo_setup_bridge`, { env: config.env });
    bridge = postRobot.openBridge(config.bridgeUrl);
    return bridge;
}

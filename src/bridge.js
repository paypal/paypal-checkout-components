
import $logger from 'beaver-logger/client';

import postRobot from 'post-robot/src';
import { PayPalCheckout } from './components';
import { config } from './config';

export let getMeta = postRobot.once('meta').then(data => {

    PayPalCheckout.contexts.lightbox = data.iframeEligible;

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

export function setupBridge(env, bridgeUrl) {
    $logger.debug(`ppxo_setup_bridge`, { env });

    if (!bridgeUrl) {
        $logger.error(`ppxo_setup_bridge_no_url`, { env });
        throw new Error(`Can not find bridge url for env: ${env}`);
    }

    let version = config.ppobjects ? __FILE_VERSION__ : __MINOR_VERSION__;

    postRobot.openBridge(`${bridgeUrl}?xcomponent=1&version=${version}&env=${config.env}`);
}


import postRobot from 'post-robot/src';
import { PayPalCheckout } from './components';
import { config } from './config';

postRobot.once('meta').then(data => {

    PayPalCheckout.contexts.lightbox = data.iframeEligible;

    config.locale.country = data.locale.country;
    config.locale.lang    = data.locale.lang;
});

export function setupBridge(env, bridgeUrl) {
    bridgeUrl = bridgeUrl || config.bridgeUrls[env];

    if (!bridgeUrl) {
        throw new Error(`Can not find bridge url for env: ${env}`);
    }

    postRobot.openBridge(bridgeUrl);
}

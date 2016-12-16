/* @flow weak */

import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import $logger from 'beaver-logger/client';
import postRobot from 'post-robot/src';

import { enableCheckoutIframe } from '../components';
import { config } from '../config';

postRobot.on('meta', ({ source, data }) => {

    if (data.iframeEligible) {
        enableCheckoutIframe();
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

export function setupBridge(env) {
    return Promise.try(() => {

        let bridgeUrl = config.bridgeUrls[env];
        let bridgeDomain = config.paypalDomains[env];

        if (!postRobot.needsBridgeForDomain(bridgeDomain)) {
            return $logger.debug(`bridge_not_required`, { env });
        }

        $logger.debug(`setup_bridge`, { env });
        
        return postRobot.openBridge(bridgeUrl, bridgeDomain).catch(err => {

            // Bridge is best-effort for everything but IE

            if (postRobot.needsBridge({ domain: bridgeDomain })) {
                throw err;
            } else {
                $logger.debug(`open_bridge_transient_failure`);
            }
        });
    });
}

/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import * as $logger from 'beaver-logger/client';
import * as postRobot from 'post-robot/src';

import { enableCheckoutIframe } from '../components';
import { config } from '../config';
import { isIEIntranet } from '../lib';

postRobot.on('meta', ({ source, data } : { source : any, data : Object }) => {

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

export function setupPostBridge(env : string) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        // No point even trying to set up bridge for intranet mode -- iframes don't work

        if (isIEIntranet()) {
            return;
        }

        let postBridgeUrl : string = config.postBridgeUrls[env];
        let postBridgeDomain : string = config.paypalDomains[env];

        if (!postRobot.bridge || !postRobot.bridge.needsBridgeForDomain(postBridgeDomain)) {
            return $logger.debug(`post_bridge_not_required`, { env });
        }

        $logger.debug(`setup_post_bridge`, { env });

        return postRobot.bridge.openBridge(postBridgeUrl, postBridgeDomain).catch(err => {

            // Post-Bridge is best-effort for everything but IE

            if (postRobot.bridge.needsBridge({ domain: postBridgeDomain })) {
                throw err;
            } else {
                $logger.debug(`open_post_bridge_transient_failure`);
            }
        });
    });
}

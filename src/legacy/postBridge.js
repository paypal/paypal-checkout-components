/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { info, debug } from 'beaver-logger/client';
import { on, bridge } from 'post-robot/src';

import { config } from '../config';
import { isIEIntranet } from '../lib';

on('meta', ({ data } : { source : CrossDomainWindowType, data : Object }) => {

    info(data.iframeEligible ?
        `lightbox_eligible_${ data.iframeEligibleReason }` :
        `lightbox_ineligible_${ data.iframeEligibleReason }`);

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

        if (!bridge || !bridge.needsBridgeForDomain(postBridgeDomain)) {
            return debug(`post_bridge_not_required`, { env });
        }

        debug(`setup_post_bridge`, { env });

        return bridge.openBridge(postBridgeUrl, postBridgeDomain).catch(err => {

            // Post-Bridge is best-effort for everything but IE

            if (bridge.needsBridge({ domain: postBridgeDomain })) {
                throw err;
            } else {
                debug(`open_post_bridge_transient_failure`);
            }
        });
    });
}

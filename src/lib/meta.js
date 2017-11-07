/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, bridge } from 'post-robot/src';

import { config } from '../config';

import { isIEIntranet  } from './device';
import { memoize, noop } from './util';

type FrameMetaData = {
    iframeEligible : boolean,
    iframeEligibleReason : string,
    rememberedFunding : Array<string>
};

export let openMetaFrame = memoize((env : string = config.env) : ZalgoPromise<FrameMetaData> => {
    return ZalgoPromise.try(() => {

        if (isIEIntranet()) {
            return {
                iframeEligible:       false,
                iframeEligibleReason: 'ie_intranet',
                rememberedFunding:    []
            };
        }

        let metaFrameUrl : string = config.metaFrameUrls[env];
        let metaFrameDomain : string = config.paypalDomains[env];

        return ZalgoPromise.try(() => {
            if (bridge) {
                return bridge.openBridge(metaFrameUrl, metaFrameDomain).then(noop);
            } else {
                throw new Error(`Opening meta window without bridge support is not currently supported`);
            }
        }).then(win => {
            return once('meta', { domain: metaFrameDomain, window: win });
        }).then(({ data }) => {
            return data;
        });
    });
});

try {
    if ((window.location.href.indexOf('/component-meta') !== -1) && window.ppxo) {
        let sendToParent = window.ppxo.postRobot.sendToParent;
        
        window.ppxo.postRobot.sendToParent = function sendToParentOverride(name : string, message : Object) : ZalgoPromise<void> {
            
            if (name !== 'meta') {
                return sendToParent.apply(this, arguments);
            }

            if (!message || message.rememberedFunding) {
                return sendToParent.apply(this, arguments);
            }

            return window.paypal.request.get('/webapps/hermes/api/button/funding')
                .then(res => {
                    message.rememberedFunding = res.data.remembered;
                    return sendToParent.apply(this, arguments);
                }).catch(() => {
                    return sendToParent.apply(this, arguments);
                });
        };
    }
} catch (err) {
    // pass
}

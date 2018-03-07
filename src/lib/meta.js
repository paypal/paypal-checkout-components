/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, bridge } from 'post-robot/src';

import { config } from '../config';

import { isIEIntranet  } from './device';
import { memoize } from './util';
import { getScriptVersion } from './script';
import { extendUrl } from './dom';

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
            if (!bridge) {
                throw new Error(`Opening meta window without bridge support is not currently supported`);
            }

            let metaListener = once('meta', { domain: metaFrameDomain });

            return bridge.openBridge(extendUrl(metaFrameUrl, { version: getScriptVersion() }), metaFrameDomain)
                .then(() => metaListener)
                .then(({ data }) => data);
        });
    });
});

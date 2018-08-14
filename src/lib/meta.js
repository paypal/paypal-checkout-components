/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { once, bridge } from 'post-robot/src';
import { isIEIntranet, memoize } from 'belter/src';

import { FUNDING } from '../constants';
import { URLS, DOMAINS } from '../config';

type FrameMetaData = {
    iframeEligible : boolean,
    iframeEligibleReason : string,
    rememberedFunding : Array<$Values<typeof FUNDING>>
};

export let openMetaFrame = memoize(() : ZalgoPromise<FrameMetaData> => {
    return ZalgoPromise.try(() => {

        if (isIEIntranet()) {
            return {
                iframeEligible:       false,
                iframeEligibleReason: 'ie_intranet',
                rememberedFunding:    []
            };
        }

        let metaFrameUrl : string = URLS.META;
        let metaFrameDomain : string = DOMAINS.META;

        return ZalgoPromise.try(() => {
            if (!bridge) {
                throw new Error(`Opening meta window without bridge support is not currently supported`);
            }

            let metaListener = once('meta', { domain: metaFrameDomain });

            return bridge.openBridge(metaFrameUrl, metaFrameDomain)
                .then(() => metaListener)
                .then(({ data }) => data);
        });
    });
});

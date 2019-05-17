/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { debug } from 'beaver-logger/client';
import { bridge } from 'post-robot/src';

import { config } from '../config';
import { openMetaFrame, noop } from '../lib';

export function setupPostBridge(env : string) : ZalgoPromise<void> {
    return ZalgoPromise.try(() => {

        const metaFrameDomain : string = config.paypalDomains[env];

        if (!bridge || !bridge.needsBridge({ domain: metaFrameDomain })) {
            return debug(`post_bridge_not_required`, { env });
        }

        debug(`setup_post_bridge`, { env });

        return openMetaFrame(env).then(noop);
    });
}

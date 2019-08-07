/* @flow */

import { unpackSDKMeta } from '@paypal/sdk-client';

import type { ExpressRequest } from '../types';

type SDKMeta = {|
    getSDKLoader : ({ nonce? : ?string }) => string
|};

export function getSDKMeta(req : ExpressRequest) : SDKMeta {
    const sdkMeta = req.query.sdkMeta || '';

    if (typeof sdkMeta !== 'string') {
        throw new TypeError(`Expected sdkMeta to be a string`);
    }

    return unpackSDKMeta(req.query.sdkMeta);
}

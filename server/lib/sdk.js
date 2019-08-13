/* @flow */

import { unpackSDKMeta } from '@paypal/sdk-client';
import { undotify } from 'belter';

import type { ExpressRequest, ExpressResponse, LoggerType } from '../types';
import { startWatchers } from '../watchers';
import { EVENT } from '../config';

import { clientErrorResponse, serverErrorResponse } from './util';

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

export type SDKMiddlewareOptions = {|
    logger : LoggerType
|};

export type SDKMiddleware = ({|
    req : ExpressRequest,
    res : ExpressResponse,
    params : Object,
    meta : SDKMeta
|}) => void | Promise<void>;

export type ExpressMiddleware = (
    req : ExpressRequest,
    res : ExpressResponse
) => void | Promise<void>;

export function sdkMiddleware({ logger } : SDKMiddlewareOptions, middleware : SDKMiddleware) : ExpressMiddleware {
    startWatchers();

    return async (req : ExpressRequest, res : ExpressResponse) : Promise<void> => {
        try {
            let params;

            try {
                params = undotify(req.query);
            } catch (err) {
                return clientErrorResponse(res, `Invalid params: ${ JSON.stringify(req.query) }`);
            }
            
            let meta;

            try {
                meta = getSDKMeta(req);
            } catch (err) {
                logger.warn(req, 'bad_sdk_meta', { sdkMeta: (req.query.sdkMeta || '').toString(), err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, `Invalid sdk meta: ${ (req.query.sdkMeta || '').toString() }`);
            }

            return await middleware({ req, res, params, meta });

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
        }
    };
}

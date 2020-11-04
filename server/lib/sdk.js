/* @flow */

import { unpackSDKMeta } from '@paypal/sdk-client';
import { undotify } from 'belter';

import type { ExpressRequest, ExpressResponse, LoggerType, CacheType } from '../types';
import { startWatchers } from '../watchers';
import { EVENT, ERROR_CODE, BROWSER_CACHE_TIME, HTTP_HEADER } from '../config';

import { clientErrorResponse, serverErrorResponse, defaultLogger, type LoggerBufferType,
    getLogBuffer, safeJSON, isError, emptyResponse } from './util';

function getSDKMetaString(req : ExpressRequest) : string {
    const sdkMeta = req.query.sdkMeta || '';

    if (typeof sdkMeta !== 'string') {
        throw new TypeError(`Expected sdkMeta to be a string`);
    }

    return sdkMeta;
}

type SDKMeta = {|
    getSDKLoader : ({| nonce? : ?string |}) => string
|};

export function getSDKMeta(req : ExpressRequest) : SDKMeta {
    return unpackSDKMeta(getSDKMetaString(req));
}

export type SDKMiddlewareOptions = {|
    logger : LoggerType | void,
    cache : ?CacheType
|};

export type SDKMiddleware = ({|
    req : ExpressRequest,
    res : ExpressResponse,
    params : Object,
    sdkMeta : string,
    meta : SDKMeta,
    logBuffer : LoggerBufferType
|}) => void | Promise<void>;

export type SDKScriptMiddleware = ({|
    req : ExpressRequest,
    res : ExpressResponse,
    logBuffer : LoggerBufferType,
    params : Object
|}) => void | Promise<void>;

export type SDKPreflightMiddleware = ({|
    req : ExpressRequest,
    res : ExpressResponse,
    logBuffer : LoggerBufferType,
    params : Object
|}) => void | Promise<void>;


export type ExpressMiddleware = (
    req : ExpressRequest,
    res : ExpressResponse
) => void | Promise<void>;

let logBuffer;

export function sdkMiddleware({ logger = defaultLogger, cache } : SDKMiddlewareOptions, { app, script, preflight } : {| app : SDKMiddleware, script? : SDKScriptMiddleware, preflight? : SDKPreflightMiddleware |}) : ExpressMiddleware {
    logBuffer = logBuffer || getLogBuffer(logger);
    startWatchers({ logBuffer, cache });

    const appMiddleware = async (req : ExpressRequest, res : ExpressResponse) : Promise<void> => {
        logBuffer.flush(req);

        try {
            let params;

            try {
                params = undotify(req.query);
            } catch (err) {
                return clientErrorResponse(res, `Invalid params: ${ safeJSON(req.query) }`);
            }

            const sdkMeta = getSDKMetaString(req);

            let meta;

            try {
                meta = getSDKMeta(req);
            } catch (err) {
                logger.warn(req, 'bad_sdk_meta', { sdkMeta: (req.query.sdkMeta || '').toString(), err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, `Invalid sdk meta: ${ (req.query.sdkMeta || '').toString() }`);
            }

            await app({ req, res, params, meta, logBuffer, sdkMeta });
            logBuffer.flush(req);

        } catch (err) {
            if (isError(err, ERROR_CODE.VALIDATION_ERROR)) {
                logger.warn(req, EVENT.VALIDATION, { err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, err.message);
            }

            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
        }
    };

    const scriptMiddleware = async (req : ExpressRequest, res : ExpressResponse) : Promise<void> => {
        logBuffer.flush(req);

        try {
            if (!script) {
                throw new Error(`No script available`);
            }

            let params;

            try {
                params = undotify(req.query);
            } catch (err) {
                return clientErrorResponse(res, `Invalid params: ${ safeJSON(req.query) }`);
            }

            await script({ req, res, params, logBuffer });
            logBuffer.flush(req);

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
        }
    };

    const preflightMiddleware = async (req : ExpressRequest, res : ExpressResponse) : Promise<void> => {
        logBuffer.flush(req);

        res.header('Access-Control-Allow-Origin', '*');

        let params;

        try {
            params = undotify(req.query);
        } catch (err) {
            return clientErrorResponse(res, `Invalid params: ${ safeJSON(req.query) }`);
        }

        if (!preflight) {
            return emptyResponse(res);
        }

        try {
            return await preflight({ req, res, params, logBuffer });

        } catch (err) {
            if (isError(err, ERROR_CODE.VALIDATION_ERROR)) {
                logger.warn(req, EVENT.VALIDATION, { err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, err.message);
            }

            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
            
        } finally {
            logBuffer.flush(req);
        }
    };

    const middleware = async (req : ExpressRequest, res : ExpressResponse) : Promise<void> => {
        const url = req.url.split('?')[0];

        if (url === '/') {
            return await appMiddleware(req, res);
        }

        if (url === '/script') {
            res.header(HTTP_HEADER.CACHE_CONTROL, `public, max-age=${ BROWSER_CACHE_TIME }`);
            res.header(HTTP_HEADER.EXPIRES, new Date(Date.now() + (BROWSER_CACHE_TIME * 1000)).toUTCString());
            return await scriptMiddleware(req, res);
        }

        if (url === '/preload') {
            return await preflightMiddleware(req, res);
        }

        res.status(404).send(`404 not found`);
    };

    return middleware;
}

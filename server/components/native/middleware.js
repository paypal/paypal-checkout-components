/* @flow */

import { FUNDING } from '@paypal/sdk-constants';
import { html } from 'jsx-pragmatic';

import { htmlResponse, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware,
    type GraphQL, isLocalOrTest } from '../../lib';
import type { LoggerType, CacheType, ExpressRequest } from '../../types';
import type { NativePopupOptions } from '../../../src/native/popup';

import { EVENT } from './constants';
import { getNativePopupParams, getNativeFallbackParams } from './params';
import { getNativePopupClientScript, getNativeFallbackClientScript, getNativePopupRenderScript, getNativeFallbackRenderScript } from './script';

type NativePopupMiddlewareOptions = {|
    logger : LoggerType,
    graphQL : GraphQL,
    cache : CacheType,
    tracking : (ExpressRequest) => void,
    fundingSource : $Values<typeof FUNDING>,
    cdn? : boolean
|};

export function getNativePopupMiddleware({
    logger = defaultLogger, cdn = !isLocalOrTest(),
    cache, tracking, fundingSource
} : NativePopupMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer }) => {
            logger.info(req, EVENT.RENDER);
            tracking(req);

            const { cspNonce, debug, parentDomain, env, sessionID, buttonSessionID,
                sdkCorrelationID, clientID, locale } = getNativePopupParams(params, req, res);

            const { NativePopup } = (await getNativePopupRenderScript({ logBuffer, cache, debug, useLocal })).popup;
            const client = await getNativePopupClientScript({ debug, logBuffer, cache, useLocal });

            const setupParams : NativePopupOptions = {
                parentDomain, env, sessionID, buttonSessionID, sdkCorrelationID,
                clientID, fundingSource, locale
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Native Popup</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ NativePopup({ fundingSource, cspNonce }).render(html()) }
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spbNativePopup.setupNativePopup(${ safeJSON(setupParams) })</script>
                </body>
            `;

            return htmlResponse(res, pageHTML);
        }
    });
}

type NativeFallbackMiddlewareOptions = {|
    logger : LoggerType,
    graphQL : GraphQL,
    cache : CacheType,
    tracking : (ExpressRequest) => void,
    fundingSource : $Values<typeof FUNDING>,
    cdn? : boolean
|};

export function getNativeFallbackMiddleware({
    logger = defaultLogger, cdn = !isLocalOrTest(),
    cache, tracking, fundingSource
} : NativeFallbackMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer }) => {
            logger.info(req, EVENT.RENDER);
            tracking(req);

            const { cspNonce, debug } = getNativeFallbackParams(params, req, res);

            const { NativeFallback } = (await getNativeFallbackRenderScript({ logBuffer, cache, debug, useLocal })).fallback;
            const client = await getNativeFallbackClientScript({ debug, logBuffer, cache, useLocal });

            const setupParams = {
                
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Native Fallback</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ NativeFallback({ fundingSource, cspNonce }).render(html()) }
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spbNativeFallback.setupNativeFallback(${ safeJSON(setupParams) })</script>
                </body>
            `;

            return htmlResponse(res, pageHTML);
        }
    });
}

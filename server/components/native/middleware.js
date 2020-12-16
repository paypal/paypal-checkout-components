/* @flow */

import { FUNDING } from '@paypal/sdk-constants';
import { Spinner, VenmoSpinner } from '@paypal/common-components';
import { html } from 'jsx-pragmatic';

import { htmlResponse, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware,
    type GraphQL, isLocalOrTest } from '../../lib';
import type { LoggerType, CacheType, ExpressRequest } from '../../types';

import { EVENT } from './constants';
import { getNativePopupParams, getNativeFallbackParams } from './params';
import { getNativePopupClientScript, getNativeFallbackClientScript } from './script';

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

            const { cspNonce, debug, parentDomain } = getNativePopupParams(params, req, res);

            const client = await getNativePopupClientScript({ debug, logBuffer, cache, useLocal });

            const setupParams = {
                parentDomain
            };

            const spinner = (fundingSource === FUNDING.VENMO)
                ? VenmoSpinner({ nonce: cspNonce })
                : Spinner({ nonce: cspNonce });
            
            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Native Popup</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ spinner.render(html()) }
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

            const client = await getNativeFallbackClientScript({ debug, logBuffer, cache, useLocal });

            const setupParams = {
                
            };

            const spinner = (fundingSource === FUNDING.VENMO)
                ? VenmoSpinner({ nonce: cspNonce })
                : Spinner({ nonce: cspNonce });

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Native Fallback</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ spinner.render(html()) }
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spbNativeFallback.setupNativeFallback(${ safeJSON(setupParams) })</script>
                </body>
            `;

            return htmlResponse(res, pageHTML);
        }
    });
}

/* @flow */

import { FUNDING } from '@paypal/sdk-constants';
import { html } from '@krakenjs/jsx-pragmatic';

import { htmlResponse, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware,
    type GraphQL, isLocalOrTest } from '../../lib';
import type { LoggerType, ExpressRequest, SDKVersionManager } from '../../types';
import type { NativePopupOptions } from '../../../src/native/popup';

import { getNativePopupParams, getNativeFallbackParams } from './params';
import { getNativePopupClientScript, getNativeFallbackClientScript, getNativePopupRenderScript, getNativeFallbackRenderScript } from './script';

type NativePopupMiddlewareOptions = {|
    logger : LoggerType,
    graphQL : GraphQL,
    tracking : (ExpressRequest) => void,
    fundingSource : $Values<typeof FUNDING>,
    cdn? : boolean,
    buttonsVersionManager: SDKVersionManager
|};

export function getNativePopupMiddleware({
    logger = defaultLogger,
    cdn = !isLocalOrTest(),
    tracking,
    fundingSource,
    buttonsVersionManager
} : NativePopupMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger }, {
        app: async ({ req, res, params, meta }) => {
            logger.info(req, 'smart_native_popup_render');
            tracking(req);

            for (const name of Object.keys(req.cookies || {})) {
                logger.info(req, `smart_native_popup_cookie_${ name || 'unknown' }`);
            }

            const { cspNonce, debug, parentDomain, env, sessionID, buttonSessionID,
                sdkCorrelationID, clientID, locale, buyerCountry } = getNativePopupParams(params, req, res);

            const { NativePopup } = (await getNativePopupRenderScript({ debug, useLocal, buttonsVersionManager }));
            const clientScript = await getNativePopupClientScript({ debug, useLocal, buttonsVersionManager });
            const buttonsVersion = buttonsVersionManager.getLiveVersion()

            const setupParams : NativePopupOptions = {
                parentDomain, env, sessionID, buttonSessionID, sdkCorrelationID,
                clientID, fundingSource, locale, buyerCountry
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="manifest" href="/.well-known/manifest.webmanifest">
                    <title>Native Popup</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ buttonsVersion }">
                    ${ NativePopup({ fundingSource, cspNonce }).render(html()) }
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ clientScript }</script>
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
    tracking : (ExpressRequest) => void,
    fundingSource : $Values<typeof FUNDING>,
    cdn? : boolean,
    buttonsVersionManager: SDKVersionManager
|};

export function getNativeFallbackMiddleware({
    logger = defaultLogger,
    cdn = !isLocalOrTest(),
    tracking,
    fundingSource,
    buttonsVersionManager
} : NativeFallbackMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger }, {
        app: async ({ req, res, params, meta }) => {
            logger.info(req, 'smart_native_fallback_render');
            tracking(req);

            for (const name of Object.keys(req.cookies || {})) {
                logger.info(req, `smart_native_fallback_cookie_${ name || 'unknown' }`);
            }

            const { cspNonce, debug } = getNativeFallbackParams(params, req, res);

            const { NativeFallback } = (await getNativeFallbackRenderScript({ debug, useLocal, buttonsVersionManager }));
            const clientScript = await getNativeFallbackClientScript({ debug, useLocal, buttonsVersionManager });
            const buttonsVersion = buttonsVersionManager.getLiveVersion()

            const setupParams = {

            };

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Native Fallback</title>
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ buttonsVersion }">
                    ${ NativeFallback({ fundingSource, cspNonce }).render(html()) }
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ clientScript }</script>
                    <script nonce="${ cspNonce }">spbNativeFallback.setupNativeFallback(${ safeJSON(setupParams) })</script>
                </body>
            `;

            return htmlResponse(res, pageHTML);
        }
    });
}

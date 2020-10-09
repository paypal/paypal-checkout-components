/* @flow */

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware,
    isLocal, type ExpressMiddleware } from '../../lib';
import type { LoggerType, CacheType } from '../../types';

import { EVENT } from './constants';
import { getParams } from './params';
import { getSmartMenuClientScript } from './script';

type MenuMiddlewareOptions = {|
    logger? : LoggerType,
    cache? : CacheType,
    cdn? : boolean
|};

export function getMenuMiddleware({ logger = defaultLogger, cache, cdn = !isLocal() } : MenuMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer }) => {
            logger.info(req, EVENT.RENDER);

            const { clientID, cspNonce, debug } = getParams(params, req, res);
            
            const client = await getSmartMenuClientScript({ debug, logBuffer, cache, useLocal });

            logger.info(req, `menu_client_version_${ client.version }`);
            logger.info(req, `menu_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupMenu(${ safeJSON({ cspNonce }) })</script>
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        }
    });
}

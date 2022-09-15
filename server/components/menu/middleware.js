/* @flow */

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware,
    isLocalOrTest, type ExpressMiddleware } from '../../lib';
import type { LoggerType, SDKVersionManager } from '../../types';

import { EVENT } from './constants';
import { getParams } from './params';
import { getSmartMenuClientScript } from './script';

type MenuMiddlewareOptions = {|
    logger? : LoggerType,
    cdn? : boolean,
    buttonsVersionManager : SDKVersionManager
|};

export function getMenuMiddleware({ logger = defaultLogger, cdn = !isLocalOrTest(), buttonsVersionManager } : MenuMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger }, {
        app: async ({ req, res, params, meta }) => {
            logger.info(req, EVENT.RENDER);

            const { clientID, cspNonce, debug } = getParams(params, req, res);
            
            const clientScript = await getSmartMenuClientScript({ debug, useLocal, buttonsVersionManager });
            const buttonsVersion = buttonsVersionManager.getLiveVersion()

            logger.info(req, `menu_client_version_${ buttonsVersion }`);
            logger.info(req, `menu_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${ cspNonce }" data-client-version="${ buttonsVersion }">
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ clientScript }</script>
                    <script nonce="${ cspNonce }">spb.setupMenu(${ safeJSON({ cspNonce }) })</script>
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        }
    });
}

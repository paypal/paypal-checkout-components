/* @flow */

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware } from '../../lib';
import type { LoggerType } from '../../types';

import { EVENT } from './constants';
import { getParams } from './params';
import { getSmartMenuClientScript } from './script';

type MenuMiddlewareOptions = {|
    logger? : LoggerType
|};

export function getMenuMiddleware({ logger = defaultLogger } : MenuMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger }, async ({ req, res, params, meta }) => {
        logger.info(EVENT.RENDER);

        const { clientID, cspNonce, debug } = getParams(params, req, res);
        
        const client = await getSmartMenuClientScript({ debug });

        logger.info(req, `menu_client_version_${ client.version }`);
        logger.info(req, `menu_params`, { params: JSON.stringify(params) });

        if (!clientID) {
            return clientErrorResponse(res, 'Please provide a clientID query parameter');
        }

        const pageHTML = `
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupMenu(${ safeJSON({ cspNonce }) })</script>
                </body>
            `;

        allowFrame(res);
        return htmlResponse(res, pageHTML);
    });
}

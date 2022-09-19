/* @flow */

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware,
    isLocalOrTest, type ExpressMiddleware } from '../../lib';
import type { LoggerType, ExpressRequest, SDKVersionManager } from '../../types';
import type { SetupCardOptions } from '../../../src/card/types';


import { EVENT } from './constants';
import { getParams } from './params';
import { getSmartCardClientScript } from './script';

type CardMiddlewareOptions = {|
    logger? : LoggerType,
    cdn? : boolean,
    getAccessToken : (ExpressRequest, string) => Promise<string>,
    buttonsVersionManager : SDKVersionManager
|};

export function getCardMiddleware({ logger = defaultLogger, cdn = !isLocalOrTest(), getAccessToken, buttonsVersionManager } : CardMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger }, {
        app: async ({ req, res, params, meta }) => {
            logger.info(req, EVENT.RENDER);

            const { clientID, cspNonce, debug } = getParams(params, req, res);
            
            const clientScript = await getSmartCardClientScript({ debug, useLocal, buttonsVersionManager });
            const buttonsVersion = buttonsVersionManager.getLiveVersion()

            logger.info(req, `card_client_version_${ buttonsVersion }`);
            logger.info(req, `card_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const facilitatorAccessTokenPromise = getAccessToken(req, clientID);


            const facilitatorAccessToken = await facilitatorAccessTokenPromise;

            const cardSetupOptions : SetupCardOptions = {
                cspNonce,
                facilitatorAccessToken
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${ cspNonce }" data-client-version="${ buttonsVersion }">
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ clientScript }</script>
                    <script nonce="${ cspNonce }">smartCard.setupCard(${ safeJSON(cardSetupOptions) })</script>
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        }
    });
}

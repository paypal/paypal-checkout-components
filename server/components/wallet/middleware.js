/* @flow */

import { ZalgoPromise } from 'zalgo-promise';

import type { ExpressRequest, LoggerType, CacheType, RiskData } from '../../types';
import { clientErrorResponse, htmlResponse, javascriptResponse, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL } from '../../lib';
import { resolveCheckoutSession } from '../../service';

import { getParams } from './params';
import { EVENT } from './constants';
import { getSmartWalletClientScript } from './script';

type WalletMiddlewareOptions = {|
    logger? : LoggerType,
    graphQL : GraphQL,
    cache? : CacheType,
    exchangeAuthCode : (ExpressRequest, string, string, RiskData) => ZalgoPromise<string>
|};

export function getWalletMiddleware({ logger = defaultLogger, graphQL, cache, exchangeAuthCode } : WalletMiddlewareOptions) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer }) => {
            logger.info(req, EVENT.RENDER);
        
            let { orderID, buyerAccessToken, buyerAuthCode, cspNonce, debug, sessionID, riskData } = getParams(params, req, res);
        
            if (!orderID) {
                return clientErrorResponse(res, 'Please provide an orderID query parameter');
            }

            let buyerAccessTokenPromise;
            if (buyerAccessToken) {
                buyerAccessTokenPromise = Promise.resolve(buyerAccessToken);
            } else if (buyerAuthCode) {
                buyerAccessTokenPromise = exchangeAuthCode(req, buyerAuthCode, sessionID, riskData);
            } else {
                return clientErrorResponse(res, 'Please provide an accessToken or authCode query parameter');
            }
            
            const { getVersion, importScript } = getSmartWalletClientScript({ res, debug, logBuffer, cache });
            
            const gqlBatch = graphQLBatch(req, graphQL);

            buyerAccessToken = await buyerAccessTokenPromise;
            const checkoutSessionPromise = resolveCheckoutSession(req, gqlBatch, { logger, accessToken: buyerAccessToken, orderID });
        
            gqlBatch.flush();

            const checkoutSession = await checkoutSessionPromise;
            
            const { renderWallet } = await importScript();
            const walletHTML = renderWallet({ cspNonce, checkoutSession });

            const pageHTML = `
                <!DOCTYPE html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body data-nonce="${ cspNonce }" data-client-version="${ await getVersion() }" data-render-version="${ await getVersion() }">
                    <div id="wallet-container" class="wallet-container">${ walletHTML }</div>
                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }" src="${ req.baseUrl }/script?debug=${ debug.toString() }"></script>
                    <script nonce="${ cspNonce }">spb.setupWallet(${ safeJSON({ cspNonce, checkoutSession, buyerAccessToken }) })</script>
                </body>
            `;
            return htmlResponse(res, pageHTML);
        },

        script: async ({ req, res, params, logBuffer }) => {
            logger.info(req, EVENT.RENDER);

            const { debug } = getParams(params, req, res);
            const { getScript } = getSmartWalletClientScript({ res, debug, logBuffer, cache });

            return javascriptResponse(res, await getScript());
        }
    });
}

/* @flow */

// eslint-disable-next-line import/no-named-as-default
import render from 'preact-render-to-string';
import { ZalgoPromise } from 'zalgo-promise';

import { clientErrorResponse, htmlResponse, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL } from '../../lib';
import { resolveCheckoutSession } from '../../service';
import type { ExpressRequest, LoggerType, CacheType } from '../../types';

import { getParams } from './params';
import { EVENT } from './constants';
import { getSmartWalletClientScript } from './script';

type WalletMiddlewareOptions = {|
    logger? : LoggerType,
    graphQL : GraphQL,
    cache? : CacheType,
    exchangeAuthCode : (ExpressRequest, string) => ZalgoPromise<string>
|};

export function getWalletMiddleware({ logger = defaultLogger, graphQL, cache, exchangeAuthCode } : WalletMiddlewareOptions) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, async ({ req, res, params, meta, logBuffer }) => {
        logger.info(req, EVENT.RENDER);
        if (logBuffer) {
            logBuffer.flush(req);
        }
    
        let { orderID, buyerAccessToken, buyerAuthCode, cspNonce, debug } = getParams(params, req, res);
    
        if (!orderID) {
            return clientErrorResponse(res, 'Please provide an orderID query parameter');
        }

        let buyerAccessTokenPromise;
        if (buyerAccessToken) {
            buyerAccessTokenPromise = Promise.resolve(buyerAccessToken);
        } else if (buyerAuthCode) {
            buyerAccessTokenPromise = exchangeAuthCode(req, buyerAuthCode);
        } else {
            return clientErrorResponse(res, 'Please provide an accessToken or authCode query parameter');
        }
        
        const clientPromise = getSmartWalletClientScript({ debug, logBuffer, cache });
        
        const gqlBatch = graphQLBatch(req, graphQL);

        buyerAccessToken = await buyerAccessTokenPromise;
        const checkoutSessionPromise = resolveCheckoutSession(req, gqlBatch, { logger, accessToken: buyerAccessToken, orderID });
    
        gqlBatch.flush();
        
        const client = await clientPromise;
        const checkoutSession = await checkoutSessionPromise;
        
        
        const walletStyle = '';
        
        // commenting it as SSR is broken at the moment
        // const spb = require('../../../dist/smart-wallet');
        // const Wallet = spb.Wallet({ cspNonce, fundingOptions, style });
        const walletHTML = '';// render(Wallet);
        
        const pageHTML = `
            <!DOCTYPE html>
            <head></head>
            <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                <style nonce="${ cspNonce }">${ walletStyle }</style>
                
                <div id="wallet-container" class="wallet-container">${ walletHTML }</div>
                ${ meta.getSDKLoader({ nonce: cspNonce }) }
                <script nonce="${ cspNonce }">${ client.script }</script>
                <script nonce="${ cspNonce }">spb.setupWallet(${ safeJSON({ cspNonce, checkoutSession, buyerAccessToken }) })</script>
            </body>
        `;
        return htmlResponse(res, pageHTML);
    });
}

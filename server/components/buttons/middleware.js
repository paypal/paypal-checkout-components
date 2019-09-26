/* @flow */

import { html } from 'jsx-pragmatic';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware } from '../../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolvePersonalization } from '../../service';
import type { LoggerType, CacheType, ClientIDToMerchantID, ExpressRequest, FirebaseConfig } from '../../types';

import { getSmartPaymentButtonsClientScript, getPayPalSmartPaymentButtonsRenderScript } from './script';
import { EVENT } from './constants';
import { getParams } from './params';
import { buttonStyle } from './style';

type ButtonMiddlewareOptions = {|
    logger? : LoggerType,
    getFundingEligibility : Function,
    getPersonalization : Function,
    clientIDToMerchantID : ClientIDToMerchantID,
    getInlineGuestExperiment? : (req : ExpressRequest, params : Object) => Promise<boolean>,
    cache? : CacheType,
    firebaseConfig? : FirebaseConfig
|};

export function getButtonMiddleware({ logger = defaultLogger, cache, getFundingEligibility, getPersonalization, clientIDToMerchantID, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig } : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, async ({ req, res, params, meta, logBuffer }) => {
        logger.info(req, EVENT.RENDER);
        if (logBuffer) {
            logBuffer.flush(req);
        }

        let { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard,
            merchantID, currency, intent, commit, vault, clientAccessToken, defaultFundingEligibility, locale } = getParams(params, req, res);

        const [ client, render, isCardFieldsExperimentEnabled ] = await Promise.all([
            getSmartPaymentButtonsClientScript({ debug, logBuffer, cache }),
            getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache }),
            getInlineGuestExperiment(
                req,
                getParams(params, req, res),
            )
        ]);

        logger.info(req, `button_client_version_${ client.version }`);
        logger.info(req, `button_render_version_${ render.version }`);
        logger.info(req, `button_params`, { params: JSON.stringify(params) });

        if (!clientID) {
            return clientErrorResponse(res, 'Please provide a clientID query parameter');
        }

        const [ fundingEligibility, personalization, clientMerchantID ] = await Promise.all([
            resolveFundingEligibility(req, {
                getFundingEligibility, logger, clientID, merchantID, buttonSessionID,
                currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility
            }),

            resolvePersonalization(req, {
                getPersonalization, logger, clientID, merchantID, buyerCountry, locale, buttonSessionID,
                currency, intent, commit, vault
            }),

            merchantID ? null : clientIDToMerchantID(req, clientID)
        ]);

        if (!merchantID && clientMerchantID) {
            merchantID = [ clientMerchantID ];
        }

        const buttonHTML = render.button.Buttons({
            ...params, nonce: cspNonce, csp:   { nonce: cspNonce }, fundingEligibility, personalization
        }).render(html());

        const pageHTML = `
            <!DOCTYPE html>
            <head></head>
            <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                <style nonce="${ cspNonce }">${ buttonStyle }</style>
                
                <div id="buttons-container" class="buttons-container">${ buttonHTML }</div>
                <div id="card-fields-container" class="card-fields-container"></div>

                ${ meta.getSDKLoader({ nonce: cspNonce }) }
                <script nonce="${ cspNonce }">${ client.script }</script>
                <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce, merchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig }) })</script>
                ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
            </body>
        `;

        allowFrame(res);
        return htmlResponse(res, pageHTML);
    });
}


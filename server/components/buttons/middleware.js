/* @flow */

import { html } from 'jsx-pragmatic';
import { COUNTRY, LANG } from '@paypal/sdk-constants';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL } from '../../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolvePersonalization, resolveNativeEligibility, resolveMerchantID } from '../../service';
import type { LoggerType, CacheType, ExpressRequest, FirebaseConfig } from '../../types';

import { getSmartPaymentButtonsClientScript, getPayPalSmartPaymentButtonsRenderScript } from './script';
import { EVENT } from './constants';
import { getParams } from './params';
import { buttonStyle } from './style';

type InlineGuestElmoParams = {|
    merchantID : string,
    buttonSessionID : string,
    locale : {|
        lang : $Values<typeof COUNTRY>,
        country : $Values<typeof LANG>
    |},
    buyerCountry : $Values<typeof COUNTRY>
|};

type ButtonMiddlewareOptions = {|
    logger? : LoggerType,
    graphQL : GraphQL,
    getAccessToken : (ExpressRequest, string) => Promise<string>,
    getMerchantID : (ExpressRequest, string) => Promise<string>,
    getInlineGuestExperiment ? : (req : ExpressRequest, params : InlineGuestElmoParams) => Promise<boolean>,
    cache? : CacheType,
    firebaseConfig? : FirebaseConfig
|};

export function getButtonMiddleware({ logger = defaultLogger, graphQL, getAccessToken, getMerchantID, cache, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig } : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, async ({ req, res, params, meta, logBuffer }) => {
        logger.info(req, EVENT.RENDER);
        if (logBuffer) {
            logBuffer.flush(req);
        }

        const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard, style,
            merchantID: sdkMerchantID, currency, intent, commit, vault, clientAccessToken, defaultFundingEligibility, locale, onShippingChange } = getParams(params, req, res);
        const { label, period } = style;
        
        logger.info(req, `button_params`, { params: JSON.stringify(params) });

        if (!clientID) {
            return clientErrorResponse(res, 'Please provide a clientID query parameter');
        }

        const facilitatorAccessTokenPromise = getAccessToken(req, clientID);
        const merchantIDPromise = facilitatorAccessTokenPromise.then(facilitatorAccessToken => resolveMerchantID(req, { merchantID: sdkMerchantID, getMerchantID, facilitatorAccessToken }));
        const clientPromise = getSmartPaymentButtonsClientScript({ debug, logBuffer, cache });
        const renderPromise = getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache });

        const isCardFieldsExperimentEnabledPromise = merchantIDPromise.then(merchantID => getInlineGuestExperiment(req, { merchantID: merchantID[0], locale, buttonSessionID, buyerCountry }));

        const gqlBatch = graphQLBatch(req, graphQL);

        const nativeEligibilityPromise = resolveNativeEligibility(req, gqlBatch, {
            logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, vault,
            buyerCountry, onShippingChange
        });

        const fundingEligibilityPromise = resolveFundingEligibility(req, gqlBatch, {
            logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault,
            disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility
        });

        const personalizationPromise = resolvePersonalization(req, gqlBatch, {
            logger, clientID, merchantID: sdkMerchantID, buyerCountry, locale, buttonSessionID,
            currency, intent, commit, vault, label, period
        });

        gqlBatch.flush();

        const render = await renderPromise;
        const client = await clientPromise;
        const fundingEligibility = await fundingEligibilityPromise;
        const personalization = await personalizationPromise;
        const isCardFieldsExperimentEnabled = await isCardFieldsExperimentEnabledPromise;
        const facilitatorAccessToken = await facilitatorAccessTokenPromise;
        const merchantID = await merchantIDPromise;

        const eligibility = {
            native:     await nativeEligibilityPromise,
            cardFields: await isCardFieldsExperimentEnabledPromise
        };

        logger.info(req, `button_render_version_${ render.version }`);
        logger.info(req, `button_client_version_${ client.version }`);

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
                <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce, merchantID, personalization, isCardFieldsExperimentEnabled, firebaseConfig, facilitatorAccessToken, eligibility }) })</script>
                ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
            </body>
        `;

        allowFrame(res);
        return htmlResponse(res, pageHTML);
    });
}


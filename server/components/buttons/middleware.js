/* @flow */

import { html } from 'jsx-pragmatic';
import { COUNTRY, LANG } from '@paypal/sdk-constants';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware, graphQLBatch, type GraphQL } from '../../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolvePersonalization, resolveNativeEligibility, resolveMerchantID, type GetWallet } from '../../service';
import type { LoggerType, CacheType, ExpressRequest, FirebaseConfig } from '../../types';
import { AUTH_ERROR_CODE } from '../../config';
import { resolveWallet } from '../../service/wallet';

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

type RiskData = {||};

type ButtonMiddlewareOptions = {|
    logger : LoggerType,
    graphQL : GraphQL,
    getAccessToken : (ExpressRequest, string) => Promise<string>,
    getMerchantID : (ExpressRequest, string) => Promise<string>,
    getInlineGuestExperiment? : (req : ExpressRequest, params : InlineGuestElmoParams) => Promise<boolean>,
    cache : CacheType,
    firebaseConfig? : FirebaseConfig,
    exchangeIDToken : (ExpressRequest, string, ?string, ?RiskData) => Promise<string>,
    getWallet : GetWallet,
    content : {
        [$Values<typeof COUNTRY>] : {
            [$Values<typeof LANG>] : {
                [string] : string
            }
        }
    }
|};

export function getButtonMiddleware({ logger = defaultLogger, content: smartContent, graphQL, getAccessToken, getMerchantID, cache, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig, getWallet, exchangeIDToken } : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer, sdkMeta }) => {
            logger.info(req, EVENT.RENDER);

            const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard, style, userIDToken, amount,
                merchantID: sdkMerchantID, currency, intent, commit, vault, clientAccessToken, basicFundingEligibility, locale, onShippingChange,
                clientMetadataID, riskData } = getParams(params, req, res);
            const { label, period } = style;
            
            logger.info(req, `button_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const facilitatorAccessTokenPromise = getAccessToken(req, clientID);
            const merchantIDPromise = facilitatorAccessTokenPromise.then(facilitatorAccessToken => resolveMerchantID(req, { merchantID: sdkMerchantID, getMerchantID, facilitatorAccessToken }));
            const clientPromise = getSmartPaymentButtonsClientScript({ debug, logBuffer, cache });
            const renderPromise = getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache });
            const buyerAccessTokenPromise = userIDToken ? exchangeIDToken(req, userIDToken, clientMetadataID, riskData) : null;

            const isCardFieldsExperimentEnabledPromise = merchantIDPromise.then(merchantID => getInlineGuestExperiment(req, { merchantID: merchantID[0], locale, buttonSessionID, buyerCountry }));

            const gqlBatch = graphQLBatch(req, graphQL);

            const nativeEligibilityPromise = resolveNativeEligibility(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, vault,
                buyerCountry, onShippingChange
            });

            const fundingEligibilityPromise = resolveFundingEligibility(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault,
                disableFunding, disableCard, clientAccessToken, buyerCountry, basicFundingEligibility
            });

            const buyerAccessToken = await buyerAccessTokenPromise;
            const walletPromise = resolveWallet(req, gqlBatch, getWallet, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault, amount,
                disableFunding, disableCard, clientAccessToken, buyerCountry, buyerAccessToken
            });

            const personalizationPromise = resolvePersonalization(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buyerCountry, locale, buttonSessionID,
                currency, intent, commit, vault, label, period
            });

            gqlBatch.flush();

            let facilitatorAccessToken;

            try {
                facilitatorAccessToken = await facilitatorAccessTokenPromise;
            } catch (err) {
                if (err && err.code === AUTH_ERROR_CODE.INVALID_CLIENT) {
                    return clientErrorResponse(res, 'Invalid clientID');
                }

                throw err;
            }

            const render = await renderPromise;
            const client = await clientPromise;
            const fundingEligibility = await fundingEligibilityPromise;
            const personalization = await personalizationPromise;
            const isCardFieldsExperimentEnabled = await isCardFieldsExperimentEnabledPromise;
            const merchantID = await merchantIDPromise;
            const nativeEligibility = await nativeEligibilityPromise;
            const cardFieldsEligibility = await isCardFieldsExperimentEnabledPromise;
            const wallet = await walletPromise;

            const eligibility = {
                nativeCheckout: nativeEligibility,
                cardFields:     cardFieldsEligibility
            };

            logger.info(req, `button_render_version_${ render.version }`);
            logger.info(req, `button_client_version_${ client.version }`);

            const content = smartContent[locale.country][locale.lang] || {};

            const buttonProps = {
                ...params, nonce: cspNonce, csp: { nonce: cspNonce },
                fundingEligibility, personalization, content, wallet
            };

            try {
                if (render.button.validateButtonProps) {
                    render.button.validateButtonProps(buttonProps);
                }
            } catch (err) {
                return clientErrorResponse(res, err.stack || err.message);
            }
            
            const buttonHTML = render.button.Buttons(buttonProps).render(html());

            const setupParams = {
                fundingEligibility, buyerCountry, cspNonce, merchantID, personalization, sdkMeta, wallet, buyerAccessToken,
                isCardFieldsExperimentEnabled, firebaseConfig, facilitatorAccessToken, eligibility, content
            };

            const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                    <style nonce="${ cspNonce }">${ buttonStyle }</style>
                    
                    <div id="buttons-container" class="buttons-container">${ buttonHTML }</div>
                    <div id="card-fields-container" class="card-fields-container"></div>

                    ${ meta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON(setupParams) })</script>
                    ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        }
    });
}


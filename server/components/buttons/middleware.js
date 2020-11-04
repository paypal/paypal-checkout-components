/* @flow */

import { html } from 'jsx-pragmatic';
import { COUNTRY, LANG, SDK_QUERY_KEYS, CURRENCY } from '@paypal/sdk-constants';
import { constHas, stringifyError, noop } from 'belter';

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware, type ExpressMiddleware,
    graphQLBatch, type GraphQL, javascriptResponse, emptyResponse, promiseTimeout, isLocal } from '../../lib';
import { renderFraudnetScript, shouldRenderFraudnet, resolveFundingEligibility, resolveMerchantID, resolveWallet } from '../../service';
import { EXPERIMENT_TIMEOUT } from '../../config';
import type { LoggerType, CacheType, ExpressRequest, FirebaseConfig } from '../../types';
import type { ContentType } from '../../../src/types';

import { getSmartPaymentButtonsClientScript, getPayPalSmartPaymentButtonsRenderScript } from './script';
import { EVENT, SPB_QUERY_KEYS } from './constants';
import { getParams } from './params';
import { buttonStyle } from './style';
import { setRootTransaction } from './instrumentation';

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
    logger : LoggerType,
    graphQL : GraphQL,
    getAccessToken : (ExpressRequest, string) => Promise<string>,
    getMerchantID : (ExpressRequest, string) => Promise<string>,
    getInlineGuestExperiment? : (req : ExpressRequest, params : InlineGuestElmoParams) => Promise<boolean>,
    cache : CacheType,
    firebaseConfig? : FirebaseConfig,
    content : {
        [$Values<typeof COUNTRY>] : {
            [$Values<typeof LANG>] : ContentType
        }
    },
    tracking : (ExpressRequest) => void,
    cdn? : boolean
|};

export function getButtonMiddleware({
    logger = defaultLogger, content: smartContent, graphQL, getAccessToken, cdn = !isLocal(),
    getMerchantID, cache, getInlineGuestExperiment = () => Promise.resolve(false), firebaseConfig, tracking
} : ButtonMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;

    return sdkMiddleware({ logger, cache }, {
        app: async ({ req, res, params, meta, logBuffer, sdkMeta }) => {
            logger.info(req, EVENT.RENDER);
            
            tracking(req);

            const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard, userIDToken, amount,
                merchantID: sdkMerchantID, currency, intent, commit, vault, clientAccessToken, basicFundingEligibility, locale,
                clientMetadataID, pageSessionID, correlationID, cookies, enableFunding } = getParams(params, req, res);
            
            logger.info(req, `button_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const gqlBatch = graphQLBatch(req, graphQL, { env });

            const content = smartContent[locale.country][locale.lang] || {};

            const facilitatorAccessTokenPromise = getAccessToken(req, clientID);
            const merchantIDPromise = facilitatorAccessTokenPromise.then(facilitatorAccessToken => resolveMerchantID(req, { merchantID: sdkMerchantID, getMerchantID, facilitatorAccessToken }));
            const clientPromise = getSmartPaymentButtonsClientScript({ debug, logBuffer, cache, useLocal });
            const renderPromise = getPayPalSmartPaymentButtonsRenderScript({ logBuffer, cache, useLocal });

            const isCardFieldsExperimentEnabledPromise = promiseTimeout(
                merchantIDPromise.then(merchantID =>
                    getInlineGuestExperiment(req, { merchantID: merchantID[0], locale, buttonSessionID, buyerCountry })),
                EXPERIMENT_TIMEOUT
            ).catch(() => false);

            const fundingEligibilityPromise = resolveFundingEligibility(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault,
                disableFunding, disableCard, clientAccessToken, buyerCountry, basicFundingEligibility, enableFunding
            });

            const walletPromise = resolveWallet(req, gqlBatch, {
                logger, clientID, merchantID: sdkMerchantID, buttonSessionID, currency, intent, commit, vault, amount,
                disableFunding, disableCard, clientAccessToken, buyerCountry, userIDToken
            }).catch(noop);

            gqlBatch.flush();

            let facilitatorAccessToken;

            try {
                facilitatorAccessToken = await facilitatorAccessTokenPromise;
            } catch (err) {
                if (err && err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
                    return clientErrorResponse(res, 'Invalid clientID');
                }

                throw err;
            }

            const render = await renderPromise;
            const client = await clientPromise;
            const fundingEligibility = await fundingEligibilityPromise;
            const merchantID = await merchantIDPromise;
            const isCardFieldsExperimentEnabled = await isCardFieldsExperimentEnabledPromise;
            const wallet = await walletPromise;

            const eligibility = {
                cardFields: isCardFieldsExperimentEnabled
            };

            logger.info(req, `button_render_version_${ render.version }`);
            logger.info(req, `button_client_version_${ client.version }`);

            const buttonProps = {
                ...params, nonce: cspNonce, csp: { nonce: cspNonce },
                fundingEligibility, content, wallet
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
                fundingEligibility, buyerCountry, cspNonce, merchantID, sdkMeta, wallet, correlationID,
                firebaseConfig, facilitatorAccessToken, eligibility, content, cookies
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
                    ${ shouldRenderFraudnet({ wallet }) ? renderFraudnetScript({ id: clientMetadataID || pageSessionID, cspNonce, env }) : '' }
                </body>
            `;

            setRootTransaction(req, { userIDToken, clientAccessToken });
            allowFrame(res);
            return htmlResponse(res, pageHTML);
        },

        script: async ({ req, res, params, logBuffer }) => {
            logger.info(req, EVENT.RENDER);

            const { debug } = getParams(params, req, res);
            const { script } = await getSmartPaymentButtonsClientScript({ debug, logBuffer, cache, useLocal });

            return javascriptResponse(res, script);
        },

        preflight: ({ req, res, params, logBuffer }) => {
            const {
                [ SDK_QUERY_KEYS.CLIENT_ID ]: clientID,
                [ SDK_QUERY_KEYS.MERCHANT_ID ]: merchantIDParam,
                [ SDK_QUERY_KEYS.CURRENCY ]: currency = CURRENCY.USD,
                [ SPB_QUERY_KEYS.USER_ID_TOKEN ]: userIDToken,
                [ SPB_QUERY_KEYS.AMOUNT ]: amount = '0.00'
            } = params;

            const merchantID = merchantIDParam
                ? merchantIDParam.split(',')
                : [];

            if (!clientID) {
                return clientErrorResponse(res, `Please provide a ${ SDK_QUERY_KEYS.CLIENT_ID } query parameter`);
            }

            if (!userIDToken) {
                return clientErrorResponse(res, `Please provide a ${ SPB_QUERY_KEYS.USER_ID_TOKEN } query parameter`);
            }

            for (const merchant of merchantID) {
                if (!merchant.match(/^[A-Z0-9]+$/)) {
                    return clientErrorResponse(res, `Invalid ${ SDK_QUERY_KEYS.MERCHANT_ID } query parameter`);
                }
            }

            if (currency && !constHas(CURRENCY, currency)) {
                return clientErrorResponse(res, `Invalid ${ SDK_QUERY_KEYS.CURRENCY } query parameter`);
            }

            if (amount && !amount.toString().match(/^\d+\.\d{2}$/)) {
                return clientErrorResponse(res, `Invalid ${ SPB_QUERY_KEYS.AMOUNT } query parameter`);
            }

            const gqlBatch = graphQLBatch(req, graphQL);

            resolveWallet(req, gqlBatch, {
                logger, clientID, merchantID, currency, amount, userIDToken
            }).catch(err => {
                logBuffer.warn('preflight_error', { err: stringifyError(err) });
            });

            gqlBatch.flush();

            return emptyResponse(res);
        }
    });
}

/* @flow */

import { undotify } from 'belter';
import { unpackSDKMeta } from '@paypal/sdk-client';
import { FUNDING, CARD, COUNTRY } from '@paypal/sdk-constants';
import { html } from 'jsx-pragmatic';

import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';
import { getParams } from './params';
import { EVENT, HTTP_HEADER } from './constants';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from './util';
import type { ExpressRequest, ExpressResponse, LoggerType } from './types';
import { buttonStyle } from './style';
import { renderFraudnetScript, shouldRenderFraudnet } from './fraudnet';

export function getButtonMiddleware({ logger = defaultLogger, getFundingEligibility } : { logger? : LoggerType, getFundingEligibility : Function } = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            logger.info(EVENT.RENDER);

            const params = undotify(req.query);
            const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry = (req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US),
                disableFunding, disableCard, merchantID, currency, intent, commit, vault, clientAccessToken } = getParams(params, req, res);

            const sdkMeta = req.query.sdkMeta || '';
            let meta;

            try {
                if (typeof sdkMeta !== 'string') {
                    throw new TypeError(`Expected sdkMeta to be a string`);
                }

                meta = unpackSDKMeta(req.query.sdkMeta);
            } catch (err) {
                logger.warn(req, 'bad_sdk_meta', { sdkMeta, err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, `Invalid sdk meta: ${ sdkMeta.toString() }`);
            }

            const { getSDKLoader } = meta;

            const [ client, render ] = await Promise.all([
                getSmartButtonClientScript({ debug }),
                getSmartButtonRenderScript()
            ]);

            logger.info(req, `button_client_version_${ client.version }`);
            logger.info(req, `button_render_version_${ render.version }`);
            logger.info(req, `button_params`, { params: JSON.stringify(params) });
            
            let fundingEligibility;
            
            try {
                const ip = req.ip;
                const cookies = req.get('cookie');
                const userAgent = req.get('user-agent');
                const clientId = clientID;
                const merchantId = merchantID;
                const buttonSessionId = buttonSessionID;

                fundingEligibility = await getFundingEligibility(req, {
                    clientId, merchantId, buyerCountry, cookies, ip, currency, intent, commit,
                    vault, disableFunding, disableCard, userAgent, buttonSessionId, clientAccessToken });

            } catch (err) {
                logger.error(req, 'gql_errored_for_fundingEligibility_fallingback_to_default', { err: err.stack ? err.stack : err.toString() });
                // we still need to check if the following were requested to be disabled
                const isCardDisabled = disableFunding ? disableFunding.includes(FUNDING.CARD) : false;
                const isVisaDisabled = disableCard ? disableCard.includes(CARD.VISA) : false;
                const isMastercardDisabled = disableCard ? disableCard.includes(CARD.MASTERCARD) : false;
                const isAmexDisabled = disableCard ? disableCard.includes(CARD.AMEX) : false;
                
                fundingEligibility = {
                    paypal: {
                        eligible: true
                    },
                    card: {
                        eligible: !isCardDisabled,
                        branded:  true,
                        vendors:  {
                            visa: {
                                eligible: !isVisaDisabled
                            },
                            mastercard: {
                                eligible: !isMastercardDisabled
                            },
                            amex: {
                                eligible: !isAmexDisabled
                            }
                        }
                    }
                };
            }

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            if (!fundingEligibility) {
                return clientErrorResponse(res, 'fundingEligibility does not exist');
            }

            const buttonHTML = render.button.Buttons({ ...params, nonce: cspNonce, csp: { nonce: cspNonce }, fundingEligibility }).render(html());

            const pageHTML = `
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                    <style nonce="${ cspNonce }">
                        ${ buttonStyle }
                    </style>
                    <div id="buttons-container" class="buttons-container">
                        ${ buttonHTML }
                    </div>
                    <div id="card-fields-container" class="card-fields-container"></div>
                    ${ getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce }) })</script>
                    ${ shouldRenderFraudnet({ fundingEligibility }) ? renderFraudnetScript({ id: buttonSessionID, cspNonce, env }) : '' }
                </body>
            `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, EVENT.ERROR, { err: err.stack ? err.stack : err.toString() });
            return serverErrorResponse(res, err.stack ? err.stack : err.toString());
        }
    };
}


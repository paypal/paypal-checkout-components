/* @flow */

import { undotify } from 'belter';
import { unpackSDKMeta } from '@paypal/sdk-client';
import { html } from 'jsx-pragmatic';

import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';
import { getParams } from './params';
import { EVENT, HTTP_HEADER } from './constants';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from './util';
import type { ExpressRequest, ExpressResponse, LoggerType } from './types';
import { buttonStyle } from './style';
import { renderFraudnetScript } from './fraudnet';
import { FRAUDNET_ENABLED } from './config';

export function getButtonMiddleware({ logger = defaultLogger, getFundingEligibility } : { logger? : LoggerType, getFundingEligibility : Function } = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            logger.info(EVENT.RENDER);

            const { getSDKLoader } = unpackSDKMeta(req.query.sdkMeta);

            const [ client, render ] = await Promise.all([
                getSmartButtonClientScript({ debug: Boolean(req.query.debug) }),
                getSmartButtonRenderScript()
            ]);

            logger.info(req, `button_client_version_${ client.version }`);
            logger.info(req, `button_render_version_${ render.version }`);

            const params = undotify(req.query);

            const { clientID, currency, intent, commit, vault, buyerCountry = req.get(HTTP_HEADER.PP_GEO_LOC),
                disableFunding, disableCard, merchantID, buttonSessionID, clientAccessToken, cspNonce } = getParams(params, req, res);

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
                logger.error(req, 'gql_errored_for_fundingEligibility', { err: err.stack ? err.stack : err.toString() });
                fundingEligibility = {
                    paypal: {
                        eligible: true
                    },
                    card: {
                        eligible: true,
                        branded:  true,
                        vendors:  {
                            visa: {
                                eligible: true
                            },
                            mastercard: {
                                eligible: true
                            },
                            amex: {
                                eligible: true
                            }
                        }
                    }
                };
            }

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            if (!fundingEligibility) {
                return clientErrorResponse(res, 'Please provide a fundingEligibility query parameter');
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
                    ${ getSDKLoader({ cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry, cspNonce }) })</script>
                    ${ FRAUDNET_ENABLED ? renderFraudnetScript({ id: buttonSessionID, cspNonce }) : '' }
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


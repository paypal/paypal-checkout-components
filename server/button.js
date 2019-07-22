/* @flow */

import { undotify } from 'belter';
import { unpackSDKMeta } from '@paypal/sdk-client';
import { html } from 'jsx-pragmatic';

import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';
import { getParams } from './params';
import { EVENT } from './constants';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from './util';
import type { ExpressRequest, ExpressResponse, LoggerType } from './types';
import { buttonStyle } from './style';
import { renderFraudnetScript, shouldRenderFraudnet } from './fraudnet';
import { resolveFundingEligibility } from './fundingEligibility';
import { resolvePersonalization } from './personalization';

export function getButtonMiddleware({ logger = defaultLogger, getFundingEligibility, getPersonalization } :
    { logger? : LoggerType, getFundingEligibility : Function, getPersonalization : Function } = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            logger.info(EVENT.RENDER);

            const params = undotify(req.query);
            const { env, clientID, buttonSessionID, cspNonce, debug, buyerCountry, disableFunding, disableCard,
                merchantID, currency, intent, commit, vault, clientAccessToken, defaultFundingEligibility, locale } = getParams(params, req, res);

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

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const [ fundingEligibility, personalization ] = await Promise.all([
                resolveFundingEligibility(req, { getFundingEligibility, logger, clientID, merchantID, buttonSessionID,
                    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility }),

                resolvePersonalization(req, { getPersonalization, logger, buyerCountry, locale, buttonSessionID })
            ]);

            const buttonHTML = render.button.Buttons({
                ...params, nonce: cspNonce, csp:   { nonce: cspNonce }, fundingEligibility, personalization
            }).render(html());

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


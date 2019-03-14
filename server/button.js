/* @flow */

import { undotify } from 'belter';
import { unpackSDKMeta } from '@paypal/sdk-client';
import { html } from 'jsx-pragmatic';

import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';
import { getParams } from './params';
<<<<<<< HEAD
import { EVENT } from './constants';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from './util';
=======
import { EVENT, HTTP_HEADER } from './constants';
import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger } from './util';
>>>>>>> f4fd5e8... Pass buyerCountry into checkout and card components
import type { ExpressRequest, ExpressResponse, LoggerType } from './types';
import { buttonStyle } from './style';

export function getButtonMiddleware({ logger = defaultLogger } : { logger? : LoggerType } = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
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
            const { clientID, fundingEligibility, nonce } = getParams(params, req, res);

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            if (!fundingEligibility) {
                return clientErrorResponse(res, 'Please provide a fundingEligibility query parameter');
            }

            const buyerCountry = req.get(HTTP_HEADER.PP_GEO_LOC);

            const buttonHTML = render.button.Buttons({ ...params, nonce, csp: { nonce }, fundingEligibility }).render(html());

            const pageHTML = `
                <body data-nonce="${ nonce }" data-client-version="${ client.version }" data-render-version="${ render.version }">
                    <style nonce="${ nonce }">
                        ${ buttonStyle }
                    </style>
                    <div id="buttons-container" class="buttons-container">
                        ${ buttonHTML }
                    </div>
                    <div id="card-fields-container" class="card-fields-container"></div>
                    ${ getSDKLoader({ nonce }) }
                    <script nonce="${ nonce }">${ client.script }</script>
                    <script nonce="${ nonce }">spb.setupButton(${ safeJSON({ fundingEligibility, buyerCountry }) })</script>
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


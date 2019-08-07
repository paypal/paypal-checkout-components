/* @flow */

import { undotify } from 'belter';

import { serverErrorResponse, clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON } from '../lib';
import type { ExpressRequest, ExpressResponse, LoggerType } from '../types';
import { startWatchers } from '../watchers';
import { getSDKMeta } from '../lib/sdk';

import { EVENT } from './constants';
import { getParams } from './params';
import { getSmartMenuClientScript } from './script';

type MenuMiddlewareOptions = {|
    logger? : LoggerType
|};

export function getMenuMiddleware({ logger = defaultLogger } : MenuMiddlewareOptions = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            logger.info(EVENT.RENDER);

            const params = undotify(req.query);
            const { clientID, cspNonce, debug } = getParams(params, req, res);

            let sdkMeta;

            try {
                sdkMeta = getSDKMeta(req);
            } catch (err) {
                logger.warn(req, 'bad_sdk_meta', { sdkMeta: (req.query.sdkMeta || '').toString(), err: err.stack ? err.stack : err.toString() });
                return clientErrorResponse(res, `Invalid sdk meta: ${ (req.query.sdkMeta || '').toString() }`);
            }

            const client = await getSmartMenuClientScript({ debug });

            logger.info(req, `menu_client_version_${ client.version }`);
            logger.info(req, `menu_params`, { params: JSON.stringify(params) });

            if (!clientID) {
                return clientErrorResponse(res, 'Please provide a clientID query parameter');
            }

            const pageHTML = `
                <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                    ${ sdkMeta.getSDKLoader({ nonce: cspNonce }) }
                    <script nonce="${ cspNonce }">${ client.script }</script>
                    <script nonce="${ cspNonce }">spb.setupMenu(${ safeJSON({ cspNonce }) })</script>
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


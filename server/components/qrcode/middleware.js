/* @flow */

import { clientErrorResponse, htmlResponse, allowFrame, defaultLogger, safeJSON, sdkMiddleware,
    isLocalOrTest, type ExpressMiddleware } from '../../lib';
import type { LoggerType, CacheType, InstanceLocationInformation, ExpressRequest  } from '../../types';

import { EVENT, VENMO_BLUE_HC, VQRC_EXPERIMENT } from './constants';
import { getParams } from './params';
import { getSmartQRCodeClientScript } from './script';
import { QRCode } from './node-qrcode';

type QRCExperimentParams = {|
    buttonSessionID : string
|};

type QRcodeMiddlewareOptions = {|
    logger? : LoggerType,
    cache? : CacheType,
    cdn? : boolean,
    getInstanceLocationInformation : () => InstanceLocationInformation,
    getVenmoQRCRedesignExperiment? : (req : ExpressRequest, params : QRCExperimentParams) => Promise<string>
|};

function getDefaultVQRCExperiment() : Promise<string> {
    return Promise.resolve(VQRC_EXPERIMENT.CTRL);
}

export function getQRCodeMiddleware({ logger = defaultLogger, cache, cdn = !isLocalOrTest(), getInstanceLocationInformation, getVenmoQRCRedesignExperiment = getDefaultVQRCExperiment } : QRcodeMiddlewareOptions = {}) : ExpressMiddleware {
    const useLocal = !cdn;
    const locationInformation = getInstanceLocationInformation();


    return sdkMiddleware({ logger, cache, locationInformation }, {
        app: async ({ req, res, params, meta, logBuffer }) => {
            logger.info(req, EVENT.RENDER);

            const { cspNonce, qrPath, debug, buttonSessionID } = getParams(params, req, res);

            if (!qrPath) {
                return clientErrorResponse(res, 'Please provide a qrPath query parameter');
            }

            const svgString = await QRCode.toString(
                qrPath,
                {
                    // width: 160,
                    // width:  240,
                    margin: 0,
                    color:  {
                        dark:  VENMO_BLUE_HC,
                        light: '#FFFFFF'
                    }
                }
            );

            const client = await getSmartQRCodeClientScript({ debug, logBuffer, cache, useLocal, locationInformation });
            const qrcRedesignExperiment = await getVenmoQRCRedesignExperiment(req, { buttonSessionID });

            logger.info(req, `qrcode_client_version_${ client.version }`);
            logger.info(req, `qrcode_params`, { params: JSON.stringify(params) });

            const pageHTML = `
            <!DOCTYPE html>
            <head>
                <link 
                    nonce="${ cspNonce }"
                    rel="stylesheet" 
                    href="https://www.paypalobjects.com/paypal-ui/web/fonts-and-normalize/1-1-0/fonts-and-normalize.min.css"
                />
            </head>
            <body data-nonce="${ cspNonce }" data-client-version="${ client.version }">
                ${ meta.getSDKLoader({ nonce: cspNonce }) }
                <script nonce="${ cspNonce }">${ client.script }</script>
                <script nonce="${ cspNonce }">
                    spbQRCode.renderQRCode(${ safeJSON({ svgString, qrcRedesignExperiment }) });
                </script>
            </body>
        `;

            allowFrame(res);
            return htmlResponse(res, pageHTML);
        }
    });
}

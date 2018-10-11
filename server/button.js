/* @flow */

import { undotify, htmlEncode } from 'belter';

import { getFundingEligibility } from './eligibility';
import { getSmartButtonClientScript, getSmartButtonRenderScript, startWatchers } from './watcher';

type ExpressRequest = express$Request; // eslint-disable-line no-undef
type ExpressResponse = express$Response; // eslint-disable-line no-undef

type LoggerType = {
    +debug : Function,
    +info : Function,
    +warn : Function,
    +error : Function
};

export function getButtonMiddleware({ logger = console } : { logger? : LoggerType } = {}) : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    startWatchers();

    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            let [ buttonScript, { Buttons, DEFAULT_PROPS } ] = await Promise.all([
                getSmartButtonClientScript(),
                getSmartButtonRenderScript()
            ]);

            let params = undotify(req.query);

            let {
                clientID,
                locale = DEFAULT_PROPS.LOCALE,
                intent = DEFAULT_PROPS.INTENT,
                commit = DEFAULT_PROPS.COMMIT,
                vault = DEFAULT_PROPS.VAULT
            } = params;

            if (!clientID) {
                res.status(400)
                    .header('content-type', 'text/plain')
                    .send('Please provide a clientID query parameter');
                return;
            }

            let { lang, country } = locale;

            let fundingEligibility = (req.query.fundingEligibility && typeof req.query.fundingEligibility === 'string')
                ? JSON.parse(Buffer.from(req.query.fundingEligibility, 'base64').toString('utf8'))
                : await getFundingEligibility({ country, intent, commit, vault });

            let nonce = res.locals && res.locals.nonce;

            if (!nonce || typeof nonce !== 'string') {
                nonce = '';
            }

            let buttonHTML = Buttons({ ...params, nonce, fundingEligibility }).toString();

            let pageHTML = `
                <body>
                    ${ buttonHTML }
                    <script src="/sdk/js?client-id=${ htmlEncode(clientID) }&locale-country=${ htmlEncode(country) }&locale-lang=${ htmlEncode(lang) }&components=buttons,checkout"></script>
                    <script nonce="${ nonce }">${ buttonScript }</script>
                    <script nonce="${ nonce }">spb.setupButton()</script>
                </body>
            `;

            res.removeHeader('X-Frame-Options');

            res
                .status(200)
                .header('content-type', 'text/html')
                .send(pageHTML);

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            logger.error(req, 'smart_button_error', { err: err.stack ? err.stack : err.toString() });
            res.status(500)
                .header('content-type', 'text/plain')
                .send(err.stack ? err.stack : err.toString());
        }
    };
}


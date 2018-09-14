/* @flow */

import { undotify, htmlEncode } from 'belter';
import { logger } from 'beaver-logger-paypal';

import { getFundingEligibility } from './eligibility';
import { getSmartButtonClientScript, getSmartButtonRenderScript } from './watcher';

type ExpressRequest = express$Request; // eslint-disable-line no-undef
type ExpressResponse = express$Response; // eslint-disable-line no-undef

export function getButtonMiddleware() : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
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

            let fundingEligibility = await getFundingEligibility({ country, intent, commit, vault });

            let buttonHTML = Buttons({ ...params, fundingEligibility }).toString();

            let pageHTML = `
                <body>
                    ${ buttonHTML }
                    <script src="/sdk/js?client-id=${ htmlEncode(clientID) }&locale=${ htmlEncode(lang) }_${ htmlEncode(country) }&components=buttons,checkout"></script>
                    <script>${ buttonScript }</script>
                    <script>spb.setupButton()</script>
                </body>
            `;

            res
                .status(200)
                .header('content-type', 'text/html')
                .send(pageHTML);

        } catch (err) {
            logger.error(req, 'smart_button_error', { err: err.stack ? err.stack : err.toString() });
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            res.status(500)
                .header('content-type', 'text/plain')
                .send('');
        }
    };
}


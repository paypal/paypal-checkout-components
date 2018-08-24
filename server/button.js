/* @flow */

import { join } from 'path';

import { readFile } from 'fs-extra';
import { poll } from 'grabthar';
import { undotify, memoize, htmlEncode } from 'belter';

import { getFundingEligibility } from './eligibility';

const BUTTON_CLIENT_JS = join(__dirname, '..', 'dist/smart-payment-buttons.min.js');

type ExpressRequest = express$Request; // eslint-disable-line no-undef
type ExpressResponse = express$Response; // eslint-disable-line no-undef

export let getPayPalCheckoutComponentWatcher = memoize(() => {
    return poll({
        name: 'paypal-checkout-components'
    });
});

export let cancelPayPalCheckoutComponentWatcher = () => {
    return getPayPalCheckoutComponentWatcher().cancel();
};

let getSmartButtonClientJavascript = memoize(async () => {
    return await readFile(BUTTON_CLIENT_JS);
});

export function getButtonMiddleware() : (req : ExpressRequest, res : ExpressResponse) => Promise<void> {
    return async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
        try {
            let { Buttons, DEFAULT_PROPS } = await getPayPalCheckoutComponentWatcher().import(`dist/button.js`);

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

            let { country } = locale;

            let fundingEligibility = await getFundingEligibility({ country, intent, commit, vault });

            let buttonHTML = Buttons({ ...params, fundingEligibility }).toString();
            let buttonScript = await getSmartButtonClientJavascript();

            let pageHTML = `
            <body>
                ${ buttonHTML }
                <script src="https://www.paypal.com/sdk/js?client-id=${ htmlEncode(clientID) }"></script>
                <script>${ buttonScript }</script>
            </body>
        `;

            res
                .status(200)
                .header('content-type', 'text/html')
                .send(pageHTML);

        } catch (err) {
            console.error(err.stack ? err.stack : err); // eslint-disable-line no-console
            res.status(500)
                .header('content-type', 'text/plain')
                .send('');
        }
    };
}


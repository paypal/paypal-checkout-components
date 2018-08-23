/* @flow */

import { poll } from 'grabthar';
import { undotify } from 'belter';

import { getFundingEligibility } from './eligibility';

type ExpressRequest = express$Request; // eslint-disable-line no-undef
type ExpressResponse = express$Response; // eslint-disable-line no-undef

export let paypalCheckoutComponents = poll({
    name: 'paypal-checkout-components'
});

export async function buttonMiddleware(req : ExpressRequest, res : ExpressResponse) : Promise<void> {
    try {
        let { Buttons, DEFAULT_PROPS } = await paypalCheckoutComponents.import(`dist/button.js`);

        let params = undotify(req.query);

        let {
            locale = DEFAULT_PROPS.LOCALE,
            intent = DEFAULT_PROPS.INTENT,
            commit = DEFAULT_PROPS.COMMIT,
            vault  = DEFAULT_PROPS.VAULT
        } = params;

        let { country } = locale;

        let fundingEligibility = await getFundingEligibility({ country, intent, commit, vault });

        let props = {
            ...params,
            fundingEligibility
        };

        let buttonHTML = Buttons(props).toString();

        let pageHTML = `
            <body>
                ${ buttonHTML }

                <script src="https://www.paypal.com/sdk/js"></script>
                <script src="button.js"></script>
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
}

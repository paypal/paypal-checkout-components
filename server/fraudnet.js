/* @flow */

import { FNCLS, FRAUDNET_ID } from './config';

const FRAUDNET_URL = 'https://c.paypal.com/da/r/fb.js';

export function renderFraudnetScript({ id, nonce } : { id : string, nonce : string }) : string {

    const fraudnetConfig = JSON.stringify({
        f: id,
        s: FRAUDNET_ID
    });

    return `
        <script nonce="${ nonce }" type="application/json" id="fconfig" fncls="${ FNCLS }">
            ${ fraudnetConfig }
        </script>
        <script nonce="${ nonce }" type="text/javascript" src="${ FRAUDNET_URL }" async></script>
    `;
}

/* @flow */

import { FNCLS, FRAUDNET_ID } from './config';

const FRAUDNET_URL = 'https://c.paypal.com/da/r/fb.js';

export function renderFraudnetScript({ id, cspNonce } : { id : string, cspNonce : string }) : string {

    const fraudnetConfig = JSON.stringify({
        f: id,
        s: FRAUDNET_ID
    });

    return `
        <script nonce="${ cspNonce }" type="application/json" id="fconfig" fncls="${ FNCLS }">
            ${ fraudnetConfig }
        </script>
        <script nonce="${ cspNonce }" type="text/javascript" src="${ FRAUDNET_URL }" async></script>
    `;
}

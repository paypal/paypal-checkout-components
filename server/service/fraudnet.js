/* @flow */

import { ENV, FUNDING } from '@paypal/sdk-constants';

import { FNCLS, FRAUDNET_ID } from '../config';
import { safeJSON } from '../lib';
import type { Wallet } from '../../src/types';

const FRAUDNET_URL = {
    [ ENV.LOCAL ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.STAGE ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.SANDBOX ]:    'https://c.paypal.com/da/r/fb.js',
    [ ENV.PRODUCTION ]: 'https://c.paypal.com/da/r/fb.js',
    [ ENV.TEST ]:       'https://c.paypal.com/da/r/fb.js'
};

export function shouldRenderFraudnet({ wallet } : {| wallet : Wallet |}) : boolean {
    for (const fundingSource of Object.values(FUNDING)) {
        // $FlowFixMe
        const walletConfig = wallet && wallet[fundingSource];

        if (walletConfig && walletConfig.instruments && walletConfig.instruments.length) {
            return true;
        }
    }

    return false;
}

export function renderFraudnetScript({ id, cspNonce, env } : {| id : string, cspNonce : string, env : $Values<typeof ENV> |}) : string {

    const fraudnetConfig = {
        f: id,
        s: FRAUDNET_ID
    };

    return `
        <script nonce="${ cspNonce }" type="application/json" id="fconfig" fncls="${ FNCLS }">
            ${ safeJSON(fraudnetConfig) }
        </script>
        <script nonce="${ cspNonce }" type="text/javascript" src="${ FRAUDNET_URL[env] }" async></script>
    `;
}

/* @flow */

import { ENV, FUNDING, CARD } from '@paypal/sdk-constants';

import { FNCLS, FRAUDNET_ID } from '../config';
import { safeJSON } from '../lib';

import type { FundingEligibility } from './fundingEligibility';

const FRAUDNET_URL = {
    [ ENV.LOCAL ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.STAGE ]:      'https://www.msmaster.qa.paypal.com/en_US/m/fb-raw.js',
    [ ENV.SANDBOX ]:    'https://c.paypal.com/da/r/fb.js',
    [ ENV.PRODUCTION ]: 'https://c.paypal.com/da/r/fb.js',
    [ ENV.TEST ]:       'https://c.paypal.com/da/r/fb.js'
};

export function shouldRenderFraudnet({ fundingEligibility } : {| fundingEligibility : FundingEligibility |}) : boolean {
    for (const fundingSource of Object.values(FUNDING)) {
        // $FlowFixMe
        const fundingConfig = fundingEligibility[fundingSource];

        if (fundingConfig && fundingConfig.vaultedInstruments && fundingConfig.vaultedInstruments.length) {
            return true;
        }

        if (fundingSource === FUNDING.CARD && fundingConfig && fundingConfig.vendors) {
            for (const card of Object.values(CARD)) {
                const cardConfig = fundingConfig.vendors[card];

                if (cardConfig && cardConfig.vaultedInstruments && cardConfig.vaultedInstruments.length) {
                    return true;
                }
            }
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

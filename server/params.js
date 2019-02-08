/* @flow */

import { FUNDING, COUNTRY, LANG, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';

import type { ExpressRequest, ExpressResponse } from './types';

type FundingEligibility = {|
    paypal : {
        eligible : boolean
    },
    venmo : {
        eligible : boolean
    }
|};

function getFundingEligibility(req : ExpressRequest) : ?FundingEligibility {
    const encodedFundingEligibility = req.query.fundingEligibility;

    let fundingEligibility;

    if (!encodedFundingEligibility || typeof encodedFundingEligibility !== 'string') {
        // $FlowFixMe
        fundingEligibility = {
            [ FUNDING.PAYPAL ]: {
                eligible: true
            }
        };
    } else {
        fundingEligibility = JSON.parse(
            Buffer.from(encodedFundingEligibility, 'base64').toString('utf8')
        );
    }

    const cookies = req.get('cookie');
    if (cookies && cookies.indexOf('pwv') !== -1) {
        fundingEligibility[FUNDING.VENMO] = fundingEligibility[FUNDING.VENMO] || {};
        fundingEligibility[FUNDING.VENMO].eligible = true;
    }

    return fundingEligibility;
}

function getNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}

type ParamsType = {|
    clientID : string,
    locale? : {
        country : $Values<typeof COUNTRY>,
        lang : $Values<typeof LANG>
    }
|};

type RequestParams = {|
    clientID : ?string,
    country : $Values<typeof COUNTRY>,
    lang : $Values<typeof LANG>,
    fundingEligibility : ?FundingEligibility,
    nonce : string
|};

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        clientID,
        locale = {}
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;

    const fundingEligibility = getFundingEligibility(req);

    const nonce = getNonce(res);

    return {
        clientID,
        // $FlowFixMe
        lang,
        country,
        fundingEligibility,
        nonce
    };
}

/* @flow */
/* eslint max-depth: off */

import { ENV, COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';
import { values } from 'belter';

import { HTTP_HEADER } from '../../config';
import type { FundingEligibility } from '../../service';
import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';

function getNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}

type StyleType = {|
    label? : string,
    period? : ?number
|};

type ParamsType = {|
    env : $Values<typeof ENV>,
    clientID : string,
    locale? : LocaleType,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID? : $ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken? : string,
    debug? : boolean,
    style : ?StyleType,
    onShippingChange? : boolean
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    buyerCountry : $Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    cspNonce : string,
    basicFundingEligibility : FundingEligibility,
    locale : LocaleType,
    debug : boolean,
    style : {
        label : string,
        period : ?number
    },
    onShippingChange : boolean
|};

function getFundingEligibilityParam(req : ExpressRequest) : FundingEligibility {
    const encodedFundingEligibility = req.query.fundingEligibility;

    if (encodedFundingEligibility && typeof encodedFundingEligibility === 'string') {
        const fundingEligibilityInput = JSON.parse(
            Buffer.from(encodedFundingEligibility, 'base64').toString('utf8')
        );

        const fundingEligibility = {};
        
        for (const fundingSource of values(FUNDING)) {
            const fundingSourceEligibilityInput = fundingEligibilityInput[fundingSource] || {};
            const fundingSourceEligibility = fundingEligibility[fundingSource] = {};

            if (fundingSourceEligibilityInput) {
                if (typeof fundingSourceEligibilityInput.eligible === 'boolean') {
                    fundingSourceEligibility.eligible = fundingSourceEligibilityInput.eligible;
                }

                if (typeof fundingSourceEligibilityInput.recommended === 'boolean') {
                    fundingSourceEligibility.recommended = fundingSourceEligibilityInput.recommended;
                }

                if (typeof fundingSourceEligibilityInput.branded === 'boolean') {
                    fundingSourceEligibility.branded = fundingSourceEligibilityInput.branded;
                }

                if (typeof fundingSourceEligibilityInput.vaultable === 'boolean') {
                    fundingSourceEligibility.vaultable = fundingSourceEligibilityInput.vaultable;
                }

                if (fundingSource === FUNDING.CARD) {
                    const vendorsInputEligibility = fundingSourceEligibilityInput.vendors || {};
                    const vendorsEligility = fundingSourceEligibility.vendors = {};

                    for (const vendor of values(CARD)) {
                        const vendorEligibilityInput = vendorsInputEligibility[vendor] || {};
                        const vendorEligibility = vendorsEligility[vendor] = {};

                        if (typeof vendorEligibilityInput.eligible === 'boolean') {
                            vendorEligibility.eligible = vendorEligibilityInput.eligible;
                        }
        
                        if (typeof vendorEligibilityInput.branded === 'boolean') {
                            vendorEligibility.branded = vendorEligibilityInput.branded;
                        }
        
                        if (typeof vendorEligibilityInput.vaultable === 'boolean') {
                            vendorEligibility.vaultable = vendorEligibilityInput.vaultable;
                        }
                    }
                }
            }
        }

        // $FlowFixMe
        return fundingEligibility;
    }

    // $FlowFixMe
    return {
        [ FUNDING.PAYPAL ]: {
            eligible: true
        }
    };
}

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        clientID,
        locale = {},
        buyerCountry = (req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US),
        currency,
        intent,
        commit,
        vault,
        style: buttonStyle,
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        clientAccessToken,
        debug = false,
        onShippingChange = false
    } = params;

    const {
        country = DEFAULT_COUNTRY,
        lang = COUNTRY_LANGS[country][0]
    } = locale;

    const cspNonce = getNonce(res);

    const basicFundingEligibility = getFundingEligibilityParam(req);

    const {
        label = 'paypal',
        period
    } = buttonStyle || {};
    const style = { label, period };

    return {
        env,
        clientID,
        buyerCountry,
        currency,
        intent,
        commit,
        vault,
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        clientAccessToken,
        basicFundingEligibility,
        cspNonce,
        debug,
        style,
        onShippingChange,
        locale: { country, lang }
    };
}

/* @flow */
/* eslint max-depth: off */

import type { FundingEligibilityType } from '@paypal/sdk-constants/src/types';
import { ENV, COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, DEFAULT_COUNTRY, COUNTRY_LANGS, PLATFORM, FUNDING_PRODUCTS } from '@paypal/sdk-constants';
import { values } from 'belter';

import { HTTP_HEADER, ERROR_CODE } from '../../config';
import type { ExpressRequest, ExpressResponse, LocaleType, RiskData } from '../../types';
import { makeError } from '../../lib';

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
    enableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID? : $ReadOnlyArray<string>,
    buttonSessionID : string,
    pageSessionID : string,
    clientAccessToken? : string,
    debug? : boolean,
    style : ?StyleType,
    onShippingChange? : boolean,
    userIDToken? : string,
    amount? : string,
    clientMetadataID? : string,
    riskData? : string,
    platform : ?$Values<typeof PLATFORM>
|};

type Style = {|
    label : string,
    period : ?number
|};

type RequestParams = {|
    env : $Values<typeof ENV>,
    clientID : ?string,
    buyerCountry : $Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    enableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    cspNonce : string,
    basicFundingEligibility : FundingEligibilityType,
    locale : LocaleType,
    debug : boolean,
    style : Style,
    onShippingChange : boolean,
    userIDToken : ?string,
    amount : ?string,
    clientMetadataID : ?string,
    pageSessionID : string,
    riskData : ?RiskData,
    correlationID : string,
    platform : $Values<typeof PLATFORM>,
    cookies : string
|};

function getCSPNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}

function getCookieString(req : ExpressRequest) : string {
    try {
        if (!req.cookies) {
            return '';
        }

        return Object.keys(req.cookies).map(key => {
            return `${ key }=x;`;
        }).join('');

    } catch (err) {
        return '';
    }
}

const getDefaultFundingEligibility = () : FundingEligibilityType => {
    // $FlowFixMe
    return {};
};

// eslint-disable-next-line complexity
function getFundingEligibilityParam(req : ExpressRequest) : FundingEligibilityType {
    const encodedFundingEligibility = req.query.fundingEligibility;

    if (encodedFundingEligibility && typeof encodedFundingEligibility === 'string') {
        let fundingEligibilityInput;

        try {
            fundingEligibilityInput = JSON.parse(Buffer.from(encodedFundingEligibility, 'base64').toString('utf8'));
        } catch (err) {
            throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid funding eligibility: ${ encodedFundingEligibility }`, err);
        }
        const fundingEligibility = getDefaultFundingEligibility();
        
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

                if (typeof fundingSourceEligibilityInput.installments === 'boolean') {
                    fundingSourceEligibility.installments = fundingSourceEligibilityInput.installments;
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

                const productsEligibilityInput = fundingSourceEligibilityInput.products;
                const productsEligibility = fundingSourceEligibility.products || {};

                if (productsEligibilityInput) {
                    fundingSourceEligibility.products = productsEligibility;

                    for (const product of values(FUNDING_PRODUCTS)) {
                        const productEligibilityInput = productsEligibilityInput[product] || {};
                        const productEligibility = productsEligibility[product] || {};

                        if (typeof productEligibilityInput.eligible === 'boolean') {
                            productEligibility.eligible = productEligibilityInput.eligible;
                            productsEligibility[product] = productEligibility;
                        }
                    }
                }
            }
        }

        return fundingEligibility;
    }
    
    return {
        [ FUNDING.PAYPAL ]: {
            eligible: true
        }
    };
}

function getRiskDataParam(req : ExpressRequest) : ?RiskData {
    const serializedRiskData = req.query.riskData;

    if (!serializedRiskData || typeof serializedRiskData !== 'string') {
        return;
    }

    try {
        return JSON.parse(Buffer.from(serializedRiskData, 'base64').toString('utf8'));
    } catch (err) {
        // pass
    }
}

function getBuyerCountry(req : ExpressRequest, params : ParamsType) : $Values<typeof COUNTRY> {
    return params.buyerCountry || req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US;
}

function getLocale(params : ParamsType) : LocaleType {
    let {
        locale: {
            country = DEFAULT_COUNTRY,
            lang
        } = {}
    } = params;

    const langs = COUNTRY_LANGS[country];

    if (!langs) {
        throw makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid locale country: ${ country }`);
    }

    lang = lang || langs[0];

    if (langs.indexOf(lang) === -1) {
        throw makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid locale language: ${ lang }`);
    }

    return {
        country,
        lang
    };
}

function getAmount(params : ParamsType) : ?string {
    if (params.amount) {
        let amount = params.amount.toString();
        if (amount.match(/^\d+$/)) {
            amount = `${ amount }.00`;
        }
        return amount;
    }
}

function getStyle(params : ParamsType) : Style {
    const {
        label = 'paypal',
        period
    } = params.style || {};

    return { label, period };
}

export function getParams(params : ParamsType, req : ExpressRequest, res : ExpressResponse) : RequestParams {
    const {
        env,
        clientID,
        currency,
        intent,
        commit,
        vault,
        enableFunding,
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        pageSessionID,
        clientMetadataID,
        clientAccessToken,
        userIDToken,
        debug = false,
        onShippingChange = false,
        platform = PLATFORM.DESKTOP
    } = params;

    const locale = getLocale(params);
    const cspNonce = getCSPNonce(res);
    const amount = getAmount(params);
    const style = getStyle(params);
    const buyerCountry = getBuyerCountry(req, params);

    const basicFundingEligibility = getFundingEligibilityParam(req);
    const riskData = getRiskDataParam(req);
    const correlationID = req.correlationId || '';

    const cookies = getCookieString(req);

    return {
        env,
        clientID,
        buyerCountry,
        currency,
        intent,
        commit,
        vault,
        enableFunding,
        disableFunding,
        disableCard,
        merchantID,
        userIDToken,
        buttonSessionID,
        clientAccessToken,
        basicFundingEligibility,
        cspNonce,
        debug: Boolean(debug),
        style,
        onShippingChange,
        locale,
        amount,
        riskData,
        pageSessionID,
        clientMetadataID,
        correlationID,
        platform,
        cookies
    };
}

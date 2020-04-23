/* @flow */
/* eslint max-depth: off */

import { ENV, COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, DEFAULT_COUNTRY, COUNTRY_LANGS } from '@paypal/sdk-constants';
import { values } from 'belter';

import { HTTP_HEADER, ERROR_CODE } from '../../config';
import type { FundingEligibility } from '../../service';
import type { ExpressRequest, ExpressResponse, LocaleType } from '../../types';
import { makeError } from '../../lib';

export type RiskData = {||};

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
    pageSessionID : string,
    clientAccessToken? : string,
    debug? : boolean,
    style : ?StyleType,
    onShippingChange? : boolean,
    userIDToken? : string,
    amount? : string,
    clientMetadataID? : string,
    riskData? : string
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
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    cspNonce : string,
    basicFundingEligibility : FundingEligibility,
    locale : LocaleType,
    debug : boolean,
    style : Style,
    onShippingChange : boolean,
    userIDToken : ?string,
    amount : ?string,
    clientMetadataID : string,
    riskData : ?RiskData
|};

function getCSPNonce(res : ExpressResponse) : string {
    let nonce = res.locals && res.locals.nonce;

    if (!nonce || typeof nonce !== 'string') {
        nonce = '';
    }

    return nonce;
}

function getFundingEligibilityParam(req : ExpressRequest) : FundingEligibility {
    const encodedFundingEligibility = req.query.fundingEligibility;

    if (encodedFundingEligibility && typeof encodedFundingEligibility === 'string') {
        let fundingEligibilityInput;

        try {
            fundingEligibilityInput = JSON.parse(Buffer.from(encodedFundingEligibility, 'base64').toString('utf8'));
        } catch (err) {
            throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid funding eligibility: ${ encodedFundingEligibility }`, err);
        }
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

function getRiskDataParam(req : ExpressRequest) : ?RiskData {
    const serializedRiskData = req.query.riskData;

    if (!serializedRiskData || typeof serializedRiskData !== 'string') {
        return;
    }

    try {
        return JSON.parse(Buffer.from(serializedRiskData, 'base64').toString('utf8'));
    } catch (err) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid risk data: ${ serializedRiskData }`, err);
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
        disableFunding,
        disableCard,
        merchantID,
        buttonSessionID,
        pageSessionID,
        clientMetadataID = pageSessionID,
        clientAccessToken,
        userIDToken,
        debug = false,
        onShippingChange = false
    } = params;

    const locale = getLocale(params);
    const cspNonce = getCSPNonce(res);
    const amount = getAmount(params);
    const style = getStyle(params);
    const buyerCountry = getBuyerCountry(req, params);

    const basicFundingEligibility = getFundingEligibilityParam(req);
    const riskData = getRiskDataParam(req);

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
        userIDToken,
        buttonSessionID,
        clientAccessToken,
        basicFundingEligibility,
        cspNonce,
        debug,
        style,
        onShippingChange,
        locale,
        amount,
        riskData,
        clientMetadataID
    };
}

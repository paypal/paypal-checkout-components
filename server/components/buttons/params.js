/* @flow */
/* eslint max-depth: off */

import type { FundingEligibilityType } from '@paypal/sdk-constants/src/types';
import { ENV, COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING, DEFAULT_COUNTRY,
    COUNTRY_LANGS, PLATFORM, FUNDING_PRODUCTS, SDK_QUERY_KEYS } from '@paypal/sdk-constants';
import { values, constHas } from 'belter';

import { HTTP_HEADER, ERROR_CODE } from '../../config';
import type { ExpressRequest, ExpressResponse, LocaleType, RiskData } from '../../types';
import { makeError, getCSPNonce } from '../../lib';

import { SPB_QUERY_KEYS } from './constants';

type StyleType = {|
    label? : string,
    period? : ?number
|};

type ButtonInputParams = {|
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
    amount? : number | string,
    clientMetadataID? : string,
    riskData? : string,
    platform : ?$Values<typeof PLATFORM>
|};

type Style = {|
    label : string,
    period : ?number
|};

type ButtonParams = {|
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

function getBuyerCountry(req : ExpressRequest, params : ButtonInputParams) : $Values<typeof COUNTRY> {
    return params.buyerCountry || req.get(HTTP_HEADER.PP_GEO_LOC) || COUNTRY.US;
}

function getLocale(params : ButtonInputParams) : LocaleType {
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

export function getAmount(amount : ?(string | number)) : ?string {
    if (typeof amount === 'string' || typeof amount === 'number') {
        amount = amount.toString();
        if (amount.match(/^\d+$/)) {
            amount = `${ amount }.00`;
        }
        return amount;
    }
}

function getStyle(params : ButtonInputParams) : Style {
    const {
        label = 'paypal',
        period
    } = params.style || {};

    return { label, period };
}

export function getButtonParams(params : ButtonInputParams, req : ExpressRequest, res : ExpressResponse) : ButtonParams {
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
    const amount = getAmount(params.amount);
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

type ButtonPreflightInputParams = {|
    'client-id' : string,
    'merchant-id'? : string,
    'user-id-token' : string,
    'currency'? : $Values<typeof CURRENCY>,
    'amount'? : string | number
|};

type ButtonPreflightParams = {|
    clientID : string,
    merchantID : $ReadOnlyArray<string>,
    userIDToken : string,
    currency : $Values<typeof CURRENCY>,
    amount : string
|};

export function getButtonPreflightParams(params : ButtonPreflightInputParams) : ButtonPreflightParams {
    let {
        [ SDK_QUERY_KEYS.CLIENT_ID ]: clientID,
        [ SDK_QUERY_KEYS.MERCHANT_ID ]: merchantID,
        [ SDK_QUERY_KEYS.CURRENCY ]: currency = CURRENCY.USD,
        [ SPB_QUERY_KEYS.USER_ID_TOKEN ]: userIDToken,
        [ SPB_QUERY_KEYS.AMOUNT ]: amount = '0.00'
    } = params;
    
    if (merchantID) {
        merchantID = merchantID.split(',');
    } else {
        merchantID = [];
    }

    amount = getAmount(amount);

    if (!clientID) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Please provide a ${ SDK_QUERY_KEYS.CLIENT_ID } query parameter`);
    }

    if (!userIDToken) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Please provide a ${ SPB_QUERY_KEYS.USER_ID_TOKEN } query parameter`);
    }

    for (const merchant of merchantID) {
        if (!merchant.match(/^[A-Z0-9]+$/)) {
            throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid ${ SDK_QUERY_KEYS.MERCHANT_ID } query parameter`);
        }
    }

    if (currency && !constHas(CURRENCY, currency)) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid ${ SDK_QUERY_KEYS.CURRENCY } query parameter`);
    }

    if (amount && !amount.match(/^\d+\.\d{2}$/)) {
        throw new makeError(ERROR_CODE.VALIDATION_ERROR, `Invalid ${ SPB_QUERY_KEYS.AMOUNT } query parameter`);
    }

    if (!amount) {
        throw new Error(`Amount should be defined`);
    }

    return {
        clientID, merchantID, currency, userIDToken, amount
    };
}

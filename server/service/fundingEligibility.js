/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-constants/src/types';
import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';
import { strictMerge } from 'strict-merge';

import { pruneQuery, buildQuery, graphqlTypes, copy, type GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';

type FundingEligibilityQueryOptions = {|
    queryProducts? : boolean
|};

function buildFundingEligibilityQuery(basicFundingEligibility : FundingEligibilityType, opts? : FundingEligibilityQueryOptions) : ?string {
    const { queryProducts = false } = opts || {};

    const InputTypes = {
        $clientID:        'String',
        $buyerCountry:    'CountryCodes',
        $ip:              'String',
        $cookies:         'String',
        $currency:        'SupportedCountryCurrencies',
        $intent:          'FundingEligibilityIntent',
        $commit:          'Boolean',
        $vault:           'Boolean',
        $disableFunding:  '[ SupportedPaymentMethodsType ]',
        $disableCard:     '[ SupportedCardsType ]',
        $merchantID:      '[ String ]',
        $buttonSessionID: 'String',
        $userAgent:       'String'
    };

    const Inputs = {
        clientId:        '$clientID',
        buyerCountry:    '$buyerCountry',
        ip:              '$ip',
        cookies:         '$cookies',
        currency:        '$currency',
        intent:          '$intent',
        commit:          '$commit',
        vault:           '$vault',
        disableFunding:  '$disableFunding',
        disableCard:     '$disableCard',
        merchantId:      '$merchantID',
        buttonSessionId: '$buttonSessionID',
        userAgent:       '$userAgent'
    };

    const getBasicFundingEligibilityQuery = () => {
        return {
            eligible: graphqlTypes.boolean
        };
    };

    const getCardVendorQuery = () => {
        return {
            eligible: graphqlTypes.boolean
        };
    };

    const getCardVendorsQuery = () => {
        return {
            [CARD.VISA]:       getCardVendorQuery(),
            [CARD.MASTERCARD]: getCardVendorQuery(),
            [CARD.AMEX]:       getCardVendorQuery(),
            [CARD.DISCOVER]:   getCardVendorQuery(),
            [CARD.HIPER]:      getCardVendorQuery(),
            [CARD.ELO]:        getCardVendorQuery(),
            [CARD.JCB]:        getCardVendorQuery()
        };
    };

    const getPayLaterProductQuery = () => {
        return {
            eligible:  graphqlTypes.boolean
        };
    };

    const getPayLaterProductsQuery = () => {
        if (!queryProducts) {
            return;
        }

        return {
            flex:   getPayLaterProductQuery(),
            payIn4: getPayLaterProductQuery()
        };
    };

    const getPayPalQuery = () => {
        return {
            eligible:  graphqlTypes.boolean
        };
    };

    const getCardQuery = () => {
        return {
            eligible: graphqlTypes.boolean,
            branded:  graphqlTypes.boolean,
            vendors:  getCardVendorsQuery()
        };
    };

    const getPayLaterQuery = () => {
        return {
            eligible: graphqlTypes.boolean,
            products: getPayLaterProductsQuery()
        };
    };

    const fundingQuery = {
        [ FUNDING.PAYPAL ]:     getPayPalQuery(),
        [ FUNDING.CARD ]:       getCardQuery(),
        [ FUNDING.VENMO ]:      getBasicFundingEligibilityQuery(),
        [ FUNDING.ITAU ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.CREDIT ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.PAYLATER ]:   getPayLaterQuery(),
        [ FUNDING.SEPA ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.IDEAL ]:      getBasicFundingEligibilityQuery(),
        [ FUNDING.BANCONTACT ]: getBasicFundingEligibilityQuery(),
        [ FUNDING.GIROPAY ]:    getBasicFundingEligibilityQuery(),
        [ FUNDING.EPS ]:        getBasicFundingEligibilityQuery(),
        [ FUNDING.SOFORT ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.MYBANK ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.P24 ]:        getBasicFundingEligibilityQuery(),
        [ FUNDING.ZIMPLER ]:    getBasicFundingEligibilityQuery(),
        [ FUNDING.WECHATPAY ]:  getBasicFundingEligibilityQuery(),
        [ FUNDING.PAYU ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.BLIK ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.TRUSTLY ]:    getBasicFundingEligibilityQuery(),
        [ FUNDING.OXXO ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.MAXIMA ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.BOLETO ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.MERCADOPAGO ]:getBasicFundingEligibilityQuery()
    };

    return buildQuery({
        name:       'GetFundingEligibility',
        key:        'fundingEligibility',
        inputTypes: InputTypes,
        inputs:     Inputs,
        query:      pruneQuery(fundingQuery, basicFundingEligibility)
    });
}

export type FundingEligibilityOptions = {|
    logger : LoggerType,
    clientID : string,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    clientAccessToken : ?string,
    basicFundingEligibility : FundingEligibilityType,
    enableBNPL : boolean
|};

export async function resolveFundingEligibility(req : ExpressRequest, gqlBatch : GraphQLBatch, { logger, clientID, merchantID, buttonSessionID,
    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, basicFundingEligibility, enableBNPL } : FundingEligibilityOptions) : Promise<FundingEligibilityType> {

    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';

        intent = intent ? intent.toUpperCase() : intent;
        // $FlowFixMe
        disableFunding = disableFunding ? disableFunding.map(source => source.toUpperCase()) : disableFunding;
        // $FlowFixMe
        disableCard = disableCard ? disableCard.map(source => source.toUpperCase()) : disableCard;

        basicFundingEligibility = copy(basicFundingEligibility);
        
        if (basicFundingEligibility.card && merchantID && merchantID.length > 1) {
            // $FlowFixMe
            delete basicFundingEligibility.card.branded;
        }

        const fundingEligibilityQuery = buildFundingEligibilityQuery(basicFundingEligibility, { queryProducts: enableBNPL });

        if (!fundingEligibilityQuery) {
            logger.info(req, 'funding_eligibility_no_queryable_fields');
            return basicFundingEligibility;
        }

        const { fundingEligibility } = await gqlBatch({
            query:     fundingEligibilityQuery,
            variables: {
                clientID, merchantID, buyerCountry, cookies, ip, currency, intent, commit,
                vault, disableFunding, disableCard, userAgent, buttonSessionID
            },
            accessToken: clientAccessToken
        });

        return strictMerge(basicFundingEligibility, fundingEligibility, (first, second) => second);

    } catch (err) {
        logger.error(req, 'funding_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return basicFundingEligibility;
    }
}

/* @flow */

import type { FundingEligibilityType } from '@paypal/sdk-constants/src/types';
import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';
import { params, types, query } from 'typed-graphqlify';
import { values } from 'belter';
import { strictMerge } from 'strict-merge';

import { isDefined, type GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';

// eslint-disable-next-line complexity
function buildFundingEligibilityQuery(basicFundingEligibility : FundingEligibilityType, merchantID : ?$ReadOnlyArray<string>) : string {
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
            eligible: types.boolean
        };
    };

    const getBasicCardVendorQuery = () => {
        return {
            eligible:           types.boolean,
            vaultable:          types.boolean
        };
    };

    const getVendorQuery = () => {
        return {
            [CARD.VISA]:       getBasicCardVendorQuery(),
            [CARD.MASTERCARD]: getBasicCardVendorQuery(),
            [CARD.AMEX]:       getBasicCardVendorQuery(),
            [CARD.DISCOVER]:   getBasicCardVendorQuery(),
            [CARD.HIPER]:      getBasicCardVendorQuery(),
            [CARD.ELO]:        getBasicCardVendorQuery(),
            [CARD.JCB]:        getBasicCardVendorQuery()
        };
    };

    const getPayPalQuery = () => {
        return {
            eligible:           types.boolean,
            vaultable:          types.boolean
        };
    };

    const getCardQuery = () => {
        return {
            eligible: types.boolean,
            branded:  types.boolean,
            vendors:  getVendorQuery()
        };
    };

    const fundingQuery = {
        [ FUNDING.PAYPAL ]:     getPayPalQuery(),
        [ FUNDING.CARD ]:       getCardQuery(),
        [ FUNDING.VENMO ]:      getBasicFundingEligibilityQuery(),
        [ FUNDING.ITAU ]:       getBasicFundingEligibilityQuery(),
        [ FUNDING.CREDIT ]:     getBasicFundingEligibilityQuery(),
        [ FUNDING.PAYLATER ]:   getBasicFundingEligibilityQuery(),
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
        [ FUNDING.BOLETO ]:     getBasicFundingEligibilityQuery()
    };

    const basicCardEligibility = basicFundingEligibility[FUNDING.CARD] && basicFundingEligibility[FUNDING.CARD].vendors;
    const vendorsQuery = fundingQuery[FUNDING.CARD].vendors;

    for (const card of values(CARD)) {
        if (basicCardEligibility && basicCardEligibility[card] && vendorsQuery[card]) {
            if (isDefined(basicCardEligibility[card].eligible)) {
                delete vendorsQuery[card].eligible;
            }

            // if (isDefined(basicCardEligibility[card].vaultable)) {
            //    delete vendorsQuery[card].vaultable;
            // }

            if (!Object.keys(vendorsQuery[card]).length) {
                delete vendorsQuery[card];
            }
        }
    }

    if (!Object.keys(vendorsQuery).length) {
        delete fundingQuery[FUNDING.CARD].vendors;
    }

    for (const fundingSource of values(FUNDING)) {
        if ([ FUNDING.VENMO, FUNDING.ITAU ].includes(fundingSource)) {
            if (basicFundingEligibility[fundingSource] && basicFundingEligibility[fundingSource].eligible) {
                delete fundingQuery[fundingSource].eligible;

                if (!Object.keys(fundingQuery[fundingSource]).length) {
                    delete fundingQuery[fundingSource];
                }
            }
            
            continue;
        }

        if (basicFundingEligibility[fundingSource] && fundingQuery[fundingSource]) {
            if (isDefined(basicFundingEligibility[fundingSource].eligible)) {
                delete fundingQuery[fundingSource].eligible;
            }

            // if (isDefined(basicFundingEligibility[fundingSource].vaultable)) {
            //    delete fundingQuery[fundingSource].vaultable;
            // }

            if (isDefined(basicFundingEligibility[fundingSource].branded) && !(merchantID && merchantID.length > 1)) {
                delete fundingQuery[fundingSource].branded;
            }

            if (!Object.keys(fundingQuery[fundingSource]).length) {
                delete fundingQuery[fundingSource];
            }
        }
    }

    return query('GetFundingEligibility', params(InputTypes, {
        fundingEligibility: params(Inputs, fundingQuery)
    }));
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
    basicFundingEligibility : FundingEligibilityType
|};

export async function resolveFundingEligibility(req : ExpressRequest, gqlBatch : GraphQLBatch, { logger, clientID, merchantID, buttonSessionID,
    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, basicFundingEligibility } : FundingEligibilityOptions) : Promise<FundingEligibilityType> {

    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';

        intent = intent ? intent.toUpperCase() : intent;
        // $FlowFixMe
        disableFunding = disableFunding ? disableFunding.map(source => source.toUpperCase()) : disableFunding;
        // $FlowFixMe
        disableCard = disableCard ? disableCard.map(source => source.toUpperCase()) : disableCard;

        const { fundingEligibility } = await gqlBatch({
            query:     buildFundingEligibilityQuery(basicFundingEligibility, merchantID),
            variables: {
                clientID, merchantID, buyerCountry, cookies, ip, currency, intent, commit,
                vault, disableFunding, disableCard, userAgent, buttonSessionID
            },
            accessToken: clientAccessToken
        });

        if (fundingEligibility && fundingEligibility.paypal && fundingEligibility.paypal.vaultable && basicFundingEligibility && basicFundingEligibility.paypal && !basicFundingEligibility.paypal.vaultable) {
            logger.info(req, 'paypal_basic_full_vaultable_mismatch', { basicFundingEligibility: JSON.stringify(basicFundingEligibility), fundingEligibility: JSON.stringify(fundingEligibility) });
        }

        return strictMerge(basicFundingEligibility, fundingEligibility, (first, second) => second);

    } catch (err) {
        logger.error(req, 'funding_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return basicFundingEligibility;
    }
}

/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY, COUNTRY, INTENT, FUNDING, CARD, type FundingEligibilityType } from '@paypal/sdk-constants/src';

import { HEADERS } from '../constants';

import { callGraphQL } from './api';

type GetFundingEligibilityOptions = {|
    accessToken? : string,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    currency : $Values<typeof CURRENCY>,
    buyerCountry : $Values<typeof COUNTRY>,
    intent : $Values<typeof INTENT>,
    commit : boolean,
    vault : boolean,
    disableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    disableCard : ?$ReadOnlyArray<$Values<typeof CARD>>
|};

export function getFundingEligibility(query : string, { accessToken, clientID, merchantID, currency, buyerCountry, intent, commit, vault, disableFunding, disableCard } : GetFundingEligibilityOptions) : ZalgoPromise<FundingEligibilityType> {
    return callGraphQL({
        name:  'GetFundingEligibility',
        query: `
            query GetFundingEligibility(
                $clientID:String,
                $merchantID:[ String ],
                $buyerCountry:CountryCodes,
                $currency:SupportedCountryCurrencies,
                $intent:FundingEligibilityIntent,
                $commit:Boolean,
                $vault:Boolean,
                $disableFunding:[ SupportedPaymentMethodsType ],
                $disableCard:[ SupportedCardsType ]
            ) {
            fundingEligibility(
                clientId: $clientID,
                buyerCountry: $buyerCountry,
                currency: $currency,
                intent: $intent,
                commit: $commit,
                vault: $vault,
                disableFunding: $disableFunding,
                disableCard: $disableCard,
                merchantId: $merchantID
            ) {
                ${ query }
            }
          }
        `,
        variables: {
            clientID,
            merchantID,
            buyerCountry,
            currency,
            commit,
            vault,
            intent:         intent ? intent.toUpperCase() : intent,
            disableFunding: disableFunding ? disableFunding.map(f => f && f.toUpperCase()) : disableFunding,
            disableCard:    disableCard ? disableCard.map(f => f && f.toUpperCase()) : disableCard
        },
        headers: {
            [ HEADERS.ACCESS_TOKEN ]: accessToken || ''
        }
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.fundingEligibility) {
            throw new Error(`GraphQL fundingEligibility returned no fundingEligibility object`);
        }
        return gqlResult && gqlResult.fundingEligibility;
    });
}

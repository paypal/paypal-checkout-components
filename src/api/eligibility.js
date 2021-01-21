/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY, COUNTRY, INTENT, FUNDING, CARD, PLATFORM, type FundingEligibilityType } from '@paypal/sdk-constants/src';
import { getUserAgent } from 'belter/src';

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

type NativeEligibilityOptions = {|
    clientID : ?string,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    vault : boolean,
    merchantID : string,
    buttonSessionID : string,
    shippingCallbackEnabled : boolean,
    platform : $Values<typeof PLATFORM>,
    cookies : string,
    orderID? : ?string,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>
|};

type NativeEligibility = {|
    [ $Values<typeof FUNDING> ] : ?{|
        eligibility : boolean
    |}
|};

export function getNativeEligibility({ vault, shippingCallbackEnabled, merchantID, clientID, buyerCountry, currency, buttonSessionID, cookies, orderID, enableFunding } : NativeEligibilityOptions) : ZalgoPromise<NativeEligibility> {
    const userAgent = getUserAgent();
    
    return callGraphQL({
        name:  'GetNativeEligibility',
        query: `
            query GetNativeEligibility(
                $vault : Boolean,
                $shippingCallbackEnabled : Boolean,
                $merchantID : String,
                $clientID : String,
                $buyerCountry : String,
                $currency : String,
                $userAgent : String,
                $buttonSessionID : String,
                $cookies : String,
                $orderID : String,
                $enableFunding : [String]
            ) {
                mobileSDKEligibility(
                    vault: $vault,
                    shippingCallbackEnabled: $shippingCallbackEnabled,
                    merchantID: $merchantID,
                    facilitatorClientID: $clientID,
                    buyerCountry: $buyerCountry,
                    currency: $currency,
                    userAgent: $userAgent,
                    buttonSessionID: $buttonSessionID,
                    cookies: $cookies,
                    token: $orderID,
                    enableFunding: $enableFunding
                ) {
                    paypal {
                        eligibility
                        ineligibilityReason
                    }
                    venmo {
                        eligibility
                        ineligibilityReason
                    }
                }
            }
        `,
        variables: {
            vault, shippingCallbackEnabled, merchantID, clientID,
            buyerCountry, currency, userAgent, buttonSessionID, cookies, orderID, enableFunding
        }
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.mobileSDKEligibility) {
            throw new Error(`GraphQL GetNativeEligibility returned no mobileSDKEligibility object`);
        }
        return gqlResult.mobileSDKEligibility;
    });
}

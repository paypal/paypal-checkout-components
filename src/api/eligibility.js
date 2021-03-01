/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { CURRENCY, COUNTRY, INTENT, LANG, FUNDING, CARD, PLATFORM, type FundingEligibilityType } from '@paypal/sdk-constants/src';
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
    buyerLanguage : $Values<typeof LANG>,
    currency : $Values<typeof CURRENCY>,
    vault : boolean,
    merchantID : string,
    buttonSessionID : string,
    shippingCallbackEnabled : boolean,
    platform : $Values<typeof PLATFORM>,
    cookies : string,
    orderID? : ?string,
    enableFunding : ?$ReadOnlyArray<$Values<typeof FUNDING>>,
    stickinessID : ?string,
    domain : string,
    skipElmo? : boolean
|};

export type NativeEligibility = {|
    [ $Values<typeof FUNDING> ] : ?{|
        eligibility : boolean,
        ineligibilityReason : string
    |}
|};

export function getNativeEligibility({ vault, shippingCallbackEnabled, merchantID, clientID, buyerCountry, buyerLanguage, currency, buttonSessionID, cookies, orderID, enableFunding, stickinessID, domain, skipElmo = false } : NativeEligibilityOptions) : ZalgoPromise<NativeEligibility> {
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
                $buyerLanguage : String,
                $currency : String,
                $userAgent : String,
                $buttonSessionID : String,
                $cookies : String,
                $orderID : String,
                $enableFunding : [String],
                $stickinessID : String,
                $domain : String,
                $skipElmo : Boolean
            ) {
                mobileSDKEligibility(
                    vault: $vault,
                    shippingCallbackEnabled: $shippingCallbackEnabled,
                    merchantID: $merchantID,
                    facilitatorClientID: $clientID,
                    buyerCountry: $buyerCountry,
                    buyerLanguage: $buyerLanguage,
                    currency: $currency,
                    userAgent: $userAgent,
                    buttonSessionID: $buttonSessionID,
                    cookies: $cookies,
                    token: $orderID,
                    enableFunding: $enableFunding,
                    stickinessID: $stickinessID,
                    domain: $domain,
                    skipElmo: $skipElmo
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
            buyerCountry, buyerLanguage, currency, userAgent, buttonSessionID,
            cookies, orderID, enableFunding, stickinessID, domain, skipElmo
        }
    }).then((gqlResult) => {
        if (!gqlResult || !gqlResult.mobileSDKEligibility) {
            throw new Error(`GraphQL GetNativeEligibility returned no mobileSDKEligibility object`);
        }
        return gqlResult.mobileSDKEligibility;
    });
}

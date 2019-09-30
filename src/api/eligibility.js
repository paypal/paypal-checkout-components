/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { COUNTRY, CURRENCY } from '@paypal/sdk-constants/src';

import { callGraphQL } from './api';

type NativeEligibilityProps = {|
    vault : boolean,
    shippingCallbackEnabled : boolean,
    merchantID : $ReadOnlyArray<string>,
    clientID : string,
    buyerCountry : $Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    userAgent : string,
    buttonSessionID : string
|};

export function getNativeEligibility({ vault, shippingCallbackEnabled, merchantID, clientID, buyerCountry, currency, userAgent, buttonSessionID } : NativeEligibilityProps) : ZalgoPromise<boolean> {
    return callGraphQL({
        query: `
            query NativeEligibility(
                $vault : Boolean,
                $shippingCallbackEnabled : Boolean,
                $merchantID : String,
                $facilitatorClientID : String,
                $buyerCountry : String,
                $currency : String,
                $userAgent : String,
                $buttonSessionID : String
            ) {
                mobileSDKEligibility(
                    vault: $vault,
                    shippingCallbackEnabled: $shippingCallbackEnabled,
                    merchantID: $merchantID,
                    facilitatorClientID: $facilitatorClientID,
                    buyerCountry: $buyerCountry,
                    currency: $currency,
                    userAgent: $userAgent,
                    buttonSessionID: $buttonSessionID
                )
            }
        `,
        variables: { vault, shippingCallbackEnabled, merchantID: merchantID[0], facilitatorClientID: clientID, buyerCountry, currency, userAgent, buttonSessionID }
    }).then(res => {
        return res.data.eligible;
    });
}

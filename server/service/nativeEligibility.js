/* @flow */

import { COUNTRY, CURRENCY, VAULT } from '@paypal/sdk-constants';

import type { GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';

const NATIVE_ELIGIBILITY_QUERY = `
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
        ) {
            eligible
        }
    }
`;

export type NativeEligibilityOptions = {|
    logger : LoggerType,
    clientID : string,
    buyerCountry : ?$Values<typeof COUNTRY>,
    currency : $Values<typeof CURRENCY>,
    vault : $Values<typeof VAULT>,
    merchantID : ?$ReadOnlyArray<string>,
    buttonSessionID : string,
    onShippingChange : boolean
|};

export async function resolveNativeEligibility(req : ExpressRequest, gqlBatch : GraphQLBatch, nativeEligibilityOptions : NativeEligibilityOptions) : Promise<boolean> {
    let { logger, clientID, merchantID, buttonSessionID, currency, vault, buyerCountry, onShippingChange } = nativeEligibilityOptions;

    try {
        const userAgent = req.get('user-agent') || '';
        const shippingCallbackEnabled = onShippingChange;
        
        const facilitatorClientID = clientID;
        merchantID = merchantID && merchantID[0];
        
        const result = await gqlBatch({
            query:     NATIVE_ELIGIBILITY_QUERY,
            variables: {
                vault, shippingCallbackEnabled, merchantID, facilitatorClientID, buyerCountry, currency, userAgent, buttonSessionID
            }
        });

        return result.mobileSDKEligibility.eligible;

    } catch (err) {
        logger.error(req, 'native_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return false;
    }

}

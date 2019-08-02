/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT } from '@paypal/sdk-constants';

import type { ExpressRequest, LocaleType, LoggerType } from '../types';

import type { FundingEligibility } from './fundingEligibility';

export type GetPersonalization = (ExpressRequest, {
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    tracking? : { [string] : string },
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>
}) => Promise<FundingEligibility>;

export type PersonalizationOptions = {|
    getPersonalization : GetPersonalization,
    logger : LoggerType,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    buttonSessionID : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>
|};

// eslint-disable-next-line flowtype/require-exact-type
export type Personalization = {
    tagline? : {|
        text : string
    |}
};

export async function resolvePersonalization(req : ExpressRequest, { getPersonalization, logger, clientID, merchantID, locale, buyerCountry, buttonSessionID, currency, intent, commit, vault } : PersonalizationOptions) : Promise<Personalization> {
            
    try {
        return await getPersonalization(req, {
            clientID,
            merchantID,
            locale,
            buyerCountry,
            currency,
            intent,
            commit,
            vault,
            tracking: {
                button_session_id: buttonSessionID
            }
        });

    } catch (err) {
        logger.error(req, 'personalization_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return {};
    }
}

/* @flow */

import { COUNTRY } from '@paypal/sdk-constants';

import type { ExpressRequest, FundingEligibility, LocaleType, LoggerType } from './types';

export type GetPersonalization = (ExpressRequest, {
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    tracking? : { [string] : string }
}) => Promise<FundingEligibility>;

export type PersonalizationOptions = {|
    getPersonalization : GetPersonalization,
    logger : LoggerType,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    buttonSessionID : string
|};

// eslint-disable-next-line flowtype/require-exact-type
export type Personalization = {
    tagline? : {|
        text : string
    |}
};

export async function resolvePersonalization(req : ExpressRequest, { getPersonalization, logger, clientID, merchantID, locale, buyerCountry, buttonSessionID } : PersonalizationOptions) : Promise<Personalization> {
            
    try {
        return await getPersonalization(req, {
            clientID,
            merchantID,
            locale,
            buyerCountry,
            tracking: {
                button_session_id: buttonSessionID
            }
        });

    } catch (err) {
        logger.error(req, 'personalization_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return {};
    }
}

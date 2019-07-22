/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';

import type { ExpressRequest, FundingEligibility, LoggerType } from './types';

export type GetFundingEligibility = (ExpressRequest, {
    clientId : string,
    merchantId : ?$ReadOnlyArray<string>,
    buyerCountry : ?$Values<typeof COUNTRY>,
    cookies : string,
    ip : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    disableFunding : $ReadOnlyArray<?$Values<typeof FUNDING>>,
    disableCard : $ReadOnlyArray<?$Values<typeof CARD>>,
    userAgent : string,
    buttonSessionId : string,
    clientAccessToken : ?string
}) => Promise<FundingEligibility>;

export type FundingEligibilityOptions = {|
    getFundingEligibility : GetFundingEligibility,
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
    defaultFundingEligibility : FundingEligibility
|};

export async function resolveFundingEligibility(req : ExpressRequest, { getFundingEligibility, logger, clientID, merchantID, buttonSessionID,
    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility } : FundingEligibilityOptions) : Promise<FundingEligibility> {
            
    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';
        const clientId = clientID;
        const merchantId = merchantID;
        const buttonSessionId = buttonSessionID;

        return await getFundingEligibility(req, {
            clientId, merchantId, buyerCountry, cookies, ip, currency, intent, commit,
            vault, disableFunding, disableCard, userAgent, buttonSessionId, clientAccessToken });

    } catch (err) {
        logger.error(req, 'funding_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return defaultFundingEligibility;
    }

}

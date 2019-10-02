/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT } from '@paypal/sdk-constants';

import type { GraphQLBatch } from '../lib';
import type { ExpressRequest, LocaleType, LoggerType } from '../types';

type Personalization = {|
    buttonText? : {|
        text : string,
        tracking : {|
            impression : string,
            click : string
        |}
    |},
    tagline? : {|
        text : string,
        tracking : {|
            impression : string,
            click : string
        |}
    |}
|};

const PERSONALIZATION_QUERY = `
    query GetPersonalization(
        $clientID: String,
        $buyerCountry: CountryCodes,
        $ip: String,
        $cookies: String,
        $currency: SupportedCountryCurrencies,
        $intent: FundingEligibilityIntent,
        $commit: Boolean,
        $vault: Boolean,
        $merchantID: [String],
        $buttonSessionID: String,
        $userAgent: String,
        $locale: LocaleInput!,
        $label: ButtonLabels,
        $period: String
    ) {
        checkoutCustomization(
            clientId: $clientID,
            merchantId: $merchantID,
            currency: $currency,
            commit: $commit,
            intent: $intent,
            vault: $vault,
            buyerCountry: $buyerCountry,
            ip: $ip,
            cookies: $cookies,
            buttonSessionId: $buttonSessionID,
            userAgent: $userAgent,
            locale: $locale,
            buttonLabel: $label,
            installmentPeriod: $period
        ) {
            tagline {
                text
                tracking {
                    impression
                    click
                }
            }
            buttonText {
                text
                tracking {
                    impression
                    click
                }
            }
        }
    }
`;

export type PersonalizationOptions = {|
    logger : LoggerType,
    clientID : string,
    merchantID : ?$ReadOnlyArray<string>,
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    buttonSessionID : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    label : string,
    period : ?number
|};

function getDefaultPersonalization() : Personalization {
    // $FlowFixMe
    return {};
}

export async function resolvePersonalization(req : ExpressRequest, gqlBatch : GraphQLBatch, personalizationOptions : PersonalizationOptions) : Promise<Personalization> {
    let { logger, clientID, merchantID, locale, buyerCountry, buttonSessionID, currency,
        intent, commit, vault, label, period } = personalizationOptions;

    const ip = req.ip;
    const cookies = req.get('cookie') || '';
    const userAgent = req.get('user-agent') || '';

    intent = intent ? intent.toUpperCase() : intent;
    label = label ? label.toUpperCase() : label;

    try {
        const result = await gqlBatch({
            query:     PERSONALIZATION_QUERY,
            variables: {
                clientID, merchantID, locale, buyerCountry, currency, intent, commit, vault, ip, cookies, userAgent,
                buttonSessionID, label, period
            }
        });

        return result.checkoutCustomization;

    } catch (err) {
        logger.error(req, 'personalization_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return getDefaultPersonalization();
    }
}

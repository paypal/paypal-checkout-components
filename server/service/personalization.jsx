/* @flow */
/** @jsx node */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, FUNDING, FPTI_KEY } from '@paypal/sdk-constants';
import type { FundingEligibilityType } from '@paypal/sdk-constants/src/types';
import type { ComponentFunctionType } from '@krakenjs/jsx-pragmatic/src';
import { node } from '@krakenjs/jsx-pragmatic';
import { LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos';

import { PERSONALIZATION_TIMEOUT, TIMEOUT_ERROR_MESSAGE, FPTI_STATE } from '../config';
import { placeholderToJSX, type GraphQLBatchCall } from '../lib';
import type { ExpressRequest, LocaleType, LoggerType } from '../types';

type PersonalizationComponentProps = {|
   logoColor : $Values<typeof LOGO_COLOR>,
   period : ?number
|};

type Personalization = {|
    buttonText? : {|
        text : string,
        Component : ?ComponentFunctionType<PersonalizationComponentProps>,
        tracking : {|
            impression : string,
            click : string
        |}
    |},
    tagline? : {|
        text : string,
        Component : ?ComponentFunctionType<PersonalizationComponentProps>,
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
        $period: String,
        $taglineEnabled: Boolean,
        $renderedButtons: [FundingButtonType]
        $layout: ButtonLayouts
        $buttonSize: ButtonSizes,
        $creditRiskVerified: Boolean
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
            installmentPeriod: $period,
            taglineEnabled: $taglineEnabled,
            renderedButtons: $renderedButtons
            layout: $layout
            buttonSize: $buttonSize,
            creditRiskVerified: $creditRiskVerified
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
            buttonDesign {
                id
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
    locale : LocaleType,
    buyerCountry : $Values<typeof COUNTRY>,
    buttonSessionID : string,
    currency : $Values<typeof CURRENCY>,
    intent : $Values<typeof INTENT>,
    commit : $Values<typeof COMMIT>,
    vault : $Values<typeof VAULT>,
    label : string,
    period : ?number,
    tagline? : boolean | string,
    personalizationEnabled : boolean,
    renderedButtons : $ReadOnlyArray<$Values<typeof FUNDING>>,
    layout? : string,
    buttonSize? : string,
    fundingEligibility : FundingEligibilityType
|};

function getDefaultPersonalization() : Personalization {
    // $FlowFixMe
    return {};
}

const CLASS = {
    TEXT: ('paypal-button-text' : 'paypal-button-text')
};

function contentToJSX(content : string) : ComponentFunctionType<PersonalizationComponentProps> {
    content = content.replace(/\{logo:/g, '{');

    return ({ logoColor, period } : PersonalizationComponentProps = {}) => {
        try {
            return placeholderToJSX(content, {
                text:   (token) => <span class={ CLASS.TEXT }>{token}</span>,
                pp:     () => <PPLogo logoColor={ logoColor } />,
                paypal: () => <PayPalLogo logoColor={ logoColor } />,
                br:     () => <br />,
                period: () => { return period ? period.toString() : null; }
            });
        } catch (err) {
            return null;
        }
    };
}

export async function resolvePersonalization(req : ExpressRequest, gqlBatch : GraphQLBatchCall, personalizationOptions : PersonalizationOptions) : Promise<Personalization> {
    let { logger, clientID, locale, buyerCountry, buttonSessionID, currency, intent, commit, vault, label,
        period, tagline, personalizationEnabled, renderedButtons, layout, buttonSize, fundingEligibility } = personalizationOptions;

    if (!personalizationEnabled) {
        return getDefaultPersonalization();
    }

    const ip = req.ip;
    const cookies = req.get('cookie') || '';
    const userAgent = req.get('user-agent') || '';
    const creditRiskVerified = fundingEligibility && fundingEligibility.credit?.eligible;

    intent = intent ? intent.toUpperCase() : intent;
    label = label ? label.toUpperCase() : label;

    const taglineEnabled = tagline === true || tagline === 'true';
    const personalizationVariables = {
        clientID,
        locale,
        buyerCountry,
        currency,
        intent,
        commit,
        vault,
        ip,
        cookies,
        userAgent,
        buttonSessionID,
        label,
        period,
        taglineEnabled,
        renderedButtons,
        layout,
        buttonSize,
        creditRiskVerified
    };

    // Fix enum checking errors for strings on graphql by only sending truthy variables
    for (const key of Object.keys(personalizationVariables)) {
        if (personalizationVariables[key] === '') {
            delete personalizationVariables[key];
        }
    }

    try {
        const result = await gqlBatch({
            query:     PERSONALIZATION_QUERY,
            variables: personalizationVariables,
            timeout:   PERSONALIZATION_TIMEOUT
        });

        const personalization = result.checkoutCustomization;

        if (personalization && personalization.tagline && personalization.tagline.text) {
            personalization.tagline.Component = contentToJSX(personalization.tagline.text);
        }

        if (personalization && personalization.buttonText && personalization.buttonText.text) {
            personalization.buttonText.Component = contentToJSX(personalization.buttonText.text);
        }

        return personalization;

    } catch (err) {
        if (err.message && err.message.includes(TIMEOUT_ERROR_MESSAGE)) {
            logger.track(req, {
                [FPTI_KEY.STATE]:        FPTI_STATE.BUTTON,
                [FPTI_KEY.TRANSITION]:   'personalization_promise_timeout',
                [FPTI_KEY.CONTEXT_ID]:   buttonSessionID,
                [FPTI_KEY.CONTEXT_TYPE]:    'button_session_id',
                [FPTI_KEY.FEED]:         'payments_sdk'
            }, {});
        }
        logger.error(req, 'personalization_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return getDefaultPersonalization();
    }
}

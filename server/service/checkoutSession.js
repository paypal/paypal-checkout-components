/* @flow */
import type { ExpressRequest, LoggerType } from '../types';
import { type GraphQLBatch } from '../lib';

export type CheckoutSessionOptions = {|
    logger : LoggerType,
    accessToken : string,
    orderID : string
|};

type FundingInstrumentType = {|
    id : string,
    name : string,
    issuerProductDescription : string,
    instrumentSubType : string,
    lastDigits : string,
    image : {|
        url : {|
            href : string
        |},
        width : string,
        height : string
    |}
|};

type FundingOptionType = {|
    id : string,
    fundingInstrument : FundingInstrumentType,
    isPreferred : boolean
|};

type CheckoutSession = {|
    declinedInstruments : [],
    fundingOptions : $ReadOnlyArray<FundingOptionType>
|};

const declineInstrumentSchema = `
    declinedInstruments {
        id
        declineType
        normalizedProcessorResponse
        lastDigits
        type
        name
        image {
            url {
                href
            }
            width
            height
        }
    }
`;

const fundingOptionsSchema = `
    fundingOptions(returnAllPlans: true, groupSourcesOnType: INCENTIVE) {
        id
        fundingInstrument {
            id
            name
            issuerProductDescription
            type
            instrumentSubType
            lastDigits
            image {
                url {
                    href
                }
                width
                height
            }
            isPreferred
        }
        allPlans {
            id
            fundingSources {
                fundingInstrument {
                    id
                    name
                    type
                    instrumentSubType
                    lastDigits
                }
                fundingMethodType
                delayedPaymentDate {
                    dateShort
                    d
                    y
                    M
                }
                amount {
                    currencyCode
                    currencyValue
                    currencyFormatSymbolISOCurrency
                    currencyFormat
                }
                groupedSources {
                    fundingInstrument {
                        id
                        name
                        type
                        label
                    }
                    amount {
                        currencyValue
                        currencyCode
                        currencyFormat
                    }
                }
            }
            isSelected
            backupFundingInstrument {
                id
                name
                lastDigits
            }
            currencyConversion {
                type
                isReadOnly
                from {
                    currencyValue
                    currencyFormatSymbolISOCurrency
                    currencyCode
                }
                to {
                    currencyValue
                    currencyFormatSymbolISOCurrency
                    currencyCode
                }
                convertedAmount {
                    currencyValue
                    currencyFormatSymbolISOCurrency
                    currencyCode
                    currencyFormat
                }
                rateFormatted
            }
            preAuthorizationData {
                authType
                amount {
                    currencyFormatSymbolISOCurrency
                }
            }
        }
    }
`;

const checkoutSessionQuery = `
    query CreateCheckoutSession($token: String!) {
        checkoutSession(token: $token) {
            ${ declineInstrumentSchema }
            ${ fundingOptionsSchema }
        }
    }
`;

export async function resolveCheckoutSession(req : ExpressRequest, gqlBatch : GraphQLBatch, { logger, accessToken, orderID } : CheckoutSessionOptions) : Promise<CheckoutSession> {
    try {
        const result = await gqlBatch({
            query:     checkoutSessionQuery,
            variables: {
                token: orderID
            },
            accessToken
        });
        
        const checkoutSession = result.checkoutSession;
        
        return checkoutSession;
        
    } catch (err) {
        logger.error(req, 'checkout_session_error', { err: err.stack ? err.stack : err.toString() });
        throw err;
    }
}

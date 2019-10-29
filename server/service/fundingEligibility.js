/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';
import { params, types, query } from 'typed-graphqlify';

import type { GraphQLBatch } from '../lib';
import type { ExpressRequest, LoggerType } from '../types';

export type FundingEligibility = {|
    paypal : {
        eligible : boolean,
        vaultable : boolean,
        vaultedInstruments : {
            id : string,
            label : {
                description : string
            }
        }
    },
    venmo : {
        eligible : boolean,
        vaultable : boolean
    },
    itau : {
        eligible : boolean,
        vaultable : boolean
    },
    credit : {
        eligible : boolean,
        vaultable : boolean
    },
    sepa : {
        eligible : boolean,
        vaultable : boolean
    },
    ideal : {
        eligible : boolean,
        vaultable : boolean
    },
    bancontact : {
        eligible : boolean,
        vaultable : boolean
    },
    giropay : {
        eligible : boolean,
        vaultable : boolean
    },
    eps : {
        eligible : boolean,
        vaultable : boolean
    },
    sofort : {
        eligible : boolean,
        vaultable : boolean
    },
    mybank : {
        eligible : boolean,
        vaultable : boolean
    },
    p24 : {
        eligible : boolean,
        vaultable : boolean
    },
    zimpler : {
        eligible : boolean,
        vaultable : boolean
    },
    wechatpay : {
        eligible : boolean,
        vaultable : boolean
    },
    payu : {
        eligible : boolean,
        vaultable : boolean
    },
    trustly : {
        eligible : boolean,
        vaultable : boolean
    },
    blik : {
        eligible : boolean,
        vaultable : boolean
    },
    oxxo : {
        eligible : boolean,
        vaultable : boolean
    },
    maxima : {
        eligible : boolean,
        vaultable : boolean
    },
    boleto : {
        eligible : boolean,
        vaultable : boolean
    },
    card : {
        eligible : boolean,
        branded : boolean,
        vendors : {
            visa : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            mastercard : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            amex : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            discover : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            hiper : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            elo : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            },
            jcb : {
                eligible : boolean,
                vaultable : boolean,
                vaultedInstruments : {
                    id : string,
                    label : {
                        description : string
                    }
                }
            }
        }
    }
|};

function buildFundingEligibilityQuery() : string {
    const InputTypes = {
        $clientID:        'String',
        $buyerCountry:    'CountryCodes',
        $ip:              'String',
        $cookies:         'String',
        $currency:        'SupportedCountryCurrencies',
        $intent:          'FundingEligibilityIntent',
        $commit:          'Boolean',
        $vault:           'Boolean',
        $disableFunding:  '[ SupportedPaymentMethodsType ]',
        $disableCard:     '[ SupportedCardsType ]',
        $merchantID:      '[ String ]',
        $buttonSessionID: 'String',
        $userAgent:       'String'
    };

    const Inputs = {
        clientId:        '$clientID',
        buyerCountry:    '$buyerCountry',
        ip:              '$ip',
        cookies:         '$cookies',
        currency:        '$currency',
        intent:          '$intent',
        commit:          '$commit',
        vault:           '$vault',
        disableFunding:  '$disableFunding',
        disableCard:     '$disableCard',
        merchantId:      '$merchantID',
        buttonSessionId: '$buttonSessionID',
        userAgent:       '$userAgent'
    };

    const VaultedInstrumentQuery = {
        id:    types.string,
        label: {
            description: types.string
        }
    };

    const BasicFundingEligibilityQuery = {
        eligible: types.boolean
    };

    const BasicCardVendorQuery = {
        eligible:           types.boolean,
        vaultable:          types.boolean,
        vaultedInstruments: VaultedInstrumentQuery
    };

    const Query = {
        [ FUNDING.PAYPAL ]: {
            eligible:           types.boolean,
            vaultable:          types.boolean,
            vaultedInstruments: VaultedInstrumentQuery
        },
        [ FUNDING.CARD ]: {
            eligible:  types.boolean,
            branded:   types.boolean,
            vendors:   {
                [ CARD.VISA ]:       BasicCardVendorQuery,
                [ CARD.MASTERCARD ]: BasicCardVendorQuery,
                [ CARD.AMEX ]:       BasicCardVendorQuery,
                [ CARD.DISCOVER ]:   BasicCardVendorQuery,
                [ CARD.HIPER ]:      BasicCardVendorQuery,
                [ CARD.ELO ]:        BasicCardVendorQuery,
                [ CARD.JCB ]:        BasicCardVendorQuery
            }
        },
        [ FUNDING.VENMO ]:      BasicFundingEligibilityQuery,
        [ FUNDING.ITAU ]:       BasicFundingEligibilityQuery,
        [ FUNDING.CREDIT ]:     BasicFundingEligibilityQuery,
        [ FUNDING.SEPA ]:       BasicFundingEligibilityQuery,
        [ FUNDING.IDEAL ]:      BasicFundingEligibilityQuery,
        [ FUNDING.BANCONTACT ]: BasicFundingEligibilityQuery,
        [ FUNDING.GIROPAY ]:    BasicFundingEligibilityQuery,
        [ FUNDING.EPS ]:        BasicFundingEligibilityQuery,
        [ FUNDING.SOFORT ]:     BasicFundingEligibilityQuery,
        [ FUNDING.MYBANK ]:     BasicFundingEligibilityQuery,
        [ FUNDING.P24 ]:        BasicFundingEligibilityQuery,
        [ FUNDING.ZIMPLER ]:    BasicFundingEligibilityQuery,
        [ FUNDING.WECHATPAY ]:  BasicFundingEligibilityQuery,
        [ FUNDING.PAYU ]:       BasicFundingEligibilityQuery,
        [ FUNDING.BLIK ]:       BasicFundingEligibilityQuery,
        [ FUNDING.TRUSTLY ]:    BasicFundingEligibilityQuery,
        [ FUNDING.OXXO ]:       BasicFundingEligibilityQuery,
        [ FUNDING.MAXIMA ]:     BasicFundingEligibilityQuery,
        [ FUNDING.BOLETO ]:     BasicFundingEligibilityQuery
    };

    return query('GetFundingEligibility', params(InputTypes, {
        fundingEligibility: params(Inputs, Query)
    }));
}

export type FundingEligibilityOptions = {|
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

export async function resolveFundingEligibility(req : ExpressRequest, gqlBatch : GraphQLBatch, { logger, clientID, merchantID, buttonSessionID,
    currency, intent, commit, vault, disableFunding, disableCard, clientAccessToken, buyerCountry, defaultFundingEligibility } : FundingEligibilityOptions) : Promise<FundingEligibility> {

    try {
        const ip = req.ip;
        const cookies = req.get('cookie') || '';
        const userAgent = req.get('user-agent') || '';

        intent = intent ? intent.toUpperCase() : intent;
        // $FlowFixMe
        disableFunding = disableFunding ? disableFunding.map(source => source.toUpperCase()) : disableFunding;
        // $FlowFixMe
        disableCard = disableCard ? disableCard.map(source => source.toUpperCase()) : disableCard;

        const result = await gqlBatch({
            query:     buildFundingEligibilityQuery(),
            variables: {
                clientID, merchantID, buyerCountry, cookies, ip, currency, intent, commit,
                vault, disableFunding, disableCard, userAgent, buttonSessionID
            },
            accessToken: clientAccessToken
        });

        return result.fundingEligibility;

    } catch (err) {
        logger.error(req, 'funding_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return defaultFundingEligibility;
    }

}

/* @flow */

import { COUNTRY, CURRENCY, INTENT, COMMIT, VAULT, CARD, FUNDING } from '@paypal/sdk-constants';

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

const FUNDING_ELIGIBILITY_QUERY = `
    query GetFundingEligibility(
        $clientID: String,
        $buyerCountry: CountryCodes,
        $ip: String,
        $cookies: String,
        $currency: SupportedCountryCurrencies,
        $intent: FundingEligibilityIntent,
        $commit: Boolean,
        $vault: Boolean,
        $disableFunding: [SupportedPaymentMethodsType],
        $disableCard: [SupportedCardsType],
        $merchantID: [String],
        $buttonSessionID: String,
        $userAgent: String
    ) {
        fundingEligibility(
            clientId: $clientID
            buyerCountry: $buyerCountry,
            ip: $ip,
            cookies: $cookies,
            currency: $currency,
            intent: $intent,
            commit: $commit,
            vault: $vault,
            disableFunding: $disableFunding,
            disableCard: $disableCard,
            merchantId: $merchantID,
            buttonSessionId: $buttonSessionID,
            userAgent: $userAgent
        ) {
            paypal {
                eligible
                vaultable
                vaultedInstruments {
                    id
                    label {
                        description
                    }
                }
            }
            venmo {
                eligible
                vaultable
            }
            itau {
                eligible
                vaultable
            }
            credit {
                eligible
                vaultable
            }
            sepa {
                eligible
                vaultable
            }
            ideal {
                eligible
                vaultable
            }
            bancontact {
                eligible
                vaultable
            }
            giropay {
                eligible
                vaultable
            }
            eps {
                eligible
                vaultable
            }
            sofort {
                eligible
                vaultable
            }
            mybank {
                eligible
                vaultable
            }
            p24 {
                eligible
                vaultable
            }
            zimpler {
                eligible
                vaultable
            }
            wechatpay {
                eligible
                vaultable
            }
            card {
                eligible
                branded
                vendors {
                    visa {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    mastercard {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    amex {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    discover {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    hiper {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    elo {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                    jcb {
                        eligible
                        vaultable
                        vaultedInstruments {
                            id
                            label {
                                description
                            }
                        }
                    }
                }
            }
        }
    }
`;

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

        // $FlowFixMe
        intent = intent ? intent.toUpperCase() : intent;
        // $FlowFixMe
        disableFunding = disableFunding ? disableFunding.map(source => source.toUpperCase()) : disableFunding;
        // $FlowFixMe
        disableCard = disableCard ? disableCard.map(source => source.toUpperCase()) : disableCard;

        const result = await gqlBatch({
            query:     FUNDING_ELIGIBILITY_QUERY,
            variables: {
                clientID, merchantID, buyerCountry, cookies, ip, currency, intent, commit,
                vault, disableFunding, disableCard, userAgent, buttonSessionID, clientAccessToken
            }
        });

        return result.fundingEligibility;

    } catch (err) {
        logger.error(req, 'funding_eligibility_error_fallback', { err: err.stack ? err.stack : err.toString() });
        return defaultFundingEligibility;
    }

}

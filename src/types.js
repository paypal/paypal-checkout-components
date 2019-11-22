/* @flow */

export const TYPES = true;

export type DimensionsType = {|
    width : number,
    height : number
|};

export type FundingEligibilityType = {|
    bancontact? : {
        eligible : boolean,
        branded : boolean
    },
    card : {
        eligible : boolean,
        branded : boolean,
        vendors : {
            visa? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            mastercard? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            amex? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            discover? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            hiper? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            elo? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            jcb? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            },
            cup? : {
                eligible : boolean,
                vaultable? : ?boolean,
                vaultedInstruments ? : $ReadOnlyArray<{
                    id : string,
                    label : {
                        description : string
                    }
                }>
            }
        }
    },
    credit? : {
        eligible : boolean,
        branded : boolean
    },
    sepa? : {
        eligible : boolean,
        branded : boolean
    },
    eps? : {
        eligible : boolean,
        branded : boolean
    },
    giropay? : {
        eligible : boolean,
        branded : boolean
    },
    ideal? : {
        eligible : boolean,
        branded : boolean
    },
    mybank? : {
        eligible : boolean,
        branded : boolean
    },
    p24? : {
        eligible : boolean,
        branded : boolean
    },
    paypal? : {
        eligible : boolean,
        branded : boolean,
        vaultable? : ?boolean,
        vaultedInstruments? : $ReadOnlyArray<{
            id : string,
            label : {
                description : string
            }
        }>
    },
    sofort? : {
        eligible : boolean,
        branded : boolean
    },
    venmo? : {
        eligible : boolean,
        branded : boolean
    },
    wechatpay? : {
        eligible : boolean,
        branded : boolean
    },
    zimpler? : {
        eligible : boolean,
        branded : boolean
    },
    itau? : {
        eligible : boolean,
        branded : boolean
    },
    payu? : {
        eligible : boolean,
        branded : boolean
    },
    verkkopankki? : {
        eligible : boolean,
        branded : boolean
    },
    blik? : {
        eligible : boolean,
        branded : boolean
    },
    boleto? : {
        eligible : boolean,
        branded : boolean
    },
    maxima? : {
        eligible : boolean,
        branded : boolean
    },
    oxxo? : {
        eligible : boolean,
        branded : boolean
    },
    trustly? : {
        eligible : boolean,
        branded : boolean
    }
|};

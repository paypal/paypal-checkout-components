/* @flow */

export type DimensionsType = {
    width : number,
    height : number
};

export type FundingEligibilityType = {
    bancontact : {
        eligible : boolean
    },
    card : {
        eligible : boolean,
        isPayPalBranded : boolean,
        vendors : {
            visa : {
                eligible : boolean
            },
            mastercard : {
                eligible : boolean
            },
            amex : {
                eligible : boolean
            },
            discover : {
                eligible : boolean
            },
            hiper : {
                eligible : boolean
            },
            elo : {
                eligible : boolean
            },
            jcb : {
                eligible : boolean
            }
        }
    },
    credit : {
        eligible : boolean
    },
    sepa : {
        eligible : boolean
    },
    eps : {
        eligible : boolean
    },
    giropay : {
        eligible : boolean
    },
    ideal : {
        eligible : boolean
    },
    mybank : {
        eligible : boolean
    },
    p24 : {
        eligible : boolean
    },
    paypal : {
        eligible : boolean
    },
    sofort : {
        eligible : boolean
    },
    venmo : {
        eligible : boolean
    },
    wechatpay : {
        eligible : boolean
    },
    zimpler : {
        eligible : boolean
    }
};

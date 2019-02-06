/* @flow */

export const TYPES = true;

export type DimensionsType = {|
    width : number,
    height : number
|};

export type FundingEligibilityType = {|
    bancontact : {
        eligible : boolean,
        branded : boolean
    },
    card : {
        eligible : boolean,
        branded : boolean,
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
            },
            cup : {
                eligible : boolean
            }
        }
    },
    credit : {
        eligible : boolean,
        branded : boolean
    },
    sepa : {
        eligible : boolean,
        branded : boolean
    },
    eps : {
        eligible : boolean,
        branded : boolean
    },
    giropay : {
        eligible : boolean,
        branded : boolean
    },
    ideal : {
        eligible : boolean,
        branded : boolean
    },
    mybank : {
        eligible : boolean,
        branded : boolean
    },
    p24 : {
        eligible : boolean,
        branded : boolean
    },
    paypal : {
        eligible : boolean,
        branded : boolean
    },
    sofort : {
        eligible : boolean,
        branded : boolean
    },
    venmo : {
        eligible : boolean,
        branded : boolean
    },
    wechatpay : {
        eligible : boolean,
        branded : boolean
    },
    zimpler : {
        eligible : boolean,
        branded : boolean
    }
|};

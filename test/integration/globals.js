/* @flow */

window.__TEST_PERSONALIZATIONS__ = {
    tagline: {
        treatments: {
            '["AND", ["EQ", "timeOfDay", "afternoon"], ["EQ", "age", 40]]': {
                tag0: 0.93,
                tag1: 0.05,
                tag2: 0.02
            },
            '["AND", ["EQ", "timeOfDay", "evening"], ["EQ", "timezone", "Eastern"]]': {
                tag0: 0.86,
                tag1: 0.1,
                tag2: 0.04
            },
            '["TRUE"]': {
                tag0: 0.34,
                tag1: 0.33,
                tag2: 0.33
            }
        },
        tracking:   {
            context:   '',
            treatment: '',
            metric:    ''
        }
    },
    buttonText:         null,
    buttonAnimation:    null
};

window.__TEST_FUNDING_ELIGIBILITY__ = {
    bancontact: {
        eligible: false
    },
    card: {
        eligible:        true,
        isPayPalBranded: true,

        vendors: {
            visa: {
                eligible: true
            },
            mastercard: {
                eligible: true
            },
            amex: {
                eligible: true
            },
            discover: {
                eligible: true
            },
            hiper: {
                eligible: false
            },
            elo: {
                eligible: false
            },
            jcb: {
                eligible: false
            }
        }
    },
    credit: {
        eligible: false
    },
    paylater: {
        eligible: false
    },
    sepa: {
        eligible: false
    },
    eps: {
        eligible: false
    },
    giropay: {
        eligible: false
    },
    ideal: {
        eligible: false
    },
    mybank: {
        eligible: false
    },
    p24: {
        eligible: false
    },
    paypal: {
        eligible: true
    },
    sofort: {
        eligible: false
    },
    venmo: {
        eligible: false
    },
    wechatpay: {
        eligible: false
    },
    oxxo: {
        eligible: false
    },
    boleto: {
        eligible: false
    },
    maxima: {
        eligible: false
    },
    zimpler: {
        eligible: false
    },
    payu: {
        eligible: false
    },
    verkkopankki: {
        eligible: false
    },
    blik: {
        eligible: false
    },
    trustly: {
        eligible: false
    },
    mercadopago: {
        eligible: false
    },
    itau: {
        eligible: false
    },
    applepay: {
        eligible: true
    }
};

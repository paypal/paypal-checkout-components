/* @flow */

window.__TEST_INLINE_CHECKOUT_ELIGIBILITY = {
    eligible:            true,
    ineligibilityReason: ''
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
    multibanco: {
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

/* @flow */

window.__TEST_LOCALE_COUNTRY__ = 'US';
window.__TEST_LOCALE_LANG__ = 'en';

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
    zimpler: {
        eligible: false
    }
};

window.__TEST_REMEMBERED_FUNDING__ = [];

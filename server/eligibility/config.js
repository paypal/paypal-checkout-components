/* @flow */

import { FUNDING, COUNTRY, CARD, INTENT, COMMIT, VAULT } from 'paypal-sdk-constants';

export const FUNDING_CONFIG = {

    [ FUNDING.PAYPAL ]: {
        enabled: true,

        allowOptOut: false,

        intent:  [ INTENT.CAPTURE, INTENT.AUTHORIZE, INTENT.ORDER ],
        commit:  [ COMMIT.TRUE, COMMIT.FALSE ],
        vault:   [ VAULT.TRUE, VAULT.FALSE ]
    },

    [ FUNDING.CARD ]: {
        enabled: true,

        allowOptOut: true,

        intent:  [ INTENT.CAPTURE, INTENT.AUTHORIZE, INTENT.ORDER ],
        commit:  [ COMMIT.TRUE, COMMIT.FALSE ],
        vault:   [ VAULT.TRUE, VAULT.FALSE ]
    },

    [ FUNDING.VENMO ]: {
        enabled: true,

        countries: [
            COUNTRY.US
        ],

        allowOptOut: false,

        intent:  [ INTENT.CAPTURE, INTENT.AUTHORIZE ],
        commit:  [ COMMIT.TRUE, COMMIT.FALSE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.CREDIT ]: {
        enabled: true,

        allowOptOut: false,

        countries: [
            COUNTRY.US,
            COUNTRY.GB,
            COUNTRY.DE
        ],

        intent:  [ INTENT.CAPTURE, INTENT.AUTHORIZE, INTENT.ORDER ],
        commit:  [ COMMIT.TRUE, COMMIT.FALSE ],
        vault:   [ VAULT.TRUE, VAULT.FALSE ]
    },

    [ FUNDING.IDEAL ]: {
        enabled: true,

        allowOptOut: true,

        countries: [
            COUNTRY.NL
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.SEPA ]: {
        enabled: true,

        allowOptOut: true,

        countries: [
            COUNTRY.DE
        ],

        intent:  [ INTENT.CAPTURE, INTENT.AUTHORIZE, INTENT.ORDER ],
        commit:  [ COMMIT.TRUE, COMMIT.FALSE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.BANCONTACT ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.BE
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.GIROPAY ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.DE
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.SOFORT ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.DE,
            COUNTRY.AT,
            COUNTRY.BE,
            COUNTRY.ES,
            COUNTRY.IT,
            COUNTRY.NL
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.EPS ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.AT
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.MYBANK ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.IT
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.P24 ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.PL
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.ZIMPLER ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.FI
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    },

    [ FUNDING.WECHATPAY ]: {
        enabled: false,

        allowOptOut: true,

        countries: [
            COUNTRY.CN
        ],

        intent:  [ INTENT.CAPTURE ],
        commit:  [ COMMIT.TRUE ],
        vault:   [ VAULT.FALSE ]
    }
};


export const CARD_CONFIG = {

    default: [
        CARD.VISA,
        CARD.MASTERCARD,
        CARD.AMEX
    ],

    [ COUNTRY.US ]: [
        CARD.VISA,
        CARD.MASTERCARD,
        CARD.AMEX,
        CARD.DISCOVER
    ],

    [ COUNTRY.BR ]: [
        CARD.VISA,
        CARD.MASTERCARD,
        CARD.AMEX,
        CARD.HIPER,
        CARD.ELO
    ],

    [ COUNTRY.JP ]: [
        CARD.VISA,
        CARD.MASTERCARD,
        CARD.AMEX,
        CARD.JCB
    ]
};

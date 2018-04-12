/* @flow */

import { FUNDING, COUNTRY, CARD, PLATFORM, DEFAULT } from '../constants';

export const FUNDING_PRIORITY = [
    FUNDING.PAYPAL,
    FUNDING.VENMO,
    FUNDING.CREDIT,
    FUNDING.IDEAL,
    FUNDING.ELV,
    FUNDING.BANCONTACT,
    FUNDING.GIROPAY,
    FUNDING.EPS,
    FUNDING.MYBANK,
    FUNDING.CARD
];

export const FUNDING_CONFIG = {

    [ DEFAULT ]: {
        enabled: true,

        allowOptIn:    true,
        allowOptOut:   true,
        allowRemember: true,

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: false
    },

    [ FUNDING.PAYPAL ]: {
        default: true,

        allowOptIn:  false,
        allowOptOut: false,

        allowHorizontal: true,
        allowVertical:   true
    },

    [ FUNDING.CARD ]: {
        default: true,

        allowHorizontal: false,
        allowVertical:   true
    },

    [ FUNDING.VENMO ]: {
        allowOptOut:      false,
        allowedCountries: [
            COUNTRY.US
        ],

        allowHorizontal: true,
        allowVertical:   true
    },

    [ FUNDING.CREDIT ]: {
        allowedCountries: [
            COUNTRY.US,
            COUNTRY.GB,
            COUNTRY.DE
        ],
        defaultVerticalCountries: [
            COUNTRY.US
        ],
        platforms: [
            PLATFORM.MOBILE
        ],

        allowHorizontal: true,
        allowVertical:   true
    },

    [ FUNDING.IDEAL ]: {
        allowedCountries: [
            COUNTRY.NL
        ],

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: true
    },

    [ FUNDING.ELV ]: {
        allowedCountries: [
            COUNTRY.DE,
            COUNTRY.AT
        ],
        defaultVerticalCountries: [
            COUNTRY.DE,
            COUNTRY.AT
        ],

        allowHorizontal: true,
        allowVertical:   true
    },

    [ FUNDING.BANCONTACT ]: {
        allowedCountries: [
            COUNTRY.BE
        ],

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: true
    },

    [ FUNDING.GIROPAY ]: {
        allowedCountries: [
            COUNTRY.DE
        ],

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: true
    },

    [ FUNDING.EPS ]: {
        allowedCountries: [
            COUNTRY.AT
        ],

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: true
    },

    [ FUNDING.MYBANK ]: {
        allowedCountries: [
            COUNTRY.IT
        ],

        allowHorizontal: true,
        allowVertical:   true,

        requireCommitAsTrue: true
    }
};

export const CARD_CONFIG = {

    [ DEFAULT ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX
        ]
    },

    [ COUNTRY.US ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.DISCOVER
        ]
    },

    [ COUNTRY.BR ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.HIPER,
            CARD.ELO
        ]
    },

    [ COUNTRY.JP ]: {
        priority: [
            CARD.VISA,
            CARD.MASTERCARD,
            CARD.AMEX,
            CARD.JCB
        ]
    }
};

function getConfig<T : mixed>(conf : Object, category : string, key : string, def : ?T) : T {
    let categoryConfig = conf[category];

    if (categoryConfig && categoryConfig.hasOwnProperty(key)) {
        return categoryConfig[key];
    }

    if (conf[DEFAULT] && conf[DEFAULT].hasOwnProperty(key)) {
        return conf[DEFAULT][key];
    }

    if (arguments.length >= 4) {
        // $FlowFixMe
        return def;
    }

    throw new Error(`No value found for ${ category }:${ key }`);
}

export function getFundingConfig<T : mixed>(source : string, key : string, def : ?T) : T {
    return getConfig(FUNDING_CONFIG, source, key, def);
}

export function getCardConfig<T : mixed>(source : string, key : string, def : ?T) : T {
    return getConfig(CARD_CONFIG, source, key, def);
}

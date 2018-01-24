/* @flow */

export const FUNDING = {
    PAYPAL: 'paypal',
    VENMO:  'venmo',
    CREDIT: 'credit',
    CARD:   'card',
    IDEAL:  'ideal',
    ELV:    'elv'
};

export const CARD = {
    VISA:        'visa',
    MASTERCARD:  'mastercard',
    AMEX:        'amex',
    DISCOVER:    'discover',
    SWITCH:      'switch',
    MAESTRO:     'maestro',
    HIPER:       'hiper',
    ELO:         'elo',
    JCB:         'jcb',
    CUP:         'cup',
    COFINOGA:    'cofinoga',
    COFIDIS:     'cofidis',
    CETELEM:     'cetelem',
    CBNATIONALE: 'cbnationale'
};

export const CARD_PRIORITY = [
    CARD.VISA,
    CARD.MASTERCARD,
    CARD.AMEX,
    CARD.DISCOVER,
    CARD.SWITCH,
    CARD.MAESTRO,
    CARD.HIPER,
    CARD.ELO,
    CARD.JCB,
    CARD.CUP,
    CARD.COFINOGA,
    CARD.COFIDIS,
    CARD.CETELEM,
    CARD.CBNATIONALE
];

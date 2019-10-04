/* @flow */

export const FUNDING = {
    PAYPAL:       'paypal',
    VENMO:        'venmo',
    ITAU:         'itau',
    CREDIT:       'credit',
    CARD:         'card',
    IDEAL:        'ideal',
    ELV:          'elv',
    BANCONTACT:   'bancontact',
    GIROPAY:      'giropay',
    SOFORT:       'sofort',
    EPS:          'eps',
    MYBANK:       'mybank',
    P24:          'p24',
    ZIMPLER:      'zimpler',
    PAYU:         'payu',
    VERKKOPANKKI: 'verkkopankki',
    BLIK:         'blik',
    TRUSTLY:      'trustly',
    MAXIMA:       'maxima',
    BOLETO:       'boleto',
    OXXO:         'oxxo'
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

export const FUNDING_ELIGIBILITY_REASON = {
    PRIMARY:              'The funding source is the primary source',
    NOT_ENABLED:          'The funding source is not currently enabled for use',
    SECONDARY_DISALLOWED: 'The funding source is disallowed as a secondary button',
    OPT_OUT:              'The funding source was disallowed in funding.disallowed',
    OPT_IN:               'The funding source was allowed in funding.allowed',
    DISALLOWED_COUNTRY:   'The funding source is not enabled for the current locale',
    DEFAULT_COUNTRY:      'The funding source is enabled by default for the current locale',
    DEFAULT:              'The funding source is enabled by default for all users',
    REMEMBERED:           'The funding source was remembered for the current user',
    NEED_OPT_IN:          'The funding source needs to be allowed in funding.allowed',
    COMMIT_NOT_SET:       'The funding source is not enabled when commit is not set as true',
    INVALID_ENV:          'The funding source is not supported in this environment'
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

/* @flow */

export const ENV = {
    LOCAL:      'local',
    STAGE:      'stage',
    SANDBOX:    'sandbox',
    PRODUCTION: 'production',
    TEST:       'test',
    DEMO:       'demo'
};


export const USERS = {
    ALL:        'all',
    REMEMBERED: 'remembered'
};

export const SOURCE = {
    MANUAL:         'manual',
    BUTTON_FACTORY: 'button_factory'
};

export const LOG_LEVEL = {
    DEBUG: 'debug',
    INFO:  'info',
    WARN:  'warn',
    ERROR: 'error'
};

export const PAYMENT_TYPE = {
    EC_TOKEN: 'ec_token',
    BA_TOKEN: 'ba_token',
    PAY_ID:   'pay_id'
};

export const FPTI = {

    KEY: {
        FEED:               'feed_name',
        STATE:              'state_name',
        TRANSITION:         'transition_name',
        BUTTON_TYPE:        'button_type',
        SESSION_UID:        'page_session_id',
        BUTTON_SESSION_UID: 'button_session_id',
        TOKEN:              'token',
        CONTEXT_ID:         'context_id',
        CONTEXT_TYPE:       'context_type',
        REFERER:            'referer_url',
        PAY_ID:             'pay_id',
        SELLER_ID:          'seller_id',
        DATA_SOURCE:        'serverside_data_source',
        BUTTON_SOURCE:      'button_source',
        ERROR_CODE:         'ext_error_code',
        ERROR_DESC:         'ext_error_desc',
        PAGE_LOAD_TIME:     'page_load_time',
        EXPERIMENT_NAME:    'pxp_exp_id',
        TREATMENT_NAME:     'pxp_trtmnt_id',
        TRANSITION_TIME:    'transition_time',
        FUNDING_LIST:       'eligible_payment_methods',
        FUNDING_COUNT:      'eligible_payment_count',
        CHOSEN_FUNDING:     'selected_payment_method',
        BUTTON_LAYOUT:      'button_layout',
        VERSION:            'checkoutjs_version'
    },

    BUTTON_TYPE: {
        IFRAME: 'iframe',
        HTML:   'html',
        CUSTOM: 'custom'
    },

    DATA_SOURCE: {
        CHECKOUT: 'checkout'
    },

    CONTEXT_TYPE: {
        BUTTON_SESSION_ID:         'button_session_id',
        [ PAYMENT_TYPE.PAY_ID ]:   'Pay-ID',
        [ PAYMENT_TYPE.EC_TOKEN ]: 'EC-Token',
        [ PAYMENT_TYPE.BA_TOKEN ]: 'EC-Token'
    },

    FEED: {
        CHECKOUTJS: 'checkoutjs'
    },

    STATE: {
        LOAD:     'checkoutjs_load',
        BUTTON:   'checkoutjs_button',
        CHECKOUT: 'checkoutjs_checkout',
        PPTM:     'checkoutjs_pptm'
    },

    TRANSITION: {
        SCRIPT_LOAD: 'process_script_load',

        BUTTON_RENDER:   'process_button_render',
        BUTTON_LOAD:     'process_button_load',
        BUTTON_CLICK:    'process_button_click',

        CREATE_PAYMENT:  'process_create_payment',
        RECIEVE_PAYMENT: 'process_recieve_payment',

        CHECKOUT_INIT:      'process_checkout_init',
        CHECKOUT_AUTHORIZE: 'process_checkout_authorize',
        CHECKOUT_CANCEL:    'process_checkout_cancel',
        CHECKOUT_ERROR:     'process_checkout_error',

        EXTERNAL_EXPERIMENT:          'process_external_experiment',
        EXTERNAL_EXPERIMENT_COMPLETE: 'process_external_experiment_complete',

        PPTM_LOAD:   'process_pptm_load',
        PPTM_LOADED: 'process_pptm_loaded'
    }
};

export const PPTM_ID = 'xo-pptm';

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

export const ATTRIBUTE = {
    BUTTON:         'data-button',
    FUNDING_SOURCE: 'data-funding-source',
    CARD:           'data-card',
    VERSION:        'data-version'
};

export const PLATFORM = {
    DESKTOP: 'desktop',
    MOBILE:  'mobile'
};

export const COUNTRY = {
    AD: 'AD',
    AE: 'AE',
    AG: 'AG',
    AI: 'AI',
    AL: 'AL',
    AM: 'AM',
    AN: 'AN',
    AO: 'AO',
    AR: 'AR',
    AT: 'AT',
    AU: 'AU',
    AW: 'AW',
    AZ: 'AZ',
    BA: 'BA',
    BB: 'BB',
    BE: 'BE',
    BF: 'BF',
    BG: 'BG',
    BH: 'BH',
    BI: 'BI',
    BJ: 'BJ',
    BM: 'BM',
    BN: 'BN',
    BO: 'BO',
    BR: 'BR',
    BS: 'BS',
    BT: 'BT',
    BW: 'BW',
    BY: 'BY',
    BZ: 'BZ',
    C2: 'C2',
    CA: 'CA',
    CD: 'CD',
    CG: 'CG',
    CH: 'CH',
    CI: 'CI',
    CK: 'CK',
    CL: 'CL',
    CM: 'CM',
    CN: 'CN',
    CO: 'CO',
    CR: 'CR',
    CV: 'CV',
    CY: 'CY',
    CZ: 'CZ',
    DE: 'DE',
    DJ: 'DJ',
    DK: 'DK',
    DM: 'DM',
    DO: 'DO',
    DZ: 'DZ',
    EC: 'EC',
    EE: 'EE',
    EG: 'EG',
    ER: 'ER',
    ES: 'ES',
    ET: 'ET',
    FI: 'FI',
    FJ: 'FJ',
    FK: 'FK',
    FM: 'FM',
    FO: 'FO',
    FR: 'FR',
    GA: 'GA',
    GB: 'GB',
    GD: 'GD',
    GE: 'GE',
    GF: 'GF',
    GI: 'GI',
    GL: 'GL',
    GM: 'GM',
    GN: 'GN',
    GP: 'GP',
    GR: 'GR',
    GT: 'GT',
    GW: 'GW',
    GY: 'GY',
    HK: 'HK',
    HN: 'HN',
    HR: 'HR',
    HU: 'HU',
    ID: 'ID',
    IE: 'IE',
    IL: 'IL',
    IN: 'IN',
    IS: 'IS',
    IT: 'IT',
    JM: 'JM',
    JO: 'JO',
    JP: 'JP',
    KE: 'KE',
    KG: 'KG',
    KH: 'KH',
    KI: 'KI',
    KM: 'KM',
    KN: 'KN',
    KR: 'KR',
    KW: 'KW',
    KY: 'KY',
    KZ: 'KZ',
    LA: 'LA',
    LC: 'LC',
    LI: 'LI',
    LK: 'LK',
    LS: 'LS',
    LT: 'LT',
    LU: 'LU',
    LV: 'LV',
    MA: 'MA',
    MC: 'MC',
    MD: 'MD',
    ME: 'ME',
    MG: 'MG',
    MH: 'MH',
    MK: 'MK',
    ML: 'ML',
    MN: 'MN',
    MQ: 'MQ',
    MR: 'MR',
    MS: 'MS',
    MT: 'MT',
    MU: 'MU',
    MV: 'MV',
    MW: 'MW',
    MX: 'MX',
    MY: 'MY',
    MZ: 'MZ',
    NA: 'NA',
    NC: 'NC',
    NE: 'NE',
    NF: 'NF',
    NG: 'NG',
    NI: 'NI',
    NL: 'NL',
    NO: 'NO',
    NP: 'NP',
    NR: 'NR',
    NU: 'NU',
    NZ: 'NZ',
    OM: 'OM',
    PA: 'PA',
    PE: 'PE',
    PF: 'PF',
    PG: 'PG',
    PH: 'PH',
    PL: 'PL',
    PM: 'PM',
    PN: 'PN',
    PT: 'PT',
    PW: 'PW',
    PY: 'PY',
    QA: 'QA',
    RE: 'RE',
    RO: 'RO',
    RS: 'RS',
    RU: 'RU',
    RW: 'RW',
    SA: 'SA',
    SB: 'SB',
    SC: 'SC',
    SE: 'SE',
    SG: 'SG',
    SH: 'SH',
    SI: 'SI',
    SJ: 'SJ',
    SK: 'SK',
    SL: 'SL',
    SM: 'SM',
    SN: 'SN',
    SO: 'SO',
    SR: 'SR',
    ST: 'ST',
    SV: 'SV',
    SZ: 'SZ',
    TC: 'TC',
    TD: 'TD',
    TG: 'TG',
    TH: 'TH',
    TJ: 'TJ',
    TM: 'TM',
    TN: 'TN',
    TO: 'TO',
    TR: 'TR',
    TT: 'TT',
    TV: 'TV',
    TW: 'TW',
    TZ: 'TZ',
    UA: 'UA',
    UG: 'UG',
    US: 'US',
    UY: 'UY',
    VA: 'VA',
    VC: 'VC',
    VE: 'VE',
    VG: 'VG',
    VN: 'VN',
    VU: 'VU',
    WF: 'WF',
    WS: 'WS',
    YE: 'YE',
    YT: 'YT',
    ZA: 'ZA',
    ZM: 'ZM',
    ZW: 'ZW'
};

export const LANG = {
    EN: 'en',
    FR: 'fr',
    ES: 'es',
    ZH: 'zh',
    AR: 'ar',
    DE: 'de',
    NL: 'nl',
    PT: 'pt',
    DA: 'da',
    RU: 'ru',
    ID: 'id',
    HE: 'he',
    IT: 'it',
    JA: 'ja',
    KO: 'ko',
    NO: 'no',
    PL: 'pl',
    SV: 'sv',
    TH: 'th',
    TR: 'tr'
};

export const LANG_TO_DEFAULT_COUNTRY = {
    [LANG.EN]: COUNTRY.US,
    [LANG.FR]: COUNTRY.FR,
    [LANG.ES]: COUNTRY.ES,
    [LANG.ZH]: COUNTRY.CN,
    [LANG.DE]: COUNTRY.DE,
    [LANG.NL]: COUNTRY.NL,
    [LANG.PT]: COUNTRY.PT,
    [LANG.DA]: COUNTRY.DK,
    [LANG.RU]: COUNTRY.RU,
    [LANG.ID]: COUNTRY.ID,
    [LANG.HE]: COUNTRY.IL,
    [LANG.IT]: COUNTRY.IT,
    [LANG.JA]: COUNTRY.JP,
    [LANG.KO]: COUNTRY.KR,
    [LANG.NO]: COUNTRY.NO,
    [LANG.PL]: COUNTRY.PL,
    [LANG.SV]: COUNTRY.SE,
    [LANG.TH]: COUNTRY.TH,
    [LANG.TR]: COUNTRY.TR
};


export let buttonConfig = {

    default: {
        colors: [ 'gold', 'blue', 'silver' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],

        logoColors:  {
            gold:   'blue',
            silver: 'blue',
            blue:   'white',
            black: 'white',
            creditblue: 'white'
        },

        defaultTagLineColors:  {
            gold:   'blue',
            silver: 'blue',
            blue:   'blue',
            black: 'black',
            creditblue: 'blue'
        },

        defaultLocale: 'en_US',
        defaultLabel:        'checkout',
        defaultColor:        'gold',
        defaultSize:         'small',
        defaultShape:        'pill',
        defaultBranding:     true,
        defaultFundingIcons: false,
        defaultTagLineColor: 'blue',

        allowUnbranded: false,
        allowFundingIcons: true
    },

    checkout: {
        tagline: true,
        tagkey:  'safer_tag',

        sizes:  [ 'tiny', 'small', 'medium', 'large', 'responsive' ]
    },

    pay: {
        tagline: false,
        colors: [ 'gold', 'blue', 'silver', 'black']
    },

    credit: {
        label: '${pp}${paypal} ${credit}',

        tagline: true,
        tagkey:  'later_tag',

        colors: [ 'creditblue','black'],

        allowFundingIcons: false,

        defaultColor: 'creditblue'
    },

    buynow: {
        tagline: true,
        tagkey:  'safer_tag',

        defaultBranding:     undefined,
        defaultFundingIcons: true,

        allowUnbranded: true
    },

    generic: {
        tagline: true,
        tagkey: 'safer_tag',
        label: '${pp}${paypal}'

    },

    dual: {
        tagline: true,
        tagkey: 'dual_tag',
        label: '${pp}${paypal}'
    }
};

export function getButtonConfig(type : string, key : string) : mixed {
    let config = buttonConfig[type];

    if (config.hasOwnProperty(key)) {
        return config[key];
    }
    
    return buttonConfig.default[key];
}

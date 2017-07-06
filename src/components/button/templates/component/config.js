
export let buttonConfig = {

    default: {
        colors: [ 'gold', 'blue', 'silver', 'black' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],

        logoColors:  {
            gold:   'blue',
            silver: 'blue',
            blue:   'white',
            black: 'white',
            creditblue: 'white'
        },

        tagLineColors:  {
            gold:   'blue',
            silver: 'blue',
            blue:   'blue',
            black: 'black',
            creditblue: 'blue'
        },

        defaultDualLabel: '${pp}${paypal}',
        defaultDualTagKey: 'dual_tag',

        defaultLocale: 'en_US',
        defaultLabel:        'checkout',
        defaultColor:        'gold',
        defaultSize:         'small',
        defaultShape:        'pill',
        defaultBranding:     true,
        defaultFundingIcons: false,

        allowUnbranded: false,
        allowFundingIcons: true
    },

    checkout: {
        tagline: true,
        dual_tagline: true,
        tagkey:  'safer_tag',
        sizes:  [ 'tiny', 'small', 'medium', 'large', 'responsive' ],
        allowDualButton: true
    },

    pay: {
        tagline: false,
        dual_tagline: true,
        colors: [ 'gold', 'blue', 'silver', 'black'],
        allowDualButton: true
    },

    credit: {
        label: '${pp}${paypal} ${credit}',
        tagline: true,
        dual_tagline: true,
        tagkey:  'later_tag',
        colors: [ 'creditblue', 'black'],
        allowFundingIcons: false,
        allowDualButton: false,
        defaultColor: 'creditblue'
    },

    buynow: {
        tagline: true,
        dual_tagline: true,
        tagkey:  'safer_tag',
        defaultBranding:     undefined,
        defaultFundingIcons: true,
        allowUnbranded: true,
        allowDualButton: true
    },

    generic: {
        tagline: true,
        dual_tagline: true,
        tagkey: 'safer_tag',
        label: '${pp}${paypal}',
        allowDualButton: true

    }
};

export function getButtonConfig(type : string, key : string) : mixed {
    let config = buttonConfig[type];

    if (config.hasOwnProperty(key)) {
        return config[key];
    }

    return buttonConfig.default[key];
}

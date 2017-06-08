
export let buttonConfig = {

    default: {
        colors: [ 'gold', 'blue', 'silver' ],
        sizes:  [ 'small', 'medium', 'large', 'responsive' ],
        shapes: [ 'pill', 'rect' ],

        logoColors:  {
            gold:   'blue',
            silver: 'blue',
            blue:   'white'
        },

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
        tagkey:  'safer_tag',

        sizes:  [ 'tiny', 'small', 'medium', 'large', 'responsive' ]
    },

    pay: {
        tagline: false
    },

    credit: {
        label: '${pp}${paypal} ${credit}',

        tagline: true,
        tagkey:  'later_tag',

        colors: [ 'creditblue' ],

        logoColors:  {
            creditblue: 'white'
        },

        allowFundingIcons: false,

        defaultColor: 'creditblue'
    },

    buynow: {
        tagline: false,
        tagkey:  'safer_tag',

        defaultBranding:     undefined,
        defaultFundingIcons: true,

        allowUnbranded: true
    }
};

export function getButtonConfig(type : string, key : string) : mixed {
    let result = buttonConfig[type][key];

    if (typeof result !== 'undefined') {
        return result;
    }

    return buttonConfig.default[key];
}

/* @flow */

export const config = {
    checkoutjs_url: 'https://www.paypalobjects.com/api/checkout{version}.js',
    major_version:  '4',
    latest_version: 'latest',
    xcomponent:     'xcomponent',
    ppcheckout:     'ppcheckout',
    xchild_global:  'xchild',
    name_separator: '__',

    script_props: {
        'data-paypal-checkout': '',
        'data-no-bridge':       '',
        'data-state':           'ppxo_checkout'
    }
};

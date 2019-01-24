/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    'globals': {
        'Promise': false,
        '__PAYPAL_CHECKOUT__': true,
        '__paypal_checkout__': true,
        '__sdk__': true,
        '__LOCALE__': true,
        '__CLIENT_ID__': true,
        '__MERCHANT_ID__': true,
        '__INTENT__': true,
        '__COMMIT__': true,
        '__VAULT__': true,
        '__PORT__': true,
        '__STAGE_HOST__': true,
        '__HOST__': true,
        '__PATH__': true
    },

    'rules': {
        'complexity': 'off',
        'max-nested-callbacks': [ 'error', 5 ],
        'react/prop-types': 'off',
        'react/style-prop-object': 'off',
        'react/display-name': 'off',
        'react/require-default-props': 'off',
        'react/forbid-component-props': 'off'
    }
};
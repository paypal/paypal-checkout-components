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
        '__STAGE_HOST__': true
    },

    'rules': {
        'promise/catch-or-return': 'off',
        'complexity': 'off',
        'max-nested-callbacks': [ 'error', 5 ]
    }
};
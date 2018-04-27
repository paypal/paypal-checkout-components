/* @flow */

module.exports = {
    'extends': './node_modules/grumbler-scripts/config/.eslintrc-browser.js',

    'globals': {
        'Promise': false,
        '__TEST__': true,
        '__MIN__': true,
        '__FILE_NAME__': true,
        '__PAYPAL_CHECKOUT__': true
    },

    'rules': {
        'promise/catch-or-return': 'off',
        'complexity': 'off',
        'max-nested-callbacks': [ 'error', 5 ]
    }
};
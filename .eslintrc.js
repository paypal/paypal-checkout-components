/* @flow */

module.exports = {
    'extends': require.resolve('grumbler-scripts/config/.eslintrc-browser'),

    'rules': {
        'react/display-name': 'off'
    },

    'globals': {
        '__SMART_BUTTONS__': true,
        'paypal': true
    }
};
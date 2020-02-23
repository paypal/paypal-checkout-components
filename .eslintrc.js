/* @flow */

module.exports = {
    'extends': require.resolve('grumbler-scripts/config/.eslintrc-browser'),

    'rules': {
        'react/display-name': 'off',
        'prefer-regex-literals': 'off',
        'require-atomic-updates': 'off',
        'react/require-default-props': 'off'
    },

    'globals': {
        '__SMART_BUTTONS__': true,
        '__SMART_WALLET__': true,
        'paypal': true
    }
};
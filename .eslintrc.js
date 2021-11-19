/* @flow */

// eslint-disable-next-line import/no-commonjs
module.exports = {
    'extends': require.resolve('grumbler-scripts/config/.eslintrc-browser'),

    'rules': {
        'react/display-name': 'off',
        'prefer-regex-literals': 'off',
        'require-atomic-updates': 'off',
        'max-lines': [ 'error', 600 ],
        'react/require-default-props': 'off',
        'react/prop-types': 'off'
    },

    'globals': {
        '__SMART_BUTTONS__': true,
        'paypal': true
    },
    'overrides': [{
        'files': ['**/*.test.js'],
        'env': {
          'jest': true
        },
        'globals': {
            'JestMockFn': false
        }
    }],
    'ignorePatterns': ['node-qrcode.js']
};

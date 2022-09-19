/* @flow */

// eslint-disable-next-line import/no-commonjs
module.exports = {
    'extends': require.resolve('@krakenjs/grumbler-scripts/config/.eslintrc-node'),

    'rules': {
        'react/display-name': 'off'
    },
    'globals': {
        '$Shape': 'readonly'
    }
};

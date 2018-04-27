/* @flow */

module.exports = {
    'extends': '../.eslintrc.js',

    'globals': {
        'document': true,
        'performance': true,
        'assert': true,
        'beforeAll': true,
        'afterAll': true,
        'test': true,
        'jest': true
    },


    'rules': {
        'compat/compat': 'off',
        'max-lines': 'off'
    }
};
/* @flow */

module.exports = {
  extends: "@krakenjs/eslint-config-grumbler/eslintrc-browser",

  globals: {
    Promise: false,
    __PAYPAL_CHECKOUT__: true,
    __sdk__: true,
    __LOCALE__: true,
    __CLIENT_ID__: true,
    __MERCHANT_ID__: true,
    __INTENT__: true,
    __COMMIT__: true,
    __VAULT__: true,
    __PORT__: true,
    __STAGE_HOST__: true,
    __HOST__: true,
    __PATH__: true,
    __COMPONENTS__: true,
    $Shape: true,
  },

  rules: {
    complexity: "off",
    "max-nested-callbacks": ["error", 5],
    "react/prop-types": "off",
    "react/style-prop-object": "off",
    "react/display-name": "off",
    "react/require-default-props": "off",
    "react/forbid-component-props": "off",
    "react/no-unused-prop-types": "off",
  },

  overrides: [
    {
      files: ["test/**/*"],
      rules: {
        "compat/compat": "off",
        "max-lines": "off",
        "no-restricted-globals": "off",
        "promise/no-native": "off",
      },
      globals: {
        document: true,
        performance: true,
        assert: true,
        beforeAll: true,
        afterAll: true,
        test: true,
        jest: true,
        page: true,
      },
    },
  ],
};

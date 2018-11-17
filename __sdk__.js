/* @flow */
/* eslint unicorn/filename-case: 0, import/unambiguous: 0, import/no-commonjs: 0 */

const globals = require('./globals');

module.exports = {

    'buttons': {
        entry:           './src/interface/button',
        setupHandler:    'setupButtons',
        staticNamespace: '__paypal_checkout__',
        configQuery:     `
            clientConfiguration {
                paypalMerchantConfiguration(merchantId: $clientID, locale: $country) {
                    creditCard {
                        isPayPalBranded
                        supportedCardBrands
                    }
                }
            }`,
        globals
    },

    'checkout': {
        entry:           './src/interface/checkout',
        staticNamespace: '__paypal_checkout__',
        configQuery:     `
            clientConfiguration {
                paypalMerchantConfiguration(merchantId: $clientID, locale: $country) {
                    creditCard {
                        isPayPalBranded
                        supportedCardBrands
                    }
                }
            }`,
        globals
    }
};

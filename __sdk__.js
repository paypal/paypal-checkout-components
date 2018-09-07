/* @flow */
/* eslint unicorn/filename-case: 0, import/unambiguous: 0, import/no-commonjs: 0 */

let globals = require('./globals');

module.exports = {

    '__paypal-checkout-components-common__': {
        entry:     './src/interface/common',
        automatic: true
    },
    
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
        setupHandler:    'setupCheckout',
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

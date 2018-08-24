/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/globals';

export default function configKarma(karma : Object) {

    let karmaConfig = getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  getWebpackConfig({
            test: true,
            vars: {
                ...testGlobals,
                __paypal_checkout__: {
                    ...testGlobals.__paypal_checkout__,
                    serverConfig: {
                        fundingEligibility: () => 'window.__TEST_FUNDING_ELIGIBILITY__'
                    }
                },
                __PAYPAL_CHECKOUT__: {
                    ...testGlobals.__PAYPAL_CHECKOUT__,
                    __REMEMBERED_FUNDING__: () => 'window.__TEST_REMEMBERED_FUNDING__'
                },
                __CLIENT_ID__:   'abcxyz123',
                __MERCHANT_ID__: 'abc',
                __LOCALE__:      () => 'window.__TEST_LOCALE__'
            }
        })
    });

    karmaConfig.files = [
        {
            pattern:  'test/lib/react_v15.1.0.js',
            included: true,
            served:   true
        },

        {
            pattern:  'test/lib/react-dom_v15.1.0.js',
            included: true,
            served:   true
        },

        {
            pattern:  'test/lib/angular.min.js',
            included: true,
            served:   true
        },

        {
            pattern:  'test/tests/globals.js',
            included: true,
            served:   true
        },

        {
            pattern:  'src/index.js',
            included: true,
            served:   true
        },
        
        ...karmaConfig.files
    ];

    karmaConfig.preprocessors['src/index.js'] = [ 'webpack', 'sourcemap' ];
    karmaConfig.preprocessors['src/**/*.js'] = [ 'sourcemap' ];
    
    karma.set(karmaConfig);
}

/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from '@krakenjs/grumbler-scripts/config/types';
import { getWebpackConfig } from '@krakenjs/grumbler-scripts/config/webpack.config';

import { getTestGlobals, fundingEligibility, inlineCheckoutEligibility } from './test/globals';
import globals from './globals';

const testGlobals = getTestGlobals(globals);

for (const fundingSource of Object.keys(fundingEligibility)) {
    fundingEligibility[fundingSource].eligible = (fundingSource === 'paypal');
}

const CHECK_SIZE_CONFIG : WebpackConfig = getWebpackConfig({
    filename:   'size',
    entry:      './src/interface/button.js',
    minify:     false,
    sourcemaps: false,
    analyze:    true,
    vars:       {
        ...testGlobals,
        __FUNDING_ELIGIBILITY__:         fundingEligibility,
        __INLINE_CHECKOUT_ELIGIBILITY__: inlineCheckoutEligibility
    }
});

const CHECK_SIZE_MIN_CONFIG : WebpackConfig = getWebpackConfig({
    filename:   'size',
    entry:      './src/interface/button.js',
    minify:     true,
    sourcemaps: false,
    analyze:    true,
    vars:       {
        ...testGlobals,
        __FUNDING_ELIGIBILITY__:         fundingEligibility,
        __INLINE_CHECKOUT_ELIGIBILITY__: inlineCheckoutEligibility
    }
});

export default [ CHECK_SIZE_CONFIG, CHECK_SIZE_MIN_CONFIG ];

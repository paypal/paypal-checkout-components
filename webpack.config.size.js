/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from 'grumbler-scripts/config/types';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals, fundingEligibility } from './test/globals';
import globals from './globals';

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
        ...globals,
        ...testGlobals,
        __FUNDING_ELIGIBILITY__: fundingEligibility
    }
});

const CHECK_SIZE_MIN_CONFIG : WebpackConfig = getWebpackConfig({
    filename:   'size',
    entry:      './src/interface/button.js',
    minify:     true,
    sourcemaps: false,
    analyze:    true,
    vars:       {
        ...globals,
        ...testGlobals,
        __FUNDING_ELIGIBILITY__: fundingEligibility
    }
});

export default [ CHECK_SIZE_CONFIG, CHECK_SIZE_MIN_CONFIG ];

/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/globals';
import globals from './globals';

const FILE_NAME = 'checkout';

export default getWebpackConfig({
    entry:         './test/paypal.js',
    filename:      `${ FILE_NAME }.js`,
    debug:         true,
    minify:        true,
    env:           'sandbox',
    vars:          {
        ...globals,
        ...testGlobals,
        __HOST__: 'localhost.paypal.com:9000',
        __PATH__: `/${ FILE_NAME }.js`
    }
});

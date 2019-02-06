/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import { testGlobals } from './test/globals';
import globals from './globals';

export default getWebpackConfig({
    filename:   'size.js',
    entry:      './src/interface/button.js',
    minify:     true,
    sourcemaps: false,
    vars:       {
        ...globals,
        ...testGlobals
    }
});

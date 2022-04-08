/* eslint import/no-commonjs: off, flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

import { getNextVersion } from '@krakenjs/grumbler-scripts/config/webpack.config';

import pkg from './package.json';

export const globals = {
    __SMART_BUTTONS__: {
        __MAJOR_VERSION__: getNextVersion(pkg, 'major').replace(/_/g, '.'),
        __MINOR_VERSION__: getNextVersion(pkg, 'patch').replace(/_/g, '.')
    }
};

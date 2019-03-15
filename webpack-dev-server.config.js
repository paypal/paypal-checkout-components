/* @flow */
/* eslint unicorn/filename-case: 0 */
import { BASE } from './webpack.config';

const webpackConfig = {
    ...BASE,
    output: {
        ...BASE.output,
        publicPath: undefined
    }
};

export default webpackConfig;

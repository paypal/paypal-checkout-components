/* @flow */
/* eslint unicorn/filename-case: 0 */
import { BASE, getWebpackConfig } from './webpack.config';

const webpackConfig = {
    ...BASE
};

delete webpackConfig.output.publicPath;

export default webpackConfig;

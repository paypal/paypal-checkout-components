/* @flow */
/* eslint unicorn/filename-case: 0 */
import { BASE } from './webpack.config';

let webpackConfig = {
    ...BASE
};

delete webpackConfig.output.publicPath;

export default webpackConfig;

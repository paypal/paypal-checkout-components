/* @flow */
/* eslint unicorn/filename-case: 0 */
import { LIB } from './webpack.config';

const getNextVersion = () : string => {
    let version = require('./package.json').version;
    version = version.split('.');
    version[2] = (parseInt(version[2], 10) + 1).toString();
    version = version.join('.');
    return version;
};

const nextVer = getNextVersion();

const webpackConfig = {
    ...LIB,
    entry: {
        [`checkout`]:               './src/index.js',
        [`checkout.${ nextVer }`]:  './src/index.js'
    },
    output: {
        ...LIB.output,
        publicPath:   '/',
        filename:     '[name].js'
    },
    devServer: {
        host: 'localhost.paypal.com'
    }
};

export default webpackConfig;

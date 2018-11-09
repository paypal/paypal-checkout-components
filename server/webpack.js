/* @flow */

import MemoryFS from 'memory-fs';
import webpack from 'webpack';

type WebpackConfig = {|

|};

export async function webpackCompile(config : WebpackConfig) : Promise<{ [string] : string }> {
    const compiler = webpack(config);

    compiler.outputFileSystem = new MemoryFS();

    return await new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }

            if (stats.hasErrors() || stats.hasWarnings()) {
                return reject(new Error(stats.toString({
                    errorDetails: true,
                    warnings:     true
                })));
            }

            resolve(compiler.outputFileSystem.data);
        });
    });
}

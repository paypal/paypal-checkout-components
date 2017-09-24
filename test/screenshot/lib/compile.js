/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint import/no-nodejs-modules: 0 */

import os from 'os';

import webpack from 'webpack';

export async function webpackCompile(config : Object) : Promise<string> {

    let path     = os.tmpdir();
    let filename = `${ Math.random().toString() }.js`;

    await new Promise((resolve, reject) => {
        webpack({
            ...config,
            output: { path, filename }
        }).run((err, stats) => {
            return err ? reject(err) : resolve(stats);
        });
    });

    return `${ path }/${ filename }`;
}

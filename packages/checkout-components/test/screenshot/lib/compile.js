/* @flow */
/* eslint no-restricted-globals: 0 */
/* eslint import/no-nodejs-modules: 0 */

import os from "os";

import { readFile } from "fs-extra";
import webpack from "webpack";

export async function webpackCompile(config: Object): Promise<string> {
  const path = os.tmpdir();
  const filename = `${Math.random().toString()}.js`;

  await new Promise((resolve, reject) => {
    webpack({
      ...config,
      output: { ...config.output, path, filename },
    }).run((err, stats) => {
      return err ? reject(err) : resolve(stats);
    });
  });

  return `${path}/${filename}`;
}

export async function webpackCompileToString(config: Object): Promise<string> {
  const path = await webpackCompile(config);
  const script = await readFile(path);
  return script.toString();
}

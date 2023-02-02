/* @flow */

/* eslint-disable import/no-nodejs-modules */
import http from "http";
import fs from "fs";
import path from "path";
/* eslint-enable import/no-nodejs-modules */

import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";

import globals from "../../../globals";
import { getTestGlobals } from "../globals";
import { webpackCompile } from "../lib/compile";

const hostname = "127.0.0.1";
const port = 8111;

(async () => {
  const scriptPath = await webpackCompile(
    getWebpackConfig({
      entry: "./test/paypal.js",
      libraryTarget: "window",
      test: true,
      web: false,
      vars: { ...getTestGlobals(globals) },
    })
  );

  const server = http.createServer((req, res) => {
    if (req.url === "/sdk/js") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/javascript");
      const readStream = fs.createReadStream(scriptPath);
      readStream.pipe(res);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      const readStream = fs.createReadStream(
        path.resolve(__dirname, "./index.html")
      );
      readStream.pipe(res);
    }
  });

  server.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${hostname}:${port}/`);
  });
})();

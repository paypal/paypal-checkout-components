/* @flow */
/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import type { WebpackConfig } from "@krakenjs/webpack-config-grumbler/index.flow";
import { getWebpackConfig } from "@krakenjs/webpack-config-grumbler";
import { ENV } from "@paypal/sdk-constants";

import { getTestGlobals } from "./test/globals";
import globals from "./globals";

const PROTOCOL = "https";
const HOSTNAME = "localhost.paypal.com";
const PORT = 9001;
const PAYPAL_DOMAIN =
  process.env.PAYPAL_LOCAL_DOMAIN || "https://localhost.paypal.com:9001";
const PAYPAL_SDK_PATH = process.env.PAYPAL_LOCAL_SDK_PATH || "/sdk.js";
const PAYPAL_BUTTONS_URI =
  process.env.PAYPAL_LOCAL_BUTTONS_URI || "/button.htm";
const PAYPAL_BUTTONS_PROXY = process.env.PAYPAL_LOCAL_BUTTONS_PROXY;

const testGlobals = getTestGlobals(globals);

const WEBPACK_CONFIG_DEV: WebpackConfig = getWebpackConfig({
  entry: "./paypal.dev.js",
  filename: PAYPAL_SDK_PATH.replace(/^\//, ""),
  debug: true,
  minify: false,
  web: false,
  env: ENV.LOCAL,
  vars: {
    ...testGlobals,
    __PROTOCOL__: PROTOCOL,
    __HOST__: `${HOSTNAME}:${PORT}`,
    __SDK_HOST__: `${HOSTNAME}:${PORT}`,
    __PORT__: PORT,
    __PATH__: PAYPAL_SDK_PATH,
    __PAYPAL_DOMAIN__: PAYPAL_DOMAIN,
    __PAYPAL_CHECKOUT__: {
      ...testGlobals.__PAYPAL_CHECKOUT__,
      __URI__: {
        __CHECKOUT__: `/checkout.htm`,
        __BUTTONS__: PAYPAL_BUTTONS_URI,
        __MENU__: `/menu.htm`,
        __CARD_FIELD__: `/cardfield.htm`,
        __MESSAGE_MODAL__: `https://www.paypalobjects.com/upstream/bizcomponents/js/modal.js`,
      },
    },
  },
});

WEBPACK_CONFIG_DEV.output = {
  ...WEBPACK_CONFIG_DEV.output,
  filename: PAYPAL_SDK_PATH.replace(/^\//, ""),
};

if (PAYPAL_BUTTONS_PROXY) {
  WEBPACK_CONFIG_DEV.devServer = {
    ...WEBPACK_CONFIG_DEV.devServer,
    proxy: [
      {
        changeOrigin: true,
        context: ["/smart/buttons"],
        target: PAYPAL_BUTTONS_PROXY,
      },
    ],
  };
}

const WEBPACK_CONFIG_BUTTON_RENDER: WebpackConfig = getWebpackConfig({
  context: __dirname,
  entry: "./src/ui/buttons",
  filename: "button.js",
  modulename: "button",
  debug: true,
  minify: false,
  web: false,
  libraryTarget: "global",
});

const WEBPACK_CONFIG_JSX_PRAGMATIC: WebpackConfig = getWebpackConfig({
  context: __dirname,
  entry: "@krakenjs/jsx-pragmatic",
  filename: "jsx-pragmatic.js",
  modulename: "jsx",
  debug: true,
  minify: false,
  libraryTarget: "global",
});

const WEBPACK_CONFIG_SDK_CONSTANTS: WebpackConfig = getWebpackConfig({
  context: __dirname,
  entry: "@paypal/sdk-constants",
  filename: "sdk-constants.js",
  modulename: "constants",
  debug: true,
  minify: false,
  libraryTarget: "global",
});

export default [
  WEBPACK_CONFIG_DEV,
  WEBPACK_CONFIG_BUTTON_RENDER,
  WEBPACK_CONFIG_JSX_PRAGMATIC,
  WEBPACK_CONFIG_SDK_CONSTANTS,
];

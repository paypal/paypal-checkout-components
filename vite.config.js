/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-default-export */
/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

/* @flow */

import { defineConfig } from "vite";
import { flowPlugin, esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";
import { __ZOID__, __POST_ROBOT__, __PAYPAL_CHECKOUT__ } from "./globals";

const FILE_NAME = "sdk";
const PROTOCOL = "https";
const HOSTNAME = "localhost.paypal.com";
const PORT = 9001;

const define = {
  __COMPONENTS__: JSON.stringify(["buttons"]),
  __CORRELATION_ID__: JSON.stringify("abc123"),
  __DEBUG__: "false",
  __DISABLE_SET_COOKIE__: "false",
  __ENV__: JSON.stringify("test"),
  __EXPERIMENTATION__: JSON.stringify({
    __EXPERIENCE__: "",
    __TREATMENT__: "",
  }),
  __FUNDING_ELIGIBILITY__: JSON.stringify({ paypal: { eligible: true } }),
  __HOST__: JSON.stringify(`${HOSTNAME}:${PORT}`),
  __NAMESPACE__: JSON.stringify("paypal"),
  __PATH__: JSON.stringify(`/${FILE_NAME}.js`),
  __PAYPAL_CHECKOUT__: JSON.stringify(__PAYPAL_CHECKOUT__),
  __PAYPAL_DOMAIN__: JSON.stringify("mock://www.paypal.com"),
  __PAYPAL_API_DOMAIN__: JSON.stringify("mock://sandbox.paypal.com"),
  __PORT__: JSON.stringify(PORT),
  __PROTOCOL__: JSON.stringify(PROTOCOL),
  __POST_ROBOT__: JSON.stringify(__POST_ROBOT__),
  __SDK_HOST__: JSON.stringify(`${HOSTNAME}:${PORT}`),
  __TEST__: "true",
  __VERSION__: JSON.stringify("5.0.0"),
  __WEB__: "true",
  __ZOID__: JSON.stringify(__ZOID__),
};

// $FlowIssue
export default defineConfig({
  esbuild: {
    define,
  },
  define,
  test: {
    environment: "jsdom",
    setupFiles: ["vitestSetup.js"],
    include: [
      "**/src/**/*.test.{js,jsx}",
      "**/tests/**/*.test.{js,jsx,ts,tsx}",
    ],
    globals: true,
    coverage: {
      // exclude untested files
      all: false,
      include: ["src"],
      provider: "v8",
      reportsDirectory: "./coverage/vitest",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  plugins: [
    // $FlowIssue
    flowPlugin({
      exclude: "",
    }),
  ],
});

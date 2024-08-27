/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-default-export */
/// <reference types="vitest" />

// Configure Vitest (https://vitest.dev/config/)

/* @flow */

import { defineConfig } from "vite";
import { flowPlugin, esbuildFlowPlugin } from "@bunchtogether/vite-plugin-flow";

const define = {
  __DEBUG__: false,
  __TEST__: true,
  __WEB__: true,
  __POST_ROBOT__: JSON.stringify({
    __GLOBAL_KEY__: `__post_robot__`,
    __AUTO_SETUP__: false,
    __IE_POPUP_SUPPORT__: false,
    __GLOBAL_MESSAGE_SUPPORT__: true,
    __SCRIPT_NAMESPACE__: false,
  }),
  __PAYPAL_CHECKOUT__: JSON.stringify({
    _MAJOR_VERSION__: "",
    __MINOR_VERSION__: "",
  }),
  __DISABLE_SET_COOKIE__: false,
  __EXPERIMENTATION__: {
    __EXPERIENCE__: "",
    __TREATMENT__: "",
  },
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
    include: ["**/src/**/*.test.{js,jsx}"],
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

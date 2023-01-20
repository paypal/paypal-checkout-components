/* @flow */

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "tests",
  testMatch: "**/*.spec.js",
  timeout: 600000,
  use: {
    baseURL: "http://localhost:8111/",
  },
  webServer: {
    command: "npm run screenshot-server",
    url: "http://localhost:8111/",
    timeout: 1200 * 1000,
    // eslint-disable-next-line no-process-env
    reuseExistingServer: !process.env.CI,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;

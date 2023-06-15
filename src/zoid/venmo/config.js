/* @flow */

import { ENV } from "@paypal/sdk-constants/src";

type EnvConfig = {|
  [$Values<typeof ENV>]: string,
|};

export const DEFAULT_POPUP_SIZE = {
  WIDTH: 534,
  HEIGHT: 590,
};

export const HISTORY_NATIVE_POPUP_DOMAIN: EnvConfig = {
  [ENV.TEST]: "https://localhost.paypal.com:8443",
  [ENV.LOCAL]: "https://localhost.paypal.com:8443",
  [ENV.STAGE]: "https://history.paypal.com",
  [ENV.SANDBOX]: "https://history.paypal.com",
  [ENV.PRODUCTION]: "https://history.paypal.com",
};

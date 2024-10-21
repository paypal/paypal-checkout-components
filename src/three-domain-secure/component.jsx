/* @flow */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

// MerchantPayloadData type
// amount, currency, fastlane nonce, threeDSRequest (bool), transaction context with soft descriptor
// what parameters are required and which ones are optional?

type SdkConfig = {|
  sdkToken: ?string,
|};

const parseSdkConfig = ({ sdkConfig, logger }): SdkConfig => {
  if (!sdkConfig.sdkToken) {
    throw new ValidationError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  }

  logger.info("three domain secure v2 invoked").track({
    [FPTI_KEY.TRANSITION]: "three_DS_auth_v2",
  });

  return sdkConfig;
};
export interface ThreeDomainSecureComponentInterface {
  isEligible(): ZalgoPromise<boolean>;
  show(): ZoidComponent<void>;
}
export class ThreeDomainSecureComponent {
  logger: LoggerType;
  sdkConfig: SdkConfig;
  authenticationURL: string;

  constructor({
    logger,
    sdkConfig,
  }: {|
    logger: LoggerType,
    sdkConfig: SdkConfig,
  |}) {
    this.logger = logger;
    this.sdkConfig = parseSdkConfig({ sdkConfig, logger });
  }

  isEligible(): ZalgoPromise<boolean> {
    // change name to isContingent??
    // will return true or false
    // if payer action required, return true. obtain link from response for show method - check length of links

    this.authenticationURL = "response URL";
    // if payer action not required, return false

    // will make API request to v2/payments/pamyment endpoint with merchant payload an grab sdktoken as
    // bearer token

    // will need to handle errors from API response
    // What are the other options for status response and how do we handle them from a compliance standpoint
    // What do we do if we get a 500 error from the API?
    // do we throw an error or return false?

    return new ZalgoPromise((resolve) => {
      resolve(false);
    });
  }

  show() {
    create({ tag: "", url: "" });
  }
}

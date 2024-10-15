/* @flow */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

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
  isEligibile(): void;
  show(): void;
}
export class ThreeDomainSecureComponent {
  logger: LoggerType;
  sdkConfig: SdkConfig;

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

  isEligibile() {
    // eslint-disable-next-line no-console
    console.log("Eligble");
  }

  show() {
    // eslint-disable-next-line no-console
    console.log("show");
  }
}

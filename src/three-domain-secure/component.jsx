/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { type ZoidComponent } from "@krakenjs/zoid/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

import type {
  requestData,
  responseBody,
  Request,
  MerchantPayloadData,
  SdkConfig,
  threeDSResponse,
} from "./types";
import { getThreeDomainSecureComponent, type TDSProps } from "./utils";

const parseSdkConfig = ({ sdkConfig, logger }): SdkConfig => {
  if (!sdkConfig.authenticationToken) {
    throw new ValidationError(
      `script data attribute sdk-client-token is required but was not passed`
    );
  }

  logger.info("three domain secure v2 invoked").track({
    [FPTI_KEY.TRANSITION]: "three_DS_auth_v2",
  });

  return sdkConfig;
};

const parseMerchantPayload = ({
  merchantPayload,
}: {|
  merchantPayload: MerchantPayloadData,
|}): requestData => {
  const { threeDSRequested, amount, currency, nonce, transactionContext } =
    merchantPayload;
  return {
    intent: "THREE_DS_VERIFICATION",
    payment_source: {
      card: {
        single_use_token: nonce,
        verification_method: threeDSRequested
          ? "SCA_ALWAYS"
          : "SCA_WHEN_REQUIRED",
      },
    },
    amount: {
      currency_code: currency,
      value: amount,
    },
    ...transactionContext,
  };
};

export interface ThreeDomainSecureComponentInterface {
  isEligible(payload: MerchantPayloadData): Promise<boolean>;
  show(): ZalgoPromise<threeDSResponse>;
}
export class ThreeDomainSecureComponent {
  logger: LoggerType;
  request: Request;
  sdkConfig: SdkConfig;
  authenticationURL: string;
  threeDSIframe: ZoidComponent<TDSProps>;
  constructor({
    logger,
    request,
    sdkConfig,
  }: {|
    logger: LoggerType,
    request: Request,
    sdkConfig: SdkConfig,
  |}) {
    this.logger = logger;
    this.request = request;
    this.sdkConfig = parseSdkConfig({ sdkConfig, logger });
  }

  async isEligible(merchantPayload: MerchantPayloadData): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log("Entered IsEligible");

    const data = parseMerchantPayload({ merchantPayload });
    const idToken = merchantPayload.idToken;
    try {
      // $FlowFixMe
      const { status, links } = await this.request<requestData, responseBody>({
        method: "POST",
        url: `https://www.te-fastlane-3ds.qa.paypal.com/v2/payments/payment`,
        data,
        accessToken: idToken, // this.sdkConfig.authenticationToken,
      });

      let responseStatus = false;
      if (status === "PAYER_ACTION_REQUIRED") {
        this.authenticationURL = links.find(
          (link) => link.rel === "payer-action"
        ).href;
        responseStatus = true;
        this.threeDSIframe = getThreeDomainSecureComponent(
          this.authenticationURL
        );
      }
      return responseStatus;
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }
  }

  show(): ZalgoPromise<threeDSResponse> {
    if (!this.threeDSIframe) {
      throw new ValidationError(`Ineligible for three domain secure`);
    }
    const promise = new ZalgoPromise();
    const cancelThreeDS = () => {
      return ZalgoPromise.try(() => {
        // eslint-disable-next-line no-console
        console.log("cancelled");
      }).then(() => {
        // eslint-disable-next-line no-use-before-define
        instance.close();
      });
    };
    // $FlowFixMe
    const instance = this.threeDSIframe({
      onSuccess: (data) => {
        // const {threeDSRefID, authentication_status, liability_shift } = data;
        // let enrichedNonce;
        // if(threeDSRefID) {
        //   enrichedNonce = await updateNonceWith3dsData(threeDSRefID, this.fastlaneNonce)
        // }

        return promise.resolve(data);
      },
      onClose: cancelThreeDS,
      onError: (err) => {
        return promise.reject(
          new Error(
            `Error with obtaining 3DS contingency, ${JSON.stringify(err)}`
          )
        );
      },
    });
    const TARGET_ELEMENT = {
      BODY: "body",
    };
    return instance
      .renderTo(window.parent, TARGET_ELEMENT.BODY)
      .then(() => promise)
      .finally(instance.close);
  }
}

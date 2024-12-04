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
  MerchantPayloadData,
  SdkConfig,
  threeDSResponse,
  TDSProps,
} from "./types";
import { getFastlaneThreeDS } from "./utils";
import type { GraphQLClient, RestClient } from "./api";

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

type Update3DSTokenResponse = {|
  updateTokenizedCreditCardWithExternalThreeDSecure: {|
    paymentMethod: {|
      id: string,
    |},
  |},
|};

export class ThreeDomainSecureComponent {
  fastlaneNonce: string;
  logger: LoggerType;
  restClient: RestClient;
  graphQLClient: GraphQLClient;
  sdkConfig: SdkConfig;
  authenticationURL: string;
  threeDSIframe: ZoidComponent<TDSProps>;

  constructor({
    logger,
    restClient,
    graphQLClient,
    sdkConfig,
  }: {|
    logger: LoggerType,
    restClient: RestClient,
    graphQLClient: GraphQLClient,
    sdkConfig: SdkConfig,
  |}) {
    this.logger = logger;
    this.restClient = restClient;
    this.graphQLClient = graphQLClient;
    this.sdkConfig = parseSdkConfig({ sdkConfig, logger });

    if (this.sdkConfig.authenticationToken) {
      this.restClient.setAccessToken(this.sdkConfig.authenticationToken);
    }
  }

  async isEligible(merchantPayload: MerchantPayloadData): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log("Entered IsEligible");

    const data = parseMerchantPayload({ merchantPayload });
    const idToken = merchantPayload.idToken;
    this.fastlaneNonce = merchantPayload.nonce;

    try {
      // $FlowFixMe
      const { status, links } = await this.restClient.request<
        requestData,
        responseBody
      >({
        method: "POST",
        baseURL: `${this.sdkConfig.paypalApiDomain}/v2/payments/payment`,
        data,
        accessToken: idToken, // this.sdkConfig.authenticationToken,
      });

      let responseStatus = false;
      if (status === "PAYER_ACTION_REQUIRED") {
        this.authenticationURL = links.find(
          (link) => link.rel === "payer-action"
        ).href;
        responseStatus = true;
        this.threeDSIframe = getFastlaneThreeDS(this.authenticationURL);
      }
      return responseStatus;
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }
  }

  show(): ZalgoPromise<threeDSResponse> {
    if (!this.threeDSIframe) {
      return ZalgoPromise.reject(
        new ValidationError(`Ineligible for three domain secure`)
      );
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
      payerActionUrl:
        "https://te-fastlane-3ds.qa.paypal.com/webapps/helios?action=authenticate&token=30S05532XC756423E&go_to=next",
      onSuccess: async (data) => {
        // const { threeDSRefID, authentication_status, liability_shift } = data;
        const { threeDSRefID } = data;
        // eslint-disable-next-line no-console
        console.log("threeDSRefID", threeDSRefID);
        let enrichedNonce;

        if (threeDSRefID) {
          enrichedNonce = await this.updateNonceWith3dsData(threeDSRefID);
        }
        // eslint-disable-next-line no-console
        console.log("Received enriched nonce", enrichedNonce);
        return promise.resolve({ ...data, nonce: enrichedNonce });
      },
      onCancel: cancelThreeDS,
      onError: (err) => {
        return ZalgoPromise.reject(
          new Error(
            `Error with obtaining 3DS contingency, ${JSON.stringify(err)}`
          )
        );
      },
    });
    // const TARGET_ELEMENT = {
    //   BODY: "body",
    // };
    return instance
      .render("body")
      .then(() => promise)
      .finally(instance.close);
  }

  updateNonceWith3dsData(
    threeDSRefID: string
  ): ZalgoPromise<Update3DSTokenResponse> {
    return this.graphQLClient.request({
      headers: {
        "Braintree-Version": "2023-09-28",
      },
      data: {
        query: `
          mutation Update3DSToken($input: UpdateTokenizedCreditCardWithExternalThreeDSecureInput!) {
            updateTokenizedCreditCardWithExternalThreeDSecure(input: $input) {
              paymentMethod {
                id
              }
            }
          }
        `,
        variables: {
          input: {
            paymentMethodId: this.fastlaneNonce,
            externalThreeDSecureMetadata: {
              externalAuthenticationId: threeDSRefID,
            },
          },
        },
      },
    });
  }
}

/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";
import { createAccessToken } from "@paypal/sdk-client/src";

import { ValidationError } from "../lib";

import type {
  requestData,
  responseBody,
  MerchantPayloadData,
  SdkConfig,
  threeDSResponse,
} from "./types";
import { getThreeDSParams, USER_TYPE, TARGET_ELEMENT } from "./utils";
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
  }

  async isEligible(merchantPayload: MerchantPayloadData): Promise<boolean> {
    // eslint-disable-next-line no-console
    console.log("Entered IsEligible");

    const data = parseMerchantPayload({ merchantPayload });
    this.fastlaneNonce = merchantPayload.nonce;

    try {
      const accessToken = await createAccessToken(this.sdkConfig.clientID);
      // $FlowIssue confusing ZalgoPromise return type with resolved string value
      this.restClient.setAccessToken(accessToken);
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }

    try {
      // $FlowFixMe
      const { status, links } = await this.restClient.request<
        requestData,
        responseBody
      >({
        method: "POST",
        baseURL: `${this.sdkConfig.paypalApiDomain}/v2/payments/payment`,
        data,
      });

      let responseStatus = false;
      if (status === "PAYER_ACTION_REQUIRED") {
        this.authenticationURL = links.find(
          (link) => link.rel === "payer-action"
        ).href;
        responseStatus = true;
      }
      return responseStatus;
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }
  }

  show(): ZalgoPromise<threeDSResponse> {
    if (!this.authenticationURL) {
      return ZalgoPromise.reject(
        new ValidationError(`Ineligible for three domain secure`)
      );
    }
    const promise = new ZalgoPromise();
    const { vaultToken, action } = getThreeDSParams(this.authenticationURL);
    const cancelThreeDS = () => {
      return ZalgoPromise.try(() => {
        // eslint-disable-next-line no-console
        console.log("3DS cancelled");
      }).then(() => {
        // eslint-disable-next-line no-use-before-define
        instance.close();
      });
    };

    // $FlowFixMe
    const instance = window.paypal.ThreeDomainSecure({
      userType: USER_TYPE.FASTLANE,
      vaultToken,
      action,
      go_to: "next",
      onSuccess: async (res) => {
        const { reference_id, authentication_status, liability_shift } = res;

        // eslint-disable-next-line no-console
        console.log("helios response to sdk:", res);
        let enrichedNonce, response;
        if (reference_id) {
          // $FlowFixMe ZalgoPromise not recognized
          response = await this.updateNonceWith3dsData(reference_id);
        }
        // $FlowIssue
        const { data, errors } = response;
        if (data) {
          enrichedNonce =
            data?.updateTokenizedCreditCardWithExternalThreeDSecure
              .paymentMethod.id;
        } else if (errors) {
          // eslint-disable-next-line no-console
          console.error("BT upgradeNonce error", errors);
          return ZalgoPromise.reject(new Error(errors[0].message));
        }
        return promise.resolve({
          authenticationStatus: authentication_status,
          liabilityShift: liability_shift,
          nonce: enrichedNonce,
        });
      },
      onCancel: cancelThreeDS,
      onError: (err) => {
        return ZalgoPromise.reject(
          new Error(
            `Error with obtaining 3DS auth response, ${JSON.stringify(err)}`
          )
        );
      },
    });

    return instance
      .render(TARGET_ELEMENT.BODY)
      .then(() => promise)
      .finally(instance.close);
  }

  updateNonceWith3dsData(
    reference_id: string
  ): ZalgoPromise<Update3DSTokenResponse> {
    return this.graphQLClient.request({
      headers: {
        "Braintree-Version": "2023-09-28",
      },
      data: {
        query: `
          mutation UpdateTokenizedCreditCardWithExternalThreeDSecure($input: UpdateTokenizedCreditCardWithExternalThreeDSecureInput!) {
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
              externalAuthenticationId: reference_id,
            },
          },
        },
      },
    });
  }
}

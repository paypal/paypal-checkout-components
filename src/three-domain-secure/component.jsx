/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { type ZoidComponent } from "@krakenjs/zoid/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { FPTI_KEY, CURRENCY } from "@paypal/sdk-constants/src";

import { PAYMENT_3DS_VERIFICATION } from "../constants/api";
import { ValidationError } from "../lib";

import type {
  requestData,
  GqlResponse,
  MerchantPayloadData,
  SdkConfig,
  ThreeDSResponse,
  TDSProps,
} from "./types";
import { getThreeDS } from "./utils";
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

export const parseMerchantPayload = ({
  merchantPayload,
}: {|
  merchantPayload: MerchantPayloadData,
|}): requestData => {
  const {
    threeDSRequested,
    verificationMethod,
    amount,
    currency,
    nonce,
    transactionContext,
  } = merchantPayload;

  let cardVerificationMethod = "SCA_WHEN_REQUIRED";

  if (verificationMethod) {
    cardVerificationMethod = verificationMethod;
  } else if (threeDSRequested !== undefined) {
    cardVerificationMethod = threeDSRequested
      ? "SCA_ALWAYS"
      : "SCA_WHEN_REQUIRED";
  }

  return {
    intent: "THREE_DS_VERIFICATION",
    payment_source: {
      card: {
        single_use_token: nonce,
        verification_method: cardVerificationMethod,
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
  show(): Promise<ThreeDSResponse>;
}

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
  }

  async isEligible(merchantPayload: MerchantPayloadData): Promise<boolean> {
    this.validateMerchantPayload(merchantPayload);

    const data = parseMerchantPayload({ merchantPayload });
    this.fastlaneNonce = merchantPayload.nonce;

    try {
      // $FlowFixMe
      const { status, links } = await this.restClient.request({
        method: "POST",
        baseURL: `${this.sdkConfig.paypalApiDomain}/${PAYMENT_3DS_VERIFICATION}`,
        data,
      });

      let responseStatus = false;
      if (status === "PAYER_ACTION_REQUIRED") {
        this.authenticationURL = links.find(
          (link) => link.rel === "payer-action"
        ).href;
        responseStatus = true;
        this.threeDSIframe = getThreeDS();
      }
      return responseStatus;
    } catch (error) {
      this.logger.warn(error);
      throw error;
    }
  }
  // eslint-disable-next-line require-await
  async show(): Promise<ThreeDSResponse> {
    if (!this.threeDSIframe) {
      return Promise.reject(
        new ValidationError(`Ineligible for three domain secure`)
      );
    }
    // eslint-disable-next-line compat/compat
    return new Promise((resolve, reject) => {
      let authenticationState,
        liabilityShift;
      const cancelThreeDS = () => {
        return ZalgoPromise.try(() => {
          this.logger.warn("3DS Cancelled");
        }).then(() => {
          // eslint-disable-next-line no-use-before-define
          instance.close();
          resolve({
            authenticationState: "cancelled",
            nonce: this.fastlaneNonce,
          });
        });
      };

      const instance = this.threeDSIframe({
        payerActionUrl: this.authenticationURL,
        onSuccess: async (res) => {
          const { reference_id, liability_shift, success } = res;
          // $FlowFixMe incompatible type payload
          this.logger.info("helios_response", JSON.stringify(res));
          let enrichedNonce;
          // Helios returns a boolen parameter: "success"
          // It will be true for all cases where liability is shifted to merchant
          // and false for downstream failures and errors where liability_shift= NO|UNKNOWN.
          authenticationState = success ? "succeeded" : "errored";
          liabilityShift = liability_shift;

          // call BT mutation to update fastlaneNonce with 3ds data
          // reference_id will be available for all usecases(success/failure)
          if (reference_id) {
            const gqlResponse = await this.updateNonceWith3dsData(reference_id);
            const { data, errors } = gqlResponse;
            if (data) {
              enrichedNonce =
                data.updateTokenizedCreditCardWithExternalThreeDSecure
                  .paymentMethod.id;
            } else if (errors && errors[0]) {
              // $FlowFixMe incompatible type payload
              this.logger.warn(JSON.stringify(errors[0]));
            }
          }

          // Resolve the parent promise with enriched nonce if available
          // else, return the original nonce that the merchant sent
          resolve({
            authenticationState,
            liabilityShift,
            nonce: enrichedNonce || this.fastlaneNonce,
          });
        },
        onCancel: cancelThreeDS,
        onError: (err) => {
          instance.close();
          reject(new Error(err));
        },
      });

      // Render the iframe
      instance.render("body").catch(() => {
        instance.close();
      });
    });
  }

  validateMerchantPayload(merchantPayload: MerchantPayloadData): void {
    // TODO we have a ticket to standardize client-side validations
    // eslint-disable-next-line flowtype/no-weak-types
    const isRequired = (value: any) => Boolean(value);
    // eslint-disable-next-line flowtype/no-weak-types
    const isString = (value: any) => typeof value === "string";

    const validations = {
      amount: {
        test: [isString, isRequired],
        message: (value) =>
          `[amount] is required and must be a string. received: ${value}`,
      },
      currency: {
        test: [(value) => value in CURRENCY, isRequired],
        message: (value) =>
          `[currency] is required and must be a valid currency. received: ${value}`,
      },
      nonce: {
        test: [isString, isRequired],
        message: (value) =>
          `[nonce] is required and must be a string. received: ${value}`,
      },
    };

    const errors = [];

    // eslint-disable-next-line flowtype/no-weak-types
    Object.entries(validations).forEach(([key, value]: [string, any]) => {
      const paramValue = merchantPayload[key];

      if (!value.test?.every((validation) => validation(paramValue))) {
        errors.push(value.message(paramValue));
      }
    });

    if (errors.length) {
      const joinedErrors = errors.join("\n");

      this.logger.warn(joinedErrors);
      throw new ValidationError(joinedErrors);
    }
  }

  updateNonceWith3dsData(threeDSRefID: string): Promise<GqlResponse> {
    // $FlowFixMe Zalgopromise not recognized
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
              externalAuthenticationId: threeDSRefID,
            },
          },
        },
      },
    });
  }
}

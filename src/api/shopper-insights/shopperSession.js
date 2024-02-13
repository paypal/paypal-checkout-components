/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */

import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { stringifyError } from "@krakenjs/belter/src";
import { sendCountMetric } from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import {
  ELIGIBLE_PAYMENT_METHODS,
  FPTI_TRANSITION,
  SHOPPER_INSIGHTS_METRIC_NAME,
} from "../../constants/api";
import { ValidationError } from "../../lib";

import {
  validateMerchantPayload,
  hasEmail,
  hasPhoneNumber,
} from "./validation";
import { Fingerprint } from "./fingerprint";

export type MerchantPayloadData = {|
  email?: string,
  phone?: {|
    countryCode?: string,
    nationalNumber?: string,
  |},
|};

type RecommendedPaymentMethods = {|
  isPayPalRecommended: boolean,
  isVenmoRecommended: boolean,
|};

type RecommendedPaymentMethodsRequestData = {|
  customer: {|
    country_code?: string,
    email?: string,
    phone?: {|
      country_code: string,
      national_number: string,
    |},
  |},
  purchase_units: $ReadOnlyArray<{|
    amount: {|
      currency_code: string,
    |},
  |}>,
  preferences: {|
    include_account_details: boolean,
  |},
|};

type RecommendedPaymentMethodsResponse = {|
  body: {|
    eligible_methods: {
      [paymentMethod: "paypal" | "venmo"]: {|
        can_be_vaulted: boolean,
        eligible_in_paypal_network?: boolean,
        recommended?: boolean,
        recommended_priority?: number,
      |},
    },
  |},
|};

type SdkConfig = {|
  sdkToken: ?string,
  pageType: ?string,
  userIDToken: ?string,
  clientToken: ?string,
  paypalApiDomain: string,
  environment: ?string,
  buyerCountry: string,
  currency: string,
|};

// eslint's flow integration is very out of date
// it doesn't recognize the generics here as used
// eslint-disable-next-line no-undef
type Request = <TRequestData, TResponse>({|
  method?: string,
  url: string,
  // eslint-disable-next-line no-undef
  data: TRequestData,
  accessToken: ?string,
  // eslint-disable-next-line no-undef
|}) => Promise<TResponse>;

type Storage = {|
  // eslint's flow integration is very out of date
  // it doesn't recognize the generics here as used
  // eslint-disable-next-line no-undef
  get: <TValue>(key: string) => ?TValue,
  // eslint-disable-next-line flowtype/no-weak-types
  set: (key: string, value: any) => void,
|};

export const createRecommendedPaymentMethodsRequestPayload = ({
  merchantPayload,
  sdkConfig,
}: {|
  merchantPayload: MerchantPayloadData,
  sdkConfig: SdkConfig,
|}): RecommendedPaymentMethodsRequestData => ({
  customer: {
    ...(sdkConfig.environment !== "production" && {
      country_code: sdkConfig.buyerCountry,
    }),
    // $FlowIssue
    ...(hasEmail(merchantPayload) && {
      email: merchantPayload?.email,
    }),
    ...(hasPhoneNumber(merchantPayload) && {
      phone: {
        country_code: merchantPayload?.phone?.countryCode,
        national_number: merchantPayload?.phone?.nationalNumber,
      },
    }),
  },
  purchase_units: [
    {
      amount: {
        currency_code: sdkConfig.currency,
      },
    },
  ],
  // getRecommendedPaymentMethods maps to include_account_details in the API
  preferences: {
    include_account_details: true,
  },
});

export interface ShopperInsightsInterface {
  getRecommendedPaymentMethods: (
    payload: MerchantPayloadData
  ) => Promise<RecommendedPaymentMethods>;
  identify: () => Promise<{||}>;
}

export class ShopperSession {
  fingerprint: Fingerprint;
  logger: LoggerType;
  request: Request;
  requestId: string = "";
  sdkConfig: SdkConfig;
  sessionState: Storage;

  constructor({
    fingerprint,
    logger,
    request,
    sdkConfig,
    sessionState,
  }: {|
    fingerprint: Fingerprint,
    logger: LoggerType,
    request: Request,
    sdkConfig: SdkConfig,
    sessionState: Storage,
  |}) {
    this.fingerprint = fingerprint;
    this.logger = logger;
    this.request = request;
    this.sdkConfig = sdkConfig;
    this.sessionState = sessionState;
  }

  validateSdkConfig() {
    if (!this.sdkConfig.sdkToken) {
      sendCountMetric({
        name: SHOPPER_INSIGHTS_METRIC_NAME,
        event: "error",
        dimensions: {
          errorType: "merchant_configuration_validation_error",
          validationDetails: "sdk_token_not_present",
        },
      });

      throw new ValidationError(
        `script data attribute sdk-client-token is required but was not passed`
      );
    }

    if (!this.sdkConfig.pageType) {
      sendCountMetric({
        name: SHOPPER_INSIGHTS_METRIC_NAME,
        event: "error",
        dimensions: {
          errorType: "merchant_configuration_validation_error",
          validationDetails: "page_type_not_present",
        },
      });

      throw new ValidationError(
        `script data attribute page-type is required but was not passed`
      );
    }

    if (this.sdkConfig.userIDToken) {
      sendCountMetric({
        name: SHOPPER_INSIGHTS_METRIC_NAME,
        event: "error",
        dimensions: {
          errorType: "merchant_configuration_validation_error",
          validationDetails: "sdk_token_and_id_token_present",
        },
      });

      throw new ValidationError(
        `use script data attribute sdk-client-token instead of user-id-token`
      );
    }

    // Client token has widely adopted integrations in the SDK that we do not want
    // to support anymore. For now, we will be only enforcing a warning. We should
    // expand on this warning with upgrade guides when we have them.
    if (this.sdkConfig.clientToken) {
      // eslint-disable-next-line no-console
      console.warn(`script data attribute client-token is not recommended`);
    }
  }

  async getRecommendedPaymentMethods(
    merchantPayload: MerchantPayloadData
  ): Promise<RecommendedPaymentMethods> {
    validateMerchantPayload(merchantPayload);

    const startTime = Date.now();
    try {
      const { body } = await this.request<
        RecommendedPaymentMethodsRequestData,
        RecommendedPaymentMethodsResponse
      >({
        method: "POST",
        url: `${this.sdkConfig.paypalApiDomain}/${ELIGIBLE_PAYMENT_METHODS}`,
        data: createRecommendedPaymentMethodsRequestPayload({
          merchantPayload,
          sdkConfig: this.sdkConfig,
        }),
        accessToken: this.sdkConfig.sdkToken,
      });

      this.sessionState.set("shopperInsights", {
        getRecommendedPaymentMethodsUsed: true,
      });

      const { paypal, venmo } = body?.eligible_methods;

      const isPayPalRecommended =
        (paypal?.eligible_in_paypal_network && paypal?.recommended) || false;
      const isVenmoRecommended =
        (venmo?.eligible_in_paypal_network && venmo?.recommended) || false;

      this.logger.track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
      });

      sendCountMetric({
        name: SHOPPER_INSIGHTS_METRIC_NAME,
        event: "success",
        dimensions: {
          isPayPalRecommended: String(isPayPalRecommended),
          isVenmoRecommended: String(isVenmoRecommended),
        },
      });

      return { isPayPalRecommended, isVenmoRecommended };
    } catch (error) {
      sendCountMetric({
        name: SHOPPER_INSIGHTS_METRIC_NAME,
        event: "error",
        dimensions: {
          errorType: "api_error",
        },
      });

      this.logger.track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
        [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_ERROR,
        [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
      });

      this.logger.error("shopper_insights_api_error", {
        err: stringifyError(error),
      });

      throw error;
    }
  }

  async identify(): Promise<{||}> {
    const { requestId } = await this.fingerprint.get();

    this.requestId = requestId;

    // $FlowIssue
    return {};
  }
}

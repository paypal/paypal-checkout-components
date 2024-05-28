/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */

import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { stringifyError } from "@krakenjs/belter/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ELIGIBLE_PAYMENT_METHODS, FPTI_TRANSITION } from "../constants/api";
import { ValidationError } from "../lib";

export const shopperInsightsMetricNamespace = "shopper_insights.count";
export const recommendedPaymentsMetricNamespace =
  "shopper_insights.recommended_payments.count";
export const isMemberMetricNamespace = "shopper_insights.is_member.count";

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
  eligible_methods: {
    [paymentMethod: "paypal" | "venmo"]: {|
      can_be_vaulted: boolean,
      eligible_in_paypal_network?: boolean,
      recommended?: boolean,
      recommended_priority?: number,
    |},
  },
|};

type SdkConfig = {|
  sdkToken: ?string,
  pageType: ?string,
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

const parseEmail = (merchantPayload): ?{| email: string |} => {
  if (!merchantPayload.email) {
    return;
  }

  const email = merchantPayload.email;
  const isValidEmail =
    typeof email === "string" && email.length < 320 && /^.+@.+$/.test(email);

  if (!isValidEmail) {
    throw new ValidationError(
      `Expected shopper information to include a valid email format`
    );
  }

  return {
    email,
  };
};

const parsePhone = (
  merchantPayload
): ?{| phone: {| country_code: string, national_number: string |} |} => {
  if (!merchantPayload.phone) {
    return;
  }

  if (
    !merchantPayload.phone.nationalNumber ||
    !merchantPayload.phone.countryCode
  ) {
    throw new ValidationError(
      `Expected phone number for shopper insights to include nationalNumber and countryCode`
    );
  }

  const nationalNumber = merchantPayload.phone.nationalNumber;
  const countryCode = merchantPayload.phone.countryCode;
  const isValidPhone =
    typeof nationalNumber === "string" && /\d{5,}/.test(nationalNumber);

  if (!isValidPhone) {
    throw new ValidationError(
      `Expected shopper information to be a valid phone number format`
    );
  }

  return {
    phone: {
      country_code: countryCode,
      national_number: nationalNumber,
    },
  };
};

export const parseMerchantPayload = ({
  merchantPayload,
  sdkConfig,
}: {|
  merchantPayload: MerchantPayloadData,
  sdkConfig: SdkConfig,
|}): RecommendedPaymentMethodsRequestData => {
  const email = parseEmail(merchantPayload);
  const phone = parsePhone(merchantPayload);

  return {
    customer: {
      ...(sdkConfig.environment !== "production" && {
        country_code: sdkConfig.buyerCountry,
      }),
      // $FlowIssue too many cases?
      ...email,
      ...phone,
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
  };
};

const parseSdkConfig = ({
  sdkConfig,
  logger,
}: {|
  sdkConfig: SdkConfig,
  logger: LoggerType,
|}): SdkConfig => {
  if (!sdkConfig.sdkToken) {
    logger.metricCounter({
      namespace: shopperInsightsMetricNamespace,
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

  if (!sdkConfig.pageType) {
    logger.metricCounter({
      namespace: shopperInsightsMetricNamespace,
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

  return sdkConfig;
};

export interface ShopperInsightsInterface {
  getRecommendedPaymentMethods: (
    payload: MerchantPayloadData
  ) => Promise<RecommendedPaymentMethods>;
  isEligibleInPayPalNetwork: (payload: MerchantPayloadData) => Promise<boolean>;
}

export class ShopperSession {
  logger: LoggerType;
  request: Request;
  requestId: string = "";
  sdkConfig: SdkConfig;
  sessionState: Storage;

  constructor({
    logger,
    request,
    sdkConfig,
    sessionState,
  }: {|
    logger: LoggerType,
    request: Request,
    sdkConfig: SdkConfig,
    sessionState: Storage,
  |}) {
    this.logger = logger;
    this.request = request;
    this.sdkConfig = parseSdkConfig({ sdkConfig, logger });
    this.sessionState = sessionState;
  }

  async isEligibleInPayPalNetwork(
    merchantPayload: MerchantPayloadData
  ): Promise<boolean> {
    const startTime = Date.now();
    const data = parseMerchantPayload({
      merchantPayload,
      sdkConfig: this.sdkConfig,
    });
    try {
      const body = await this.request<
        RecommendedPaymentMethodsRequestData,
        RecommendedPaymentMethodsResponse
      >({
        method: "POST",
        url: `${this.sdkConfig.paypalApiDomain}/${ELIGIBLE_PAYMENT_METHODS}`,
        data,
        accessToken: this.sdkConfig.sdkToken,
      });

      this.sessionState.set("shopperInsights", {
        shopperInsightsIsMemberUsed: true,
      });

      const eligibleMethods = body?.eligible_methods ?? {};
      const eligibleInPaypalNetwork = Object.keys(eligibleMethods).some(
        (paymentMethod) =>
          eligibleMethods[paymentMethod]?.eligible_in_paypal_network
      );

      this.logger.track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
        shopper_insights_is_member: eligibleInPaypalNetwork,
      });

      this.logger.metricCounter({
        namespace: isMemberMetricNamespace,
        event: "success",
        dimensions: {
          eligibleInPaypalNetwork,
        },
      });

      return eligibleInPaypalNetwork;
    } catch (error) {
      this.logger.metricCounter({
        namespace: isMemberMetricNamespace,
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

  async getRecommendedPaymentMethods(
    merchantPayload: MerchantPayloadData
  ): Promise<RecommendedPaymentMethods> {
    const startTime = Date.now();
    const data = parseMerchantPayload({
      merchantPayload,
      sdkConfig: this.sdkConfig,
    });
    try {
      const body = await this.request<
        RecommendedPaymentMethodsRequestData,
        RecommendedPaymentMethodsResponse
      >({
        method: "POST",
        url: `${this.sdkConfig.paypalApiDomain}/${ELIGIBLE_PAYMENT_METHODS}`,
        data,
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

      const fptiRecommendedPaymentPayload = {
        paypal: isPayPalRecommended ? "1" : "0",
        venmo: isVenmoRecommended ? "1" : "0",
      };

      this.logger.track({
        [FPTI_KEY.TRANSITION]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.EVENT_NAME]: FPTI_TRANSITION.SHOPPER_INSIGHTS_API_SUCCESS,
        [FPTI_KEY.RESPONSE_DURATION]: (Date.now() - startTime).toString(),
        [FPTI_KEY.RECOMMENDED_PAYMENT]: JSON.stringify(
          fptiRecommendedPaymentPayload
        ),
      });

      this.logger.metricCounter({
        namespace: recommendedPaymentsMetricNamespace,
        event: "success",
        dimensions: {
          isPayPalRecommended: String(isPayPalRecommended),
          isVenmoRecommended: String(isVenmoRecommended),
        },
      });

      return { isPayPalRecommended, isVenmoRecommended };
    } catch (error) {
      this.logger.metricCounter({
        namespace: recommendedPaymentsMetricNamespace,
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
}

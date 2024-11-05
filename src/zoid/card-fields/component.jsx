/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import type { CrossDomainWindowType } from "@krakenjs/cross-domain-utils/src";
import { memoize, uniqueID } from "@krakenjs/belter/src";
import {
  getLocale,
  getEnv,
  getSDKMeta,
  getDisableCard,
  getPayPalDomain,
  getClientID,
  getDebug,
  getCurrency,
  getIntent,
  getCommit,
  getVault,
  getCorrelationID,
  getPartnerAttributionID,
  getMerchantID,
  getUserIDToken,
  getSDKToken,
  getClientMetadataID,
  isPayPalDomain,
} from "@paypal/sdk-client/src";
import { getRefinedFundingEligibility } from "@paypal/funding-components/src";
import {
  CARD,
  CURRENCY,
  INTENT,
  type FundingEligibilityType,
} from "@paypal/sdk-constants/src";

import { getSessionID, ValidationError } from "../../lib";

import { CardPrerender } from "./prerender";

const CARD_FIELD_TYPE = {
  SINGLE: "single",
  NUMBER: "number",
  CVV: "cvv",
  EXPIRY: "expiry",
  NAME: "name",
  POSTAL: "postal",
};

type InstallmentsConfiguration = {|
  financingCountryCode: string,
  currencyCode: string,
  billingCountryCode: string,
  amount: string,
  includeBuyerInstallments?: boolean,
|};

type CardFieldsProps = {|
  clientID: string,
  style?: {|
    height: number,
    input: {| height: number |},
  |},
  styleOptions?: {|
    disablePrerender?: boolean,
  |},
  env?: string,
  locale?: string,
  nonce: string,
  logLevel: string,
  sessionID: string,
  clientMetadataID: string,
  cardFieldsSessionID: string,
  debug: boolean,
  sdkMeta: string,
  fundingEligibility: FundingEligibilityType,
  disableCard?: $ReadOnlyArray<$Values<typeof CARD>>,
  currency: $Values<typeof CURRENCY>,
  intent: $Values<typeof INTENT>,
  commit: boolean,
  vault: boolean,
  branded?: boolean,
  minLength?: number,
  maxLength?: number,
  onChange?: () => ZalgoPromise<Object> | Object,
  inputEvents?: {|
    onChange?: () => ZalgoPromise<Object> | Object,
    onBlur?: () => ZalgoPromise<Object> | Object,
    onFocus?: () => ZalgoPromise<Object> | Object,
    onInputSubmitRequest?: () => ZalgoPromise<Object> | Object,
  |},
  createOrder: () => ZalgoPromise<string> | string,
  createSubscription?: () => ZalgoPromise<string> | string,
  createVaultSetupToken: () => ZalgoPromise<string>,
  onApprove: (
    {| returnUrl?: string, vaultSetupToken?: string |},
    {| redirect: (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}
  ) => ?ZalgoPromise<void>,
  onError?: () => ZalgoPromise<Object> | Object,
  onComplete: (
    {| returnUrl: string |},
    {| redirect: (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}
  ) => ?ZalgoPromise<void>,
  onCancel?: (
    {| cancelUrl: string |},
    {| redirect: (?CrossDomainWindowType, ?string) => ZalgoPromise<void> |}
  ) => ?ZalgoPromise<void>,
  action: Object,
  sdkCorrelationID: string,
  hcfSessionID: string,
  partnerAttributionID: string,
  merchantID: $ReadOnlyArray<string>,
  sdkToken?: string,
  installments?: {|
    onInstallmentsRequested: () =>
      | InstallmentsConfiguration
      | ZalgoPromise<InstallmentsConfiguration>,
    onInstallmentsAvailable: (Object) => void,
    onInstallmentsError?: (Object) => void,
  |},
|};

type CardFieldProps = {|
  ...CardFieldsProps,

  parent: {|
    props: CardFieldsProps,
  |},
|};

export type CardFieldComponent = ZoidComponent<CardFieldProps>;

type CardFieldsExports = {|
  submit: () => ZalgoPromise<void>,
  setAttribute: () => ZalgoPromise<void>,
  removeAttribute: () => ZalgoPromise<void>,
  addClass: () => ZalgoPromise<void>,
  removeClass: () => ZalgoPromise<void>,
  getState: () => ZalgoPromise<Object>,
|};

type CardFieldsChildren = {|
  NumberField: CardFieldComponent,
  CVVField: CardFieldComponent,
  ExpiryField: CardFieldComponent,
  NameField: CardFieldComponent,
|};

const url = () =>
  `${getPayPalDomain()}${__PAYPAL_CHECKOUT__.__URI__.__CARD_FIELD__}`;

const prerenderTemplate = ({ props, doc }) => {
  const height = props.style?.height ?? props.style?.input?.height ?? null;
  return (
    <CardPrerender
      nonce={props.nonce}
      height={height}
      isDisabled={Boolean(props.styleOptions?.disablePrerender)}
    />
  ).render(dom({ doc }));
};

export type CardFieldsComponent = ZoidComponent<
  CardFieldsProps,
  CardFieldsExports,
  CardFieldsChildren
>;

export const getCardFieldsComponent: () => CardFieldsComponent = memoize(
  (): CardFieldsComponent => {
    const genericCardField = (type) => {
      return create({
        tag: `paypal-card-${type}-field`,
        url,

        dimensions: {
          height: "30px",
          width: "100%",
        },

        attributes: {
          iframe: {
            scrolling: "no",
          },
        },

        autoResize: {
          height: true,
          width: false,
        },

        prerenderTemplate,

        exports: {
          setAttribute: {
            type: "function",
          },
          removeAttribute: {
            type: "function",
          },
          addClass: {
            type: "function",
          },
          removeClass: {
            type: "function",
          },
          clear: {
            type: "function",
          },
          focus: {
            type: "function",
          },
          setMessage: {
            type: "function",
          },
        },

        props: {
          type: {
            type: "string",
            value: () => type,
            queryParam: true,
          },

          clientID: {
            type: "string",
            value: ({ props }) => props.parent.props.clientID,
            queryParam: true,
          },

          sessionID: {
            type: "string",
            value: ({ props }) => props.parent.props.sessionID,
            queryParam: true,
          },

          clientMetadataID: {
            type: "string",
            required: false,
            queryParam: true,
            value: ({ props }) => props.parent.props.clientMetadataID,
          },

          createOrder: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.createOrder,
          },

          ...(isPayPalDomain() && {
            createSubscription: {
              type: "function",
              required: false,
              value: ({ props }) => {
                if (
                  props.parent.props.createSubscription &&
                  !props.parent.props.sdkToken
                ) {
                  throw new ValidationError(
                    `SDK Token must be passed in for createSubscription`
                  );
                }
                return props.parent.props.createSubscription;
              },
            },
          }),

          createVaultSetupToken: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.createVaultSetupToken,
          },

          cardFieldsSessionID: {
            type: "string",
            queryParam: true,
            value: ({ props }) => props.parent.props.cardFieldsSessionID,
          },

          env: {
            type: "string",
            queryParam: true,
            value: ({ props }) => props.parent.props.env,
          },

          debug: {
            type: "boolean",
            value: ({ props }) => props.parent.props.debug,
            queryParam: true,
          },

          locale: {
            type: "object",
            queryParam: true,
            allowDelegate: true,
            value: ({ props }) => props.parent.props.locale,
          },

          onApprove: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.onApprove,
          },

          onError: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.onError,
          },

          onComplete: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.onComplete,
          },

          onCancel: {
            type: "function",
            required: false,
            value: ({ props }) => props.parent.props.onCancel,
          },

          sdkMeta: {
            type: "string",
            queryParam: true,
            value: ({ props }) => props.parent.props.sdkMeta,
          },

          style: {
            type: "object",
            required: false,
            queryParam: true,
            value: ({ props }) => {
              return {
                ...props.parent.props.style,
                // $FlowFixMe
                ...props.style,
              };
            },
          },

          styleOptions: {
            type: "object",
            required: false,
            queryParam: true,
            value: ({ props }) => {
              return {
                ...props.parent.props.styleOptions,
                // $FlowFixMe
                ...props.styleOptions,
              };
            },
          },

          onChange: {
            type: "function",
            required: false,
            value: ({ props }) => {
              if (props.onChange) {
                return props.onChange;
              } else {
                return props.parent.props.onChange;
              }
            },
          },

          inputEvents: {
            type: "object",
            required: false,
            value: ({ props }) => {
              if (props.inputEvents) {
                return props.inputEvents;
              } else {
                return props.parent.props.inputEvents;
              }
            },
          },

          minLength: {
            type: "number",
            required: false,
            value: ({ props }) => props.minLength,
          },

          maxLength: {
            type: "number",
            required: false,
            value: ({ props }) => props.maxLength,
          },

          fundingEligibility: {
            type: "object",
            value: ({ props }) => props.parent.props.fundingEligibility,
          },

          disableCard: {
            type: "array",
            queryParam: "disable-card",
            allowDelegate: true,
            queryValue({ value }): string {
              return value.join(",");
            },
            value: ({ props }) => props.parent.props.disableCard,
          },

          currency: {
            type: "string",
            queryParam: true,
            value: ({ props }) => props.parent.props.currency,
          },

          intent: {
            type: "string",
            queryParam: true,
            value: ({ props }) => props.parent.props.intent,
          },

          commit: {
            type: "boolean",
            queryParam: true,
            value: ({ props }) => props.parent.props.commit,
          },

          vault: {
            type: "boolean",
            queryParam: true,
            value: ({ props }) => props.parent.props.vault,
          },

          branded: {
            type: "boolean",
            queryParam: true,
            required: false,
            value: ({ props }) => props.parent.props.branded,
          },
          sdkCorrelationID: {
            type: "string",
            required: false,
            value: ({ props }) => props.parent.props.sdkCorrelationID,
            queryParam: true,
          },
          hcfSessionID: {
            type: "string",
            required: false,
            value: ({ props }) => props.parent.props.hcfSessionID,
          },
          partnerAttributionID: {
            type: "string",
            required: false,
            value: ({ props }) => props.parent.props.partnerAttributionID,
          },
          merchantID: {
            type: "array",
            queryParam: true,
            value: ({ props }) => props.parent.props.merchantID,
          },
          userIDToken: {
            type: "string",
            default: getUserIDToken,
            required: false,
          },
          sdkToken: {
            type: "string",
            default: getSDKToken,
            required: false,
          },
          installments: {
            type: "object",
            required: false,
            value: ({ props }) => props.parent.props.installments,
          },
        },
      });
    };

    const NumberField = genericCardField(CARD_FIELD_TYPE.NUMBER);
    const CVVField = genericCardField(CARD_FIELD_TYPE.CVV);
    const ExpiryField = genericCardField(CARD_FIELD_TYPE.EXPIRY);
    const NameField = genericCardField(CARD_FIELD_TYPE.NAME);
    // TODO: Once the Billing address Fields have been built out
    // add the postal code field as a child to the CardFields
    // component along with the other billing address fields
    // eslint-disable-next-line no-unused-vars
    const PostalCodeField = genericCardField(CARD_FIELD_TYPE.POSTAL);

    const CardFields = create({
      tag: "paypal-card-fields",
      url,

      dimensions: {
        height: "30px",
        width: "100%",
      },

      attributes: {
        iframe: {
          scrolling: "no",
        },
      },

      autoResize: {
        height: true,
        width: false,
      },

      prerenderTemplate,

      children: () => {
        return {
          NumberField,
          CVVField,
          ExpiryField,
          NameField,
        };
      },

      exports: {
        submit: {
          type: "function",
        },
        setAttribute: {
          type: "function",
        },
        removeAttribute: {
          type: "function",
        },
        addClass: {
          type: "function",
        },
        removeClass: {
          type: "function",
        },
        clear: {
          type: "function",
        },
        focus: {
          type: "function",
        },
        getState: {
          type: "function",
        },
      },

      eligible: () => {
        const fundingEligibility = getRefinedFundingEligibility();
        if (
          fundingEligibility?.card?.eligible &&
          !fundingEligibility.card.branded
        ) {
          return {
            eligible: true,
          };
        }
        return {
          eligible: false,
          reason: "card payments are not eligible",
        };
      },

      props: {
        type: {
          type: "string",
          value: () => CARD_FIELD_TYPE.SINGLE,
          queryParam: true,
        },

        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },

        sessionID: {
          type: "string",
          required: false,
          value: getSessionID,
          queryParam: true,
        },

        clientMetadataID: {
          type: "string",
          required: false,
          default: ({ props }) => {
            const clientMetadataId = getClientMetadataID();

            return clientMetadataId ? clientMetadataId : props.sessionID;
          },
          queryParam: true,
        },

        createOrder: {
          type: "function",
          required: false,
        },

        ...(isPayPalDomain() && {
          createSubscription: {
            type: "function",
            required: false,
            value: ({ props }) => {
              if (props.createSubscription && !props.sdkToken) {
                throw new ValidationError(
                  `SDK Token must be passed in for createSubscription`
                );
              }
              return props.createSubscription;
            },
          },
        }),

        createVaultSetupToken: {
          type: "function",
          required: false,
        },

        cardFieldsSessionID: {
          type: "string",
          queryParam: true,
          value: uniqueID,
        },

        env: {
          type: "string",
          queryParam: true,
          value: getEnv,
        },

        debug: {
          type: "boolean",
          value: getDebug,
          queryParam: true,
        },

        locale: {
          type: "object",
          queryParam: true,
          allowDelegate: true,
          value: getLocale,
        },

        onApprove: {
          type: "function",
          required: false,
        },

        onError: {
          type: "function",
          required: false,
        },

        onComplete: {
          type: "function",
          required: false,
        },

        onCancel: {
          type: "function",
          required: false,
        },

        sdkMeta: {
          type: "string",
          queryParam: true,
          value: getSDKMeta,
        },

        style: {
          type: "object",
          required: false,
          queryParam: true,
        },

        onChange: {
          type: "function",
          required: false,
        },

        inputEvents: {
          type: "object",
          required: false,
        },

        minLength: {
          type: "number",
          required: false,
          value: ({ props }) => props.minLength,
        },

        maxLength: {
          type: "number",
          required: false,
          value: ({ props }) => props.maxLength,
        },

        fundingEligibility: {
          type: "object",
          value: getRefinedFundingEligibility,
        },

        disableCard: {
          type: "array",
          queryParam: "disable-card",
          allowDelegate: true,
          queryValue({ value }): string {
            return value.join(",");
          },
          value: getDisableCard,
        },

        currency: {
          type: "string",
          queryParam: true,
          value: getCurrency,
        },

        intent: {
          type: "string",
          queryParam: true,
          value: getIntent,
        },

        commit: {
          type: "boolean",
          queryParam: true,
          value: getCommit,
        },

        vault: {
          type: "boolean",
          queryParam: true,
          value: getVault,
        },

        branded: {
          type: "boolean",
          queryParam: true,
          required: false,
        },
        sdkCorrelationID: {
          type: "string",
          required: false,
          value: getCorrelationID,
          queryParam: true,
        },
        hcfSessionID: {
          type: "string",
          required: false,
          value: uniqueID,
        },
        partnerAttributionID: {
          type: "string",
          required: false,
          value: getPartnerAttributionID,
        },
        merchantID: {
          type: "array",
          queryParam: true,
          value: getMerchantID,
        },
        userIDToken: {
          type: "string",
          default: getUserIDToken,
          required: false,
        },
        sdkToken: {
          type: "string",
          default: getSDKToken,
          required: false,
        },
        installments: {
          type: "object",
          required: false,
        },
      },
    });

    return CardFields;
  }
);

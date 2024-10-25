/* @flow */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-restricted-globals, promise/no-native */
import { type LoggerType } from "@krakenjs/beaver-logger/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

type MerchantPayloadData = {|
  amount: string,
  currency: string,
  nonce: string,
  threeDSRequested?: boolean,
  transactionContext?: Object,
|};

// eslint-disable-next-line no-undef
type Request = <TRequestData, TResponse>({|
  method?: string,
  url: string,
  // eslint-disable-next-line no-undef
  data: TRequestData,
  accessToken: ?string,
  // eslint-disable-next-line no-undef
|}) => Promise<TResponse>;

type requestData = {|
  intent: "THREE_DS_VERIFICATION",
  payment_source: {|
    card: {|
      single_use_token: string,
      verification_method: string,
    |},
  |},
  amount: {|
    currency_code: string,
    value: string,
  |},
  transaction_context?: {|
    soft_descriptor?: string,
  |},
|};

type responseBody = {|
  payment_id: string,
  status: string,
  intent: string,
  payment_source: {|
    card: {|
      last_digits: string,
      type: string,
      name: string,
      expiry: string,
    |},
  |},
  amount: {|
    currency_code: string,
    value: string,
  |},
  transaction_context: {|
    soft_descriptor: string,
  |},
  links: $ReadOnlyArray<{|
    href: string,
    rel: string,
    method: string,
  |}>,
|};

type SdkConfig = {|
  authenticationToken: ?string,
  paypalApiDomain: string,
|};

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
  isEligible(): Promise<boolean>;
  show(): ZoidComponent<void>;
}
export class ThreeDomainSecureComponent {
  logger: LoggerType;
  request: Request;
  sdkConfig: SdkConfig;
  authenticationURL: string;

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
    const data = parseMerchantPayload({ merchantPayload });
    try {
      // $FlowFixMe
      const { status, links } = await this.request<requestData, responseBody>({
        method: "POST",
        url: `${this.sdkConfig.paypalApiDomain}/v2/payments/payment`,
        data,
        accessToken: this.sdkConfig.authenticationToken,
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

  show() {
    return inlineMemoize(getThreeDomainSecureComponent, () => {
      const component = create({
        tag: "three-domain-secure",
        url: getThreeDomainSecureUrl,

        attributes: {
          iframe: {
            scrolling: "no",
          },
        },

        containerTemplate: ({
          context,
          focus,
          close,
          frame,
          prerenderFrame,
          doc,
          event,
          props,
        }) => {
          console.log("$$$$ props", props);
          return (
            <Overlay
              context={context}
              close={close}
              focus={focus}
              event={event}
              frame={frame}
              prerenderFrame={prerenderFrame}
              content={props.content}
              nonce={props.nonce}
            />
          ).render(dom({ doc }));
        },

        props: {
          action: {
            type: "string",
            queryParam: true,
            value: (data) => (data.props.action ? data.props.action : "verify"),
          },
          xcomponent: {
            type: "string",
            queryParam: true,
            value: () => "1",
          },
          flow: {
            type: "string",
            queryParam: true,
            value: () => "3ds",
          },
          createOrder: {
            type: "function",
            queryParam: "cart_id",
            // $FlowFixMe[incompatible-call]
            queryValue: ({ value }) => ZalgoPromise.try(value),
            required: false,
          },
          vaultToken: {
            type: "string",
            queryParam: "token",
            // We do not need to add queryValue here.
            // This code has gone through E2E approval and so we are keeping it as a safeguard
            // Refer zoid documentation for further clarity.
            queryValue: ({ value }) => value,
            required: false,
          },
          clientID: {
            type: "string",
            value: getClientID,
            queryParam: true,
          },
          onCancel: {
            type: "function",
            required: false,
          },
          onSuccess: {
            type: "function",
            alias: "onContingencyResult",
            decorate: ({ props, value, onError }) => {
              return (err, result) => {
                const isCardFieldFlow = props?.userType === "UNBRANDED_GUEST";

                // HostedFields ONLY rejects when the err object is not null. The below implementation ensures that CardFields follows the same pattern.

                const hasError = isCardFieldFlow
                  ? Boolean(err)
                  : // $FlowFixMe[incompatible-use]
                    Boolean(err) || result?.success === false;

                if (hasError) {
                  return onError(err);
                }

                return value(result);
              };
            },
          },
          sdkMeta: {
            type: "string",
            queryParam: true,
            sendToChild: false,
            value: getSDKMeta,
          },
          content: {
            type: "object",
            required: false,
          },
          userType: {
            type: "string",
            required: false,
          },
          nonce: {
            type: "string",
            default: getCSPNonce,
          },
        },
      });

      if (component.isChild()) {
        window.xchild = {
          props: component.xprops,
          close: noop,
        };
      }

      return component;
    });
  }
}

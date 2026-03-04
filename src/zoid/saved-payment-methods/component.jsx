/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import {
  getLogger,
  getLocale,
  getClientID,
  getEnv,
  getMerchantID,
  getPayPalDomainRegex,
  getSDKMeta,
  getCSPNonce,
  getPayPalDomain,
  getVersion,
  getCurrency,
  getUserIDToken,
} from "@paypal/sdk-client/src";
import { create, EVENT, type ZoidComponent } from "@krakenjs/zoid/src";
import { uniqueID, memoize } from "@krakenjs/belter/src";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";

import { getSessionID } from "../../lib";

import { containerTemplate } from "./container";
import { PrerenderedSavedPaymentMethods } from "./prerender";
import { type SavedPaymentMethodsProps } from "./props";
import { getSavedPaymentMethodsSize } from "./util";

export type SavedPaymentMethodsComponent = ZoidComponent<
  SavedPaymentMethodsProps,
  void,
  void,
  void
>;

// $FlowIssue
export const getSavedPaymentMethodsComponent: () => SavedPaymentMethodsComponent =
  memoize(() => {
    // $FlowIssue
    return create({
      tag: "paypal-saved-payment-methods",
      url: () =>
        `${getPayPalDomain()}${
          __PAYPAL_CHECKOUT__.__URI__.__SAVED_PAYMENT_METHODS__ ||
          "/smart/saved-payment-methods"
        }`,

      domain: getPayPalDomainRegex(),

      autoResize: {
        width: false,
        height: true,
      },

      dimensions: getSavedPaymentMethodsSize(),

      containerTemplate,

      // $FlowIssue mismatch between beaver-logger and zoid logger types
      logger: getLogger(),

      prerenderTemplate: ({ props, doc, event }) => {
        const { buttonSessionID } = props;

        event.on(EVENT.PRERENDERED, () => {
          getLogger()
            .info("saved_payment_methods_prerendered", {
              buttonSessionID,
            })
            .flush();
        });

        return (
          <PrerenderedSavedPaymentMethods nonce={props.nonce} props={props} />
        ).render(dom({ doc }));
      },

      attributes: {
        iframe: {
          scrolling: "no",
          title: "PayPal Saved Payment Methods",
        },
      },

      props: {
        buttonSessionID: {
          type: "string",
          value: uniqueID,
          queryParam: true,
        },

        clientID: {
          type: "string",
          value: getClientID,
          queryParam: true,
        },

        env: {
          type: "string",
          queryParam: true,
          value: getEnv,
        },

        locale: {
          type: "object",
          queryParam: true,
          value: getLocale,
        },

        merchantID: {
          type: "array",
          queryParam: true,
          value: getMerchantID,
        },

        message: {
          // TODO: Does it need `value`or `validate` function?
          type: "object",
          required: false,
          queryParam: false,
        },

        // currency: {
        //   type: "string",
        //   queryParam: true,
        //   value: getCurrency,
        // },

        // amount: {
        //   type: "string",
        //   required: false,
        //   queryParam: true,
        // },

        userIDToken: {
          type: "string",
          required: false,
          queryParam: true,
          value: getUserIDToken,
        },

        nonce: {
          type: "string",
          default: getCSPNonce,
        },

        // wallet: {
        //   type: "object",
        //   required: false,
        //   default: () => window.__TEST_WALLET__,
        // },

        // content: {
        //   type: "object",
        //   required: false,
        // },

        onError: {
          type: "function",
          required: false,
        },

        createOrder: {
          type: "function",
          required: false,
        },

        onApprove: {
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
          sendToChild: false,
          value: getSDKMeta,
        },

        sdkVersion: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getVersion,
        },

        sessionID: {
          type: "string",
          value: getSessionID,
          queryParam: true,
        },

        style: {
          type: "object",
          queryParam: true,
          required: false,
          default: () => ({}),
        },
      },
    });
  });

/* @flow */
/** @jsx node */

import { inlineMemoize, uniqueID } from "@krakenjs/belter/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import {
  getLogger,
  getPayPalDomainRegex,
  getPayPalDomain,
  getCSPNonce,
  getSDKMeta,
  getDebug,
  getEnv,
  getSessionID,
  getLocale,
  getClientID,
  getCorrelationID,
  getBuyerCountry,
} from "@paypal/sdk-client/src";

import { containerTemplate } from "./container";
import { prerenderTemplate } from "./prerender";
import { type QRCodeProps } from "./types";

export type QRCodeComponent = ZoidComponent<QRCodeProps>;

export function getQRCodeComponent(): QRCodeComponent {
  return inlineMemoize(getQRCodeComponent, () => {
    return create({
      tag: "paypal-qr-modal",
      url: ({ props }) =>
        `${getPayPalDomain()}${__PAYPAL_CHECKOUT__.__URI__.__QRCODE__}?${
          props.qrPath
        }`,
      domain: getPayPalDomainRegex(),
      dimensions: {
        width: "100%",
        height: "100%",
      },

      // 2023-08-23 Shane Brunson
      // I don't think Zoid uses this logger prop and I don't think we the SDK
      // use it anywhere either. I'm trying to fix the main branch from building
      // though and removing all these logger calls is more of risky change than
      // I'm willing to make right now though.
      // $FlowIssue mismatch between beaver-logger and zoid logger type
      logger: getLogger(),
      prerenderTemplate,

      containerTemplate,
      autoResize: {
        width: true,
        height: true,
      },
      attributes: {
        iframe: {
          scrolling: "no",
        },
      },
      props: {
        qrPath: {
          type: "string",
          queryParam: true,
          required: true,
        },
        cspNonce: {
          type: "string",
          queryParam: false,
          required: false,
          value: getCSPNonce,
        },
        debug: {
          type: "boolean",
          value: getDebug,
          queryParam: true,
          required: false,
        },
        state: {
          type: "string",
          queryParam: false,
          required: false,
        },
        errorText: {
          type: "string",
          queryParam: false,
          required: false,
        },
        sdkMeta: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getSDKMeta,
        },
        env: {
          type: "string",
          queryParam: true,
          required: false,
          value: getEnv,
        },
        sessionID: {
          type: "string",
          queryParam: true,
          required: false,
          value: getSessionID,
        },
        locale: {
          type: "object",
          queryParam: true,
          required: false,
          value: getLocale,
        },
        clientID: {
          type: "string",
          queryParam: true,
          required: false,
          value: getClientID,
        },
        orderID: {
          type: "string",
          queryParam: true,
          required: false,
        },
        sdkCorrelationID: {
          type: "string",
          required: false,
          value: getCorrelationID,
          queryParam: true,
        },
        buyerCountry: {
          type: "string",
          queryParam: true,
          required: false,
          value: getBuyerCountry,
        },
        buttonSessionID: {
          type: "string",
          queryParam: true,
          required: false,
          value: uniqueID,
        },
      },
    });
  });
}

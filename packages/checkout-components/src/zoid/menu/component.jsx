/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import {
  getLogger,
  getPayPalDomainRegex,
  getSDKMeta,
  getPayPalDomain,
} from "@paypal/sdk-client/src";
import { create, type ZoidComponent } from "@krakenjs/zoid/src";
import { inlineMemoize } from "@krakenjs/belter/src";

import { type MenuProps } from "./props";

export type MenuComponent = ZoidComponent<MenuProps>;

export function getMenuComponent(): MenuComponent {
  return inlineMemoize(getMenuComponent, () => {
    return create({
      tag: "paypal-menu",
      url: () => `${getPayPalDomain()}${__PAYPAL_CHECKOUT__.__URI__.__MENU__}`,

      domain: getPayPalDomainRegex(),

      autoResize: {
        width: false,
        height: true,
      },

      dimensions: {
        width: "100%",
        height: "150px",
      },

      // 2023-08-23 Shane Brunson
      // I don't think Zoid uses this logger prop and I don't think we the SDK
      // use it anywhere either. I'm trying to fix the main branch from building
      // though and removing all these logger calls is more of risky change than
      // I'm willing to make right now though.
      // $FlowIssue mismatch between beaver-logger and zoid logger type
      logger: getLogger(),

      prerenderTemplate: () => {
        return null;
      },

      attributes: {
        iframe: {
          scrolling: "no",
        },
      },

      props: {
        sdkMeta: {
          type: "string",
          queryParam: true,
          sendToChild: false,
          value: getSDKMeta,
        },

        clientID: {
          type: "string",
          queryParam: true,
        },
      },
    });
  });
}

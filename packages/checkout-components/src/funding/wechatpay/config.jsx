/* @flow */
/** @jsx node */

import {
  WechatpayLogoInlineSVG,
  WechatpayLogoExternalImage,
} from "@paypal/sdk-logos/src";
import { Fragment, node } from "@krakenjs/jsx-pragmatic/src";

import { BUTTON_LAYOUT } from "../../constants";
import {
  DEFAULT_APM_FUNDING_CONFIG,
  type FundingSourceConfig,
  BasicLabel,
} from "../common";
import { Text, Space } from "../../ui/text";

export function getWechatpayConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_APM_FUNDING_CONFIG,

    shippingChange: false,

    layouts: [BUTTON_LAYOUT.VERTICAL],

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return WechatpayLogoExternalImage({ logoColor, optional });
      }

      return WechatpayLogoInlineSVG({ logoColor, optional });
    },

    Label: ({ logo, ...opts }) => {
      if (__WEB__) {
        return logo;
      }

      const apmLogo = (
        <Fragment>
          {logo}
          <Space />
          <Text animate optional>
            WeChat Pay
          </Text>
        </Fragment>
      );

      return <BasicLabel {...opts} logo={apmLogo} />;
    },
  };
}

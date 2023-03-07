/* @flow */
/** @jsx node */

import {
  PayuLogoInlineSVG,
  PayuLogoExternalImage,
} from "@paypal/sdk-logos/src";
import { Fragment, node } from "@krakenjs/jsx-pragmatic/src";

import { BUTTON_LAYOUT } from "../../constants";
import {
  DEFAULT_APM_FUNDING_CONFIG,
  type FundingSourceConfig,
  BasicLabel,
} from "../common";
import { Text, Space } from "../../ui/text";

export function getPayuConfig(): FundingSourceConfig {
  return {
    ...DEFAULT_APM_FUNDING_CONFIG,

    automatic: false,

    layouts: [BUTTON_LAYOUT.VERTICAL],

    shippingChange: false,

    Logo: ({ logoColor, optional }) => {
      if (__WEB__) {
        return PayuLogoExternalImage({ logoColor, optional });
      }

      return PayuLogoInlineSVG({ logoColor, optional });
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
            PayU
          </Text>
        </Fragment>
      );

      return <BasicLabel {...opts} logo={apmLogo} />;
    },
  };
}

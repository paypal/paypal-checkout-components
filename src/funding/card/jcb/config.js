/* @flow */

import { JcbLogoInlineSVG, JcbLogoExternalImage } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getJCBConfig(): CardConfig {
  return {
    Label: __WEB__ ? JcbLogoExternalImage : JcbLogoInlineSVG,
  };
}

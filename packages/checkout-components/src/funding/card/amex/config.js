/* @flow */

import {
  AmexLogoInlineSVG,
  AmexLogoExternalImage,
} from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getAmexConfig(): CardConfig {
  return {
    Label: __WEB__ ? AmexLogoExternalImage : AmexLogoInlineSVG,
  };
}

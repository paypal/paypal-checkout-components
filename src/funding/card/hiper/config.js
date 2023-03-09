/* @flow */

import {
  HiperLogoInlineSVG,
  HiperLogoExternalImage,
} from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getHiperConfig(): CardConfig {
  return {
    Label: __WEB__ ? HiperLogoExternalImage : HiperLogoInlineSVG,
  };
}

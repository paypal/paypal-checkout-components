/* @flow */

import {
  MastercardLogoInlineSVG,
  MastercardLogoExternalImage,
} from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getMastercardConfig(): CardConfig {
  return {
    Label: __WEB__ ? MastercardLogoExternalImage : MastercardLogoInlineSVG,
  };
}

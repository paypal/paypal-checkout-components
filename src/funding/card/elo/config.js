/* @flow */

import { EloLogoInlineSVG, EloLogoExternalImage } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getEloConfig(): CardConfig {
  return {
    Label: __WEB__ ? EloLogoExternalImage : EloLogoInlineSVG,
  };
}

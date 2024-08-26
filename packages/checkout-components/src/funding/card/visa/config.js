/* @flow */

import {
  VisaLogoInlineSVG,
  VisaLogoExternalImage,
} from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getVisaConfig(): CardConfig {
  return {
    Label: __WEB__ ? VisaLogoExternalImage : VisaLogoInlineSVG,
  };
}

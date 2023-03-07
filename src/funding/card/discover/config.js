/* @flow */

import {
  DiscoverLogoInlineSVG,
  DiscoverLogoExternalImage,
} from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";

export function getDiscoverConfig(): CardConfig {
  return {
    Label: __WEB__ ? DiscoverLogoExternalImage : DiscoverLogoInlineSVG,
  };
}

/* @flow */

import { DiscoverLogo } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";
import { enableLogoCDNExperiment } from "../../../lib/getLogoCDNExperiment";

export function getDiscoverConfig(): CardConfig {
  return {
    Label: () => enableLogoCDNExperiment(DiscoverLogo),
  };
}

/* @flow */

import { EloLogo } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";
import { enableLogoCDNExperiment } from "../../../lib/getLogoCDNExperiment";

export function getEloConfig(): CardConfig {
  return {
    Label: () => enableLogoCDNExperiment(EloLogo),
  };
}

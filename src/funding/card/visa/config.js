/* @flow */

import { VisaLogo } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";
import { enableLogoCDNExperiment } from "../../../lib/getLogoCDNExperiment";

export function getVisaConfig(): CardConfig {
  return {
    Label: () => enableLogoCDNExperiment(VisaLogo),
  };
}

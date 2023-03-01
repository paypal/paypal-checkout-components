/* @flow */

import { MastercardLogo } from "@paypal/sdk-logos/src";

import type { CardConfig } from "../../common";
import { enableLogoCDNExperiment } from "../../../lib/getLogoCDNExperiment";

export function getMastercardConfig(): CardConfig {
  return {
    Label: () => enableLogoCDNExperiment(MastercardLogo),
  };
}

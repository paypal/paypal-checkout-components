/* @flow */

import { createExperiment } from "@paypal/sdk-client/src";
import type { Experiment } from "@krakenjs/belter/src";

export function getLogoCDNExperiment(): Experiment {
  return createExperiment("enable_logo_cdn", 50);
}

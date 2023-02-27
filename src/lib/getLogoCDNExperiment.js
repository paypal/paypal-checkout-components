/* @flow */

import { createExperiment } from "@paypal/sdk-client/src";
import type { Experiment } from "@krakenjs/belter/src";
import type { ChildType } from "@krakenjs/jsx-pragmatic/src";

export function getLogoCDNExperiment(): Experiment {
  return createExperiment("enable_logo_cdn_experiment", 100);
}

export function enableLogoCDNExperiment<T>(
  logo: (T) => ChildType,
  logoOptions: T
): ChildType {
  // enable logo CDN experiment for first render only
  if (__WEB__) {
    const logoCDNExperiment = getLogoCDNExperiment();
    const loadFromCDN = logoCDNExperiment.isEnabled();

    return logo({ ...logoOptions, loadFromCDN });
  }

  // continue using inline svg for second render
  return logo(logoOptions);
}

/* @flow */

import { createExperiment } from "@paypal/sdk-client/src";
import type { Experiment } from "@krakenjs/belter/src";
import type { ChildType } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src";

export function getLogoCDNExperiment(): Experiment {
  return createExperiment("enable_logo_cdn", 100);
}

type LogoProps = {|
  logoColor?: $Values<typeof LOGO_COLOR>,
  optional: void | boolean,
  loadFromCDN?: boolean,
|};

export function enableLogoCDNExperiment(
  logo: (LogoProps) => ChildType,
  logoOptions: LogoProps
): ChildType {
  if (__WEB__) {
    const logoCDNExperiment = getLogoCDNExperiment();
    const loadFromCDN = logoCDNExperiment.isEnabled();

    return logo({ ...logoOptions, loadFromCDN });
  }

  return logo(logoOptions);
}

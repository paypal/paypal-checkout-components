/* @flow */

import { createExperiment } from "@paypal/sdk-client/src";
import type { Experiment } from "@krakenjs/belter/src";
import type { ChildType } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src";
import type { LocaleType } from "@paypal/sdk-constants/src";

export function getLogoCDNExperiment(): Experiment {
  return createExperiment("enable_logo_cdn", 100);
}

type LogoProps = {|
  logoColor?: $Values<typeof LOGO_COLOR>,
  optional?: void | boolean,
  locale?: LocaleType,
  loadFromCDN?: boolean,
|};

export function enableLogoCDNExperiment(
  logo: (LogoProps) => ChildType,
  logoOptions: LogoProps
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

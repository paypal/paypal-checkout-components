/* @flow */
/** @jsx node */

import { node, Style, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import { ApplePayMark } from "@paypal/sdk-logos/src";

import { enableLogoCDNExperiment } from "../../lib/getLogoCDNExperiment";

import css from "./style.scoped.scss";

export function Mark({ ...props }: {||}): ChildType {
  return (
    <Style css={css}>{enableLogoCDNExperiment(ApplePayMark, props)}</Style>
  );
}

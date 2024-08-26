/* @flow */
/** @jsx node */

import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import { type FundingEligibilityType } from "@paypal/sdk-constants/src";

import { type ButtonStyle } from "./props";
import { componentStyle } from "./styles";

type StyleProps = {|
  style: ButtonStyle,
  nonce: string,
  fundingEligibility: FundingEligibilityType,
|};

export function Style({
  style,
  nonce,
  fundingEligibility,
}: StyleProps): ElementNode {
  const { height, disableMaxWidth, disableMaxHeight, borderRadius } = style;
  const css = componentStyle({
    height,
    fundingEligibility,
    disableMaxWidth,
    disableMaxHeight,
    borderRadius,
  });

  return <style nonce={nonce} innerHTML={css} />;
}

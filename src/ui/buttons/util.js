/* @flow */
import { FUNDING } from "@paypal/sdk-constants/src";

import { BUTTON_LAYOUT, MESSAGE_POSITION } from "../../constants";
import { ValidationError } from "../../lib";
import { determineEligibleFunding } from "../../funding";

import type { ButtonMessage } from "./props";

export function isBorderRadiusNumber(borderRadius?: number): boolean {
  return typeof borderRadius === "number";
}

type calculateMessagePositionProps = {|
  message: ButtonMessage | void,
  showPoweredBy: boolean,
  layout: string,
|};

export function calculateMessagePosition({
  message,
  showPoweredBy,
  layout,
}: calculateMessagePositionProps): string {
  if (!message) {
    return "none";
  }
  const { position } = message;

  if (showPoweredBy && position === MESSAGE_POSITION.BOTTOM) {
    throw new ValidationError(
      "Message position must be 'top' when Debit and/or Credit Card button is present"
    );
  }

  if (
    showPoweredBy ||
    position === MESSAGE_POSITION.TOP ||
    (layout === BUTTON_LAYOUT.VERTICAL && !position)
  ) {
    return MESSAGE_POSITION.TOP;
  }
  return MESSAGE_POSITION.BOTTOM;
}

export function calculateShowPoweredBy({ layout, fundingSources }): boolean {
  return (
    layout === BUTTON_LAYOUT.VERTICAL && fundingSources.includes(FUNDING.CARD)
  );
}

export function getCalculatedMessagePositionInProps(props): string {
  const {
    fundingSource,
    style: { layout },
    remembered,
    platform,
    fundingEligibility,
    enableFunding,
    components,
    onShippingChange,
    flow,
    wallet,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    experiment,
    displayOnly,
    message,
  } = props;

  // get showPoweredBy value
  const fundingSources = determineEligibleFunding({
    fundingSource,
    layout,
    remembered,
    platform,
    fundingEligibility,
    enableFunding,
    components,
    onShippingChange,
    flow,
    wallet,
    applePaySupport,
    supportsPopups,
    supportedNativeBrowser,
    experiment,
    displayOnly,
  });

  const showPoweredBy = calculateShowPoweredBy({ layout, fundingSources });

  return calculateMessagePosition({
    message,
    showPoweredBy,
    layout,
  });
}

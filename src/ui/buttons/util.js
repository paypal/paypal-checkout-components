/* @flow */
import { COUNTRY, FUNDING } from "@paypal/sdk-constants/src";

import { BUTTON_LABEL, BUTTON_LAYOUT, MESSAGE_POSITION } from "../../constants";
import { ValidationError } from "../../lib";

export function isBorderRadiusNumber(borderRadius?: number): boolean {
  return typeof borderRadius === "number";
}

export function calculateShowPoweredBy(
  layout: $Values<typeof BUTTON_LAYOUT>,
  fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>
): boolean {
  return (
    layout === BUTTON_LAYOUT.VERTICAL && fundingSources.includes(FUNDING.CARD)
  );
}

export function calculateMessagePosition(
  fundingSources: $ReadOnlyArray<$Values<typeof FUNDING>>,
  layout: $Values<typeof BUTTON_LAYOUT>,
  position?: $Values<typeof MESSAGE_POSITION>
): $Values<typeof MESSAGE_POSITION> {
  const showPoweredBy = calculateShowPoweredBy(layout, fundingSources);

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

export function checkLabelEligibility(
  label?: $Values<typeof BUTTON_LABEL>,
  buyerCountry: $Values<typeof COUNTRY>
): $Values<typeof BUTTON_LABEL> | typeof undefined {
  const eligibleCountriesForInstallmentLabel = ["BR", "MX"];

  // Don't render the installment label if buyerCountry is not eligible for installment product
  if (
    label === BUTTON_LABEL.INSTALLMENT &&
    !eligibleCountriesForInstallmentLabel.includes(buyerCountry)
  ) {
    return BUTTON_LABEL.PAYPAL;
  }

  return label;
}

/* @flow */
import { BUTTON_LAYOUT, MESSAGE_POSITION } from "../../constants";
import { ValidationError } from "../../lib";

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

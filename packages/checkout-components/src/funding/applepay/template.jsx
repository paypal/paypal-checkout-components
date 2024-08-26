/* @flow */
/** @jsx node */

import { node, Style, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import {
  ApplePayMarkExternalImage,
  ApplePayMarkInlineSVG,
} from "@paypal/sdk-logos/src";

import css from "./style.scoped.scss";

export function Mark({ ...props }: {||}): ChildType {
  return (
    <Style css={css}>
      {__WEB__ ? (
        <ApplePayMarkExternalImage {...props} />
      ) : (
        <ApplePayMarkInlineSVG {...props} />
      )}
    </Style>
  );
}

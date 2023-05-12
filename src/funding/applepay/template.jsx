/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import {
  ApplePayMarkExternalImage,
  ApplePayMarkInlineSVG
} from "@paypal/sdk-logos/src";

import styles from "./style.scoped.scss";

export function Mark({ ...props }: {||}): ChildType {
  return (
    <Fragment>
      {__WEB__ ? (
        <ApplePayMarkExternalImage {...props} />
      ) : (
        <ApplePayMarkInlineSVG {...props} />
      )}
    </Fragment>
  );
}

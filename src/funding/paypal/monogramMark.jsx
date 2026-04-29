/* @flow */
/** @jsx node */

import { node, type ComponentNode } from "@krakenjs/jsx-pragmatic/src";
import { PPRebrandLogoExternalImage } from "@paypal/sdk-logos/src";
import { LOGO_COLOR } from "@paypal/sdk-logos/src/constants";

export function PayPalMonogramMark(): ComponentNode<{| logoColor: string |}> {
  return <PPRebrandLogoExternalImage logoColor={LOGO_COLOR.BLUE} />;
}

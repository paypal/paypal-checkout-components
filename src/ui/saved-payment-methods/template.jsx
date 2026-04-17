/* @flow */
/** @jsx node */

import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";

import { SavedPaymentMethodsLoadingBody } from "./loading-body";
import { validateSavedPaymentMethodsStyle } from "../../zoid/saved-payment-methods/util";

export type SavedPaymentMethodsServerRenderProps = {|
  nonce?: string,
  style?: Object,
|};

export function validateSavedPaymentMethodsProps(props: {| style?: Object |}) {
  validateSavedPaymentMethodsStyle(props?.style);
}

/**
 * Server-only render (commonjs2 / web: false) — mirrors smart buttons `Buttons()`.
 * Non-interactive loading shell until the iframe client app hydrates.
 */
export function SavedPaymentMethods(
  props: SavedPaymentMethodsServerRenderProps
): ElementNode {
  return SavedPaymentMethodsLoadingBody({
    nonce: props.nonce,
    style: props.style,
  });
}

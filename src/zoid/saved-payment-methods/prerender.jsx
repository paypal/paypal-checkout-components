/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { SavedPaymentMethods } from "../../ui/saved-payment-methods/template";

import { type SavedPaymentMethodsProps } from "./props";

type PrerenderedSavedPaymentMethodsProps = {|
  nonce: ?string,
  props: ZoidProps<SavedPaymentMethodsProps>,
|};

export function PrerenderedSavedPaymentMethods({
  nonce,
  props,
}: // props,
PrerenderedSavedPaymentMethodsProps): ChildType {
  const { style } = props;
  return (
    <html>
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        <SavedPaymentMethods
          nonce={typeof nonce === "string" ? nonce : undefined}
          style={style}
        />
      </body>
    </html>
  );
}

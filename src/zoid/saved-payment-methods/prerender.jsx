/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { type SavedPaymentMethodsProps } from "./props";
import { SavedPaymentMethodsLoadingBody } from "./loading-body";

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
        <SavedPaymentMethodsLoadingBody nonce={nonce} style={style} />
      </body>
    </html>
  );
}

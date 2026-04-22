/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { type SavedPaymentMethodsProps } from "./props";

type PrerenderedSavedPaymentMethodsProps = {|
  nonce: ?string,
  props: ZoidProps<SavedPaymentMethodsProps>,
|};

export function PrerenderedSavedPaymentMethods({
  nonce,
}: // props,
PrerenderedSavedPaymentMethodsProps): ChildType {
  return (
    <html>
      <head>
        <style nonce={nonce}>
          {`
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .saved-payment-methods-loading {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              color: #999;
            }
          `}
        </style>
      </head>
      <body>
        <div class="saved-payment-methods-loading">...</div>
      </body>
    </html>
  );
}

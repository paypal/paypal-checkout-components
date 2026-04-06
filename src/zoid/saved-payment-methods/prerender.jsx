/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { type SavedPaymentMethodsProps } from "./props";
import { getStyleConfig, getStyles } from "./util";

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
  const styleConfig = getStyleConfig(style);
  const styles = getStyles(styleConfig);
  return (
    <html>
      <head>
        <style nonce={nonce}>
          {`
            body {
              margin: 0;
            }
            ${styles}
            `}
        </style>
      </head>
      <body>
        <div class="saved-payment-methods-container">
          <div class="saved-payment-methods-content">
            <div class="saved-payment-methods-container">
              {styleConfig.layout.logo && (
                <img
                  src="https://www.paypal.com/pay/_next/static/media/paypal-balance-icon.20370289.svg"
                  class="saved-payment-methods-logo"
                  alt="PayPal Logo"
                />
              )}
              {styleConfig.layout.label && (
                <div class="saved-payment-methods-label">PayPal</div>
              )}
              <div class="saved-payment-methods-tag-loading" />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from "@krakenjs/jsx-pragmatic/src";

import { getStyleConfig, getStyles } from "../../zoid/saved-payment-methods/util";

type SavedPaymentMethodsLoadingBodyProps = {|
  nonce: ?string,
  style?: Object,
|};

/**
 * Loading / prerender markup (styles + tag skeleton) shared by zoid prerender,
 * server SSR in smartcomponentnodeweb, and must match the first client paint.
 * default messages merchant config.
 */
export function SavedPaymentMethodsLoadingBody({
  nonce,
  style,
}: SavedPaymentMethodsLoadingBodyProps): ChildType {
  const styleConfig = getStyleConfig(style);
  const styles = getStyles(styleConfig);
  const shouldRenderMessageContainer = Boolean(styleConfig.layout.message);

  return (
    <Fragment>
      <style nonce={nonce}>
        {`
            body {
              margin: 0;
            }
            ${styles}
            `}
      </style>
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
            <div id="saved-payment-methods-app-root">
              <div class="saved-payment-methods-tag-loading" />
            </div>
          </div>
          {shouldRenderMessageContainer && (
            <div
              id="saved-payment-methods-message-root"
              class="saved-payment-methods-message"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </Fragment>
  );
}

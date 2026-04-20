/* @flow */
/** @jsx node */

import { node, Fragment, type ElementNode } from "@krakenjs/jsx-pragmatic/src";

import {
  getStyleConfig,
  getStyles,
  validateSavedPaymentMethodsStyle,
} from "../../zoid/saved-payment-methods/util";

import { PPRebrandLogo } from "@paypal/sdk-logos/src";

export type SavedPaymentMethodsServerRenderProps = {|
  nonce?: string,
  style?: Object,
|};

export function validateSavedPaymentMethodsProps(props: {| style?: Object |}) {
  validateSavedPaymentMethodsStyle(props?.style);
}

/**
 * Server-only render (commonjs2 / web: false) — mirrors smart buttons `Buttons()`.
 * Non-interactive loading shell (styles + tag skeleton) until the iframe hydrates;
 * shared by zoid prerender and server SSR and must match the first client paint.
 */
export function SavedPaymentMethods(
  props: SavedPaymentMethodsServerRenderProps
): ElementNode {
  const styleConfig = getStyleConfig(props.style);
  const styles = getStyles(styleConfig);
  const shouldRenderMessageContainer = Boolean(styleConfig.layout.message);

  return (
    <Fragment>
      <style nonce={props.nonce}>
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
              <div class="saved-payment-methods-logo">
                <div class="saved-payment-methods-logo-frame">
                  <PPRebrandLogo />
                </div>
              </div>
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

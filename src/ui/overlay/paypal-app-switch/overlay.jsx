/* @flow */
/** @jsx node */

import { animate, noop } from "@krakenjs/belter/src";
import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR, PayPalRebrandLogo } from "@paypal/sdk-logos/src";
import { type ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getContainerStyle, getSandboxStyle } from "./style";

type OverlayProps = {|
  buttonSessionID: string,
  close: () => ZalgoPromise<void>,
  focus: () => ZalgoPromise<void>,
|};

export function PayPalAppSwitchOverlay({
  close,
  focus,
  buttonSessionID,
}: OverlayProps): ElementNode {
  const uid = `paypal-overlay-${buttonSessionID}`;
  const overlayIframeName = `__paypal_checkout_sandbox_${uid}__`;
  const nonce = "";
  const content = {
    windowMessage: "To finish, go back to the PayPal app.",
    continueMessage: "Return to PayPal",
  };

  function closeCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    const overlay = document.getElementsByName(uid)?.[0];

    animate(overlay, "hide-container", noop);
    close();

    if (overlay) {
      // the delay is to allow the animation time to run
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
  }

  function focusCheckout(e) {
    e.preventDefault();
    e.stopPropagation();

    focus();
  }

  const setupShowAnimation = () => (el) => {
    animate(el, "show-container", noop);
  };

  return (
    <div
      id={uid}
      name={uid}
      onRender={setupShowAnimation()}
      class="paypal-checkout-sandbox"
    >
      <style nonce={nonce}>{getSandboxStyle({ uid })}</style>
      <iframe
        title="PayPal Checkout Overlay"
        name={overlayIframeName}
        scrolling="no"
        class="paypal-checkout-sandbox-iframe"
      >
        <html>
          <body>
            <div
              dir="auto"
              id={uid}
              onClick={focusCheckout}
              class="paypal-overlay-context-popup paypal-checkout-overlay"
            >
              <a
                href="#"
                class="paypal-checkout-close"
                onClick={closeCheckout}
                aria-label="close"
                role="button"
              />
              <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo" dir="ltr">
                  <PayPalRebrandLogo logoColor={LOGO_COLOR.WHITE} />
                </div>
                {content.windowMessage && (
                  <div class="paypal-checkout-message">
                    {content.windowMessage}
                  </div>
                )}
                {content.continueMessage && (
                  <div class="paypal-checkout-continue">
                    {/* This handler should be guarded with e.stopPropagation. 
                          This will stop the event from bubbling up to the overlay click handler
                          and causing unexpected behavior. */}
                    <a onClick={focusCheckout} href="#">
                      {content.continueMessage}
                    </a>
                  </div>
                )}
              </div>
              <style nonce={nonce}>{getContainerStyle({ uid })}</style>
            </div>
          </body>
        </html>
      </iframe>
    </div>
  );
}

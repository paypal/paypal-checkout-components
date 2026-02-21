/* @flow */
/** @jsx node */

import { animate, noop } from "@krakenjs/belter/src";
import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR, PayPalRebrandLogo } from "@paypal/sdk-logos/src";
import { type ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getContainerStyle, getSandboxStyle } from "../paypal-app-switch/style";

type OverlayProps = {|
  buttonSessionID: string,
  close: () => ZalgoPromise<void>,
  focus: () => ZalgoPromise<void>,
|};

export function PayPalOnApproveOverlay({
  buttonSessionID,
}: OverlayProps): ElementNode {
  const uid = `paypal-onapprove-overlay-${buttonSessionID}`;
  const overlayIframeName = `__paypal_checkout_sandbox_${uid}__`;
  const nonce = "";
  function closeOverlay(e) {
    e.preventDefault();
    e.stopPropagation();
    const overlay = document.getElementsByName(uid)?.[0];

    animate(overlay, "hide-container", noop);

    if (overlay) {
      // the delay is to allow the animation time to run
      setTimeout(() => {
        overlay.remove();
      }, 300);
    }
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
        title="PayPal Checkout On Approve Overlay"
        name={overlayIframeName}
        scrolling="no"
        class="paypal-checkout-sandbox-iframe"
      >
        <html>
          <body>
            <div
              dir="auto"
              id={uid}
              class="paypal-overlay-context-popup paypal-checkout-overlay"
            >
              <a
                href="#"
                class="paypal-checkout-close"
                onClick={closeOverlay}
                aria-label="close"
                role="button"
              />
              <div class="paypal-checkout-modal">
                <div class="paypal-checkout-logo" dir="ltr">
                  <PayPalRebrandLogo logoColor={LOGO_COLOR.WHITE} />
                </div>
              </div>
              <style nonce={nonce}>{getContainerStyle({ uid })}</style>
            </div>
          </body>
        </html>
      </iframe>
    </div>
  );
}

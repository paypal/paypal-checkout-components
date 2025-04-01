/* @flow */
/** @jsx node */
/* eslint max-lines: off, react/jsx-max-depth: off */

import {
  isIos,
  isIpadOs,
  isFirefox,
  animate,
  noop,
  destroyElement,
  uniqueID,
  supportsPopups,
  type EventEmitterType,
  toCSS,
} from "@krakenjs/belter/src";
import { EVENT, CONTEXT } from "@krakenjs/zoid/src";
import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";
import { LOGO_COLOR, PayPalRebrandLogo } from "@paypal/sdk-logos/src";

import { getContainerStyle, getSandboxStyle, CLASS } from "./style";

export type OverlayProps = {|
  // context: $Values<typeof CONTEXT>,
  close: () => ZalgoPromise<void>,
  buttonSessionID: string,
  focus: () => ZalgoPromise<void>,
  // event: EventEmitterType,
  // frame?: ?HTMLElement,
  // prerenderFrame?: ?HTMLElement,
  // content?: void | {|
  //   windowMessage?: string,
  //   continueMessage?: string,
  //   cancelMessage?: string,
  //   interrogativeMessage?: string,
  // |},
  // autoResize?: boolean,
  // hideCloseButton?: boolean,
  // nonce?: string,
  // fullScreen?: boolean,
|};
export function PayPalAppSwitchOverlay({
  close,
  focus,
  buttonSessionID,
}: OverlayProps): ElementNode {
  const uid = `paypal-overlay-${buttonSessionID}`;
  const overlayIframeName = `__paypal_checkout_sandbox_${uid}__`;

  function closeCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    close();
    // const body = document.getElementsByTagName("body")?.[0];
    const overlay = document.getElementsByName(uid)?.[0];

    if (overlay) {
      overlay.remove();
    }
  }

  function displayFocusWarning() {
    const overlayIframe: ?HTMLIFrameElement =
      //  $FlowFixMe
      document.getElementsByName(overlayIframeName)?.[0];
    const iframeDocument = overlayIframe?.contentWindow.document;
    const warningElement = iframeDocument?.getElementsByClassName(
      "paypal-checkout-focus-warning"
    )?.[0];

    if (!warningElement) {
      return;
    }
    warningElement.innerText = `Still can't see it? Select "Window" in your toolbar to find "Log in to your PayPal account"`;
  }

  function focusCheckout(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!supportsPopups()) {
      return;
    }

    if (isIos() || isIpadOs()) {
      // Note: alerts block the event loop until they are closed.
      // eslint-disable-next-line no-alert
      window.alert("Please switch tabs to reactivate the PayPal window");
    } else if (isFirefox()) {
      displayFocusWarning();
    }
    focus();
  }

  const setupAnimations = (name) => {
    return (el) => {
      animate(el, `show-${name}`, noop);
    };
  };

  const nonce = "";
  const context = "popup";
  const content = {
    windowMessage: "To finish, go back to the PayPal app.",
    continueMessage: "Return to PayPal",
  };

  return (
    <div
      id={uid}
      name={uid}
      onRender={setupAnimations("container")}
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
              class={`paypal-overlay-context-${context} paypal-checkout-overlay`}
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
                <div class="paypal-checkout-focus-warning" />
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
                <div class="paypal-checkout-loader">
                  <div class="paypal-spinner" />
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

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
import {
  LOGO_COLOR,
  PPLogo,
  PayPalLogo,
  VenmoLogo,
} from "@paypal/sdk-logos/src";
import { type ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import { getContainerStyle, getSandboxStyle, CLASS } from "./style";

export type OverlayProps = {|
  context: $Values<typeof CONTEXT>,
  close: () => ZalgoPromise<void>,
  focus: () => ZalgoPromise<void>,
  event: EventEmitterType,
  frame: ?HTMLElement,
  prerenderFrame: ?HTMLElement,
  content?: void | {|
    windowMessage?: string,
    continueMessage?: string,
    cancelMessage?: string,
    interrogativeMessage?: string,
  |},
  autoResize?: boolean,
  hideCloseButton?: boolean,
  nonce: string,
  fullScreen?: boolean,
|};
export function Overlay({
  context,
  close,
  focus,
  event,
  frame,
  prerenderFrame,
  content = {},
  autoResize,
  hideCloseButton,
  nonce,
  fullScreen = false,
}: OverlayProps): ElementNode {
  const uid = `paypal-overlay-${uniqueID()}`;
  const overlayIframeName = `__paypal_checkout_sandbox_${uid}__`;

  const closeCheckout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    close();
  };

  const displayFocusWarning = () => {
    const overlayIframe = document.getElementsByName(overlayIframeName)?.[0];
    const iframeDocument = overlayIframe?.contentWindow?.document;
    const warningElement = iframeDocument?.getElementsByClassName(
      "paypal-checkout-focus-warning"
    )?.[0];

    if (!warningElement) return;

    warningElement.innerText = `Still can't see it? Select "Window" in your toolbar to find "Log in to your PayPal account"`;
  };
  const focusCheckout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!supportsPopups()) return;

    if (isIos() || isIpadOs()) {
      // Alerts block the event loop until closed; ensure user interaction
      // eslint-disable-next-line no-alert
      window.alert("Please switch tabs to reactivate the PayPal window");
    } else if (isFirefox()) {
      displayFocusWarning();
    }
    focus();
  };

  const setupAnimations = (name) => (el) => {
    const showContainer = () => animate(el, `show-${name}`, noop);
    const hideContainer = () => animate(el, `hide-${name}`, noop);

    // Attach events dynamically
    event.on(EVENT.DISPLAY, showContainer);
    event.on(EVENT.CLOSE, hideContainer);
  };

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === "number") {
        el.style.width = toCSS(newWidth);
      }

      if (typeof newHeight === "number") {
        el.style.height = toCSS(newHeight);
      }
    });
  };

  const outletOnRender = (el) => {
    // Attach animation and resize logic when element is rendered
    setupAnimations("component")(el);

    if (autoResize) {
      setupAutoResize(el);
    }
  };
  let outlet;

  if (frame && prerenderFrame) {
    // Add CSS classes for both frames using modern method chaining
    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME, CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    // Set up event listener for rendering transition
    event.on(EVENT.RENDERED, () => {
      // Toggle visibility classes between the frames
      prerenderFrame.classList.replace(CLASS.VISIBLE, CLASS.INVISIBLE);
      frame.classList.replace(CLASS.INVISIBLE, CLASS.VISIBLE);

      // Use a short delay before destroying the pre-rendered frame
      setTimeout(() => destroyElement(prerenderFrame), 1);
    });

    outlet = (
      <div class={CLASS.OUTLET} onRender={outletOnRender}>
        <node el={frame} />
        <node el={prerenderFrame} />
      </div>
    );
  }
  return (
    <div
      id={uid}
      onRender={setupAnimations("container")}
      className="paypal-checkout-sandbox"
    >
      {/* Adding nonce to inline styles for security */}
      <style nonce={nonce}>{getSandboxStyle({ uid })}</style>

      <iframe
        title="PayPal Checkout Overlay"
        name={overlayIframeName}
        scrolling="no"
        className={`paypal-checkout-sandbox-iframe${fullScreen ? "-full" : ""}`}
      >
        <html>
          <body>
            <div
              dir="auto"
              id={uid}
              onClick={focusCheckout}
              className={`paypal-overlay-context-${context} paypal-checkout-overlay`}
            >
              {/* Conditionally rendering the close button */}
              {!hideCloseButton && (
                <a
                  href="#"
                  className="paypal-checkout-close"
                  onClick={closeCheckout}
                  aria-label="close"
                  role="button"
                />
              )}
              {!fullScreen && (
                <div className="paypal-checkout-modal">
                  <div className="paypal-checkout-logo" dir="ltr">
                    <PPLogo logoColor={LOGO_COLOR.WHITE} />
                    <PayPalLogo logoColor={LOGO_COLOR.WHITE} />
                  </div>

                  {content.windowMessage && (
                    <div className="paypal-checkout-message">
                      {content.windowMessage}
                    </div>
                  )}

                  <div className="paypal-checkout-focus-warning" />

                  {content.continueMessage && (
                    <div className="paypal-checkout-continue">
                      {/* Ensure event propagation is stopped to prevent overlay click handling */}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.stopPropagation();
                          focusCheckout(e);
                        }}
                      >
                        {content.continueMessage}
                      </a>
                    </div>
                  )}

                  <div className="paypal-checkout-loader">
                    <div className="paypal-spinner" />
                  </div>
                </div>
              )}

              <div
                className={
                  fullScreen
                    ? "paypal-checkout-iframe-container-full"
                    : "paypal-checkout-iframe-container"
                }
              >
                {outlet}
              </div>

              <style nonce={nonce}>{getContainerStyle({ uid })}</style>
            </div>
          </body>
        </html>
      </iframe>
    </div>
  );
}

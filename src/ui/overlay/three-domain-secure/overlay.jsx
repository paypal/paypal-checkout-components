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
import { LOGO_COLOR, PPLogo, PayPalLogo } from "@paypal/sdk-logos/src";
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
  nonce?: string,
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

  function closeCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    close();
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
      const showContainer = () => animate(el, `show-${name}`, noop);
      const hideContainer = () => animate(el, `hide-${name}`, noop);
      event.on(EVENT.DISPLAY, showContainer);
      event.on(EVENT.CLOSE, hideContainer);
    };
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
    setupAnimations("component")(el);
    if (autoResize) {
      setupAutoResize(el);
    }
  };

  let outlet;

  if (frame && prerenderFrame) {
    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    event.on(EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);

      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);

      setTimeout(() => {
        destroyElement(prerenderFrame);
      }, 1);
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
      class="paypal-checkout-sandbox"
    >
      <style nonce={nonce}>{getSandboxStyle({ uid })}</style>
      <iframe
        title="PayPal Checkout Overlay"
        name={overlayIframeName}
        scrolling="no"
        class={`paypal-checkout-sandbox-iframe${fullScreen ? "-full" : ""}`}
      >
        <html>
          <body>
            <div
              dir="auto"
              id={uid}
              onClick={focusCheckout}
              class={`paypal-overlay-context-${context} paypal-checkout-overlay`}
            >
              {!hideCloseButton && (
                <a
                  href="#"
                  class="paypal-checkout-close"
                  onClick={closeCheckout}
                  aria-label="close"
                  role="button"
                />
              )}
              {!fullScreen && (
                <div class="paypal-checkout-modal">
                  <div class="paypal-checkout-logo" dir="ltr">
                    <PPLogo logoColor={LOGO_COLOR.WHITE} />
                    <PayPalLogo logoColor={LOGO_COLOR.WHITE} />
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
              )}
              <div
                class={
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

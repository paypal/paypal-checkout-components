/* @flow */
/** @jsx node */

import {
  noop,
  supportsPopups,
  getElement,
  memoize,
} from "@krakenjs/belter/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { node, dom } from "@krakenjs/jsx-pragmatic/src";
import { CONTEXT } from "@krakenjs/zoid/src";

import {
  getElements,
  errorOnWindowOpen,
  generateOrderID,
} from "../../tests/common";

let {
  action,
  type,
  authed = false,
  bridge = false,
  delay = 0,
  onRender,
  checkout,
  selector,
  remembered,
  captureOrder = noop,
} = window.xprops.test;

const body = document.body;
if (body) {
  body.appendChild(
    (
      <div class="spm-container">
        <button
          type="button"
          class="spm-test-pay"
          aria-label="Pay with saved payment method"
        >
          Pay with saved method
        </button>
      </div>
    ).render(dom({ doc: document }))
  );
}

if (bridge) {
  errorOnWindowOpen();
  delay = 100;
}

let popupBridge;

const popupBridgePromise = window.xprops
  .getPopupBridge()
  .then((_popupBridge) => {
    popupBridge = _popupBridge;
  });

function renderCheckout(props = {}, context = CONTEXT.POPUP) {
  let approved = false;

  const payment = memoize(() => {
    if (window.xprops.createSubscription) {
      return window.xprops.createSubscription({}, {}).then(generateOrderID);
    } else if (window.xprops.createBillingAgreement) {
      return window.xprops.createBillingAgreement({}, {}).then(generateOrderID);
    } else if (window.xprops.createOrder) {
      return window.xprops.createOrder(
        {},
        {
          order: {
            create: generateOrderID,
          },
        }
      );
    } else {
      return ZalgoPromise.try(generateOrderID);
    }
  });

  window.paypal
    .Checkout({
      payment,

      onAuthorize(data, actions): void | ZalgoPromise<void> {
        approved = true;

        actions = {
          ...actions,
          order: {
            capture: captureOrder,
            get: () => ({}),
          },
          restart: () => renderCheckout(props, CONTEXT.IFRAME),
        };

        return ZalgoPromise.try(() => {
          if (window.xprops.onApprove) {
            return window.xprops.onApprove(data, actions);
          } else {
            return actions.order.capture();
          }
        }).catch((err) => {
          if (window.xprops.onError) {
            return window.xprops.onError(err);
          }
        });
      },

      onAuth() {
        // pass
      },

      onShippingChange(data, actions): ZalgoPromise<void> | void {
        if (window.xprops.onShippingChange) {
          return window.xprops.onShippingChange(data, actions);
        } else if (
          data.shipping_address &&
          window.xprops.onShippingAddressChange
        ) {
          return window.xprops.onShippingAddressChange(data, actions);
        } else if (
          data.selected_shipping_option &&
          window.xprops.onShippingOptionsChange
        ) {
          return window.xprops.onShippingOptionsChange(data, actions);
        }
      },

      onClose: () => {
        if (!approved) {
          return window.xprops.onCancel();
        }
      },

      onCancel: window.xprops.onCancel,
      onError: window.xprops.onError,
      commit: window.xprops.commit,
      locale: window.xprops.locale,
      test: {
        action: action || "checkout",
        type,
        ...checkout,
      },

      ...props,
    })
    .renderTo(
      window.parent,
      "body",
      supportsPopups() ? context : CONTEXT.IFRAME
    )
    .catch((err) => {
      if (err instanceof window.paypal.PopupOpenError) {
        return renderCheckout(props);
      }

      throw err;
    });
}

getElements(".spm-test-pay", document).forEach((el) => {
  el.addEventListener("click", () => {
    if (window.xprops.onClick) {
      window.xprops.onClick();
    }

    if (popupBridge) {
      return window.xprops.createOrder().then((orderID) => {
        return popupBridge
          .start(`${popupBridge.nativeUrl}?token=${orderID}`)
          .then((params) => {
            const data = {
              orderID: params.token,
              payerID: params.payerId,
            };
            const actions = {};

            return window.xprops.onApprove(data, actions);
          })
          .catch(window.xprops.onError);
      });
    }

    renderCheckout({});
  });
});

if (action === "auth") {
  if (authed && window.xprops.onAuth) {
    window.xprops.onAuth();
  }
} else if (action === "remember" && window.xprops.remember) {
  window.xprops.remember([remembered]);
} else if (
  action === "checkout" ||
  action === "shippingChange" ||
  action === "cancel" ||
  action === "error" ||
  action === "popout"
) {
  popupBridgePromise.then(() => {
    if (delay) {
      setTimeout(() => {
        getElement(
          selector || ".spm-test-pay",
          document
        ).click();
      }, delay);
    } else {
      getElement(
        selector || ".spm-test-pay",
        document
      ).click();
    }
  });
} else {
  window.xprops.getPrerenderDetails().then((prerenderDetails) => {
    if (!prerenderDetails) {
      return;
    }

    const { win, fundingSource } = prerenderDetails;

    if (!fundingSource) {
      throw new Error(`Expected fundingSource to be passed`);
    }

    return renderCheckout({
      window: win,
      fundingSource,
    });
  });
}

if (onRender) {
  onRender({
    xprops: window.xprops,
    click() {
      getElement(".spm-test-pay", document).click();
    },
  });
}

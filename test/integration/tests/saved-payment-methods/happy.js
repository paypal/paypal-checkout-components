/* @flow */

import { wrapPromise } from "@krakenjs/belter/src";

import {
  createTestContainer,
  destroyTestContainer,
  generateOrderID,
  WEBVIEW_USER_AGENT,
} from "../common";

for (const flow of ["popup", "iframe"]) {
  describe(`paypal saved payment methods component happy path on ${flow}`, () => {
    beforeEach(() => {
      createTestContainer();

      if (flow === "iframe") {
        window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
      }
    });

    afterEach(() => {
      destroyTestContainer();
    });

    it("should render pay control, open checkout, then complete without createOrder", () => {
      return wrapPromise(({ expect, avoid }) => {
        return window.paypal
          .SavedPaymentMethods({
            test: { flow, action: "checkout" },

            createOrder: expect("createOrder", generateOrderID),
            onApprove: expect("onApprove"),
            onCancel: avoid("onCancel"),
          })
          .render("#testContainer");
      });
    });
  });
}

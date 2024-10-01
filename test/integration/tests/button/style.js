/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { once } from "@krakenjs/belter/src";

import {
  generateOrderID,
  createTestContainer,
  destroyTestContainer,
  getElementRecursive,
  assert,
  WEBVIEW_USER_AGENT,
} from "../common";

for (const flow of ["popup", "iframe"]) {
  describe(`paypal button style cases on ${flow}`, () => {
    beforeEach(() => {
      createTestContainer();
      if (flow === "iframe") {
        window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
      }
    });

    afterEach(() => {
      destroyTestContainer();
    });

    it("should render a button and click and get a black overlay", (done) => {
      done = once(done);
      window.paypal
        .Buttons({
          test: {
            flow,
            action: "checkout",
            onRender() {
              assert.ok(
                getElementRecursive(".paypal-checkout-background-color-black")
              );
              done();
            },
          },

          createOrder(): string | ZalgoPromise<string> {
            return ZalgoPromise.resolve(generateOrderID());
          },

          onApprove(): void {
            return done();
          },

          onCancel(): void {
            return done(new Error("Expected onCancel to not be called"));
          },
        })
        .render("#testContainer");
    });
  });
}

describe("paypal button color", () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("should render a button with gold background when empty string is passed in for color", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        style: {
          color: "",
        },
        test: {
          onRender() {
            try {
              assert.ok(getElementRecursive(".paypal-button-color-gold"));
              done();
            } catch (e) {
              done(e);
            }
          },
        },
      })
      .render("#testContainer");
  });

  it("should render a button with gold background when no color is specified", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        test: {
          onRender() {
            try {
              assert.ok(getElementRecursive(".paypal-button-color-gold"));
              done();
            } catch (e) {
              done(e);
            }
          },
        },
      })
      .render("#testContainer");
  });

  it('should render a button with black background when passed "black"', (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        style: {
          color: "black",
        },
        test: {
          onRender() {
            try {
              getElementRecursive(".paypal-button-color-black");
              done();
            } catch (e) {
              done(e);
            }
          },
        },
      })
      .render("#testContainer");
  });

  it('should render a button with gold background when passed ""', (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        style: {
          color: "gold",
        },
        test: {
          onRender() {
            try {
              assert.ok(getElementRecursive(".paypal-button-color-gold"));
              done();
            } catch (e) {
              done(e);
            }
          },
        },
      })
      .render("#testContainer");
  });

  it("should not mutate the style object", (done) => {
    const style = {
      shape: "pill",
    };
    const expected = JSON.stringify(style);
    done = once(done);
    window.paypal
      .Buttons({
        style,
        test: {
          onRender() {
            if (JSON.stringify(style) !== expected) {
              done(
                new Error(
                  `Expected style object ${JSON.stringify(
                    style
                  )} to remain unmodified as ${expected}`
                )
              );
            }
            done();
          },
        },

        onError: done,
      })
      .render("#testContainer");
  });
});

describe("paypal button aria-label", () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("uses style.label and style.period", (done) => {
    window.paypal
      .Buttons({
        content: {
          "label.installment.withPeriod":
            "Pay up to {period}x without interest",
        },
        style: {
          label: "installment",
          period: 3,
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(
          getElementRecursive(
            ".paypal-button[aria-label='Pay up to 3x without interest']"
          )
        );
        done();
      });
  });
  it("handles style.label == 'installment' without style.period", (done) => {
    window.paypal
      .Buttons({
        content: {
          "label.installment.withoutPeriod": "Interest free payments",
        },
        style: {
          label: "installment",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(
          getElementRecursive(
            ".paypal-button[aria-label='Interest free payments']"
          )
        );
        done();
      });
  });
  it("falls back to the funding source if content is unavailable", (done) => {
    window.paypal
      .Buttons({
        style: {
          label: "buynow",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button[aria-label='PayPal']"));
        done();
      });
  });
  it("falls back to the funding source if the correct content is unavailable", (done) => {
    window.paypal
      .Buttons({
        content: {
          "label.pay": "Pay with PayPal",
        },
        style: {
          label: "buynow",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button[aria-label='PayPal']"));
        done();
      });
  });
});

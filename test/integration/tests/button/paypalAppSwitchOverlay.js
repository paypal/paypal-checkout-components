/* @flow */
/* eslint max-lines: 0 */

import { once, noop } from "@krakenjs/belter/src";

import {
  createTestContainer,
  destroyTestContainer,
  getElementRecursive,
  assert,
  removeNodes,
} from "../common";

describe(`PayPal app switch overlay`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
    removeNodes(".paypal-checkout-sandbox");
  });

  it("should call showPayPalAppSwitchOverlay and show the overlay", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        test: {
          flow: "popup",
          action: "init",
          onRender({ xprops }) {
            xprops.showPayPalAppSwitchOverlay({
              close: noop,
              focus: noop,
            });
            assert.ok(getElementRecursive(".paypal-logo-paypal-rebrand"));
            assert.ok(getElementRecursive(".paypal-logo-color-white"));
            assert.ok(getElementRecursive(".paypal-checkout-message"));
            assert.ok(getElementRecursive(".paypal-checkout-continue"));

            xprops.hidePayPalAppSwitchOverlay({ close: noop });

            done();
          },
        },
        onApprove(): void {
          return done(new Error("Expected onApprove to not be called"));
        },
        onCancel(): void {
          return done(new Error("Expected onCancel to not be called"));
        },
      })
      .render("#testContainer");
  });

  it("should call showPayPalAppSwitchOverlay then show the overlay and call focus when continue is clicked", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        test: {
          flow: "popup",
          action: "init",
          onRender({ xprops }) {
            let focusCalled = false;

            xprops.showPayPalAppSwitchOverlay({
              close: noop,
              focus: () => {
                focusCalled = true;
              },
            });

            getElementRecursive(".paypal-checkout-continue a").click();

            // timeout is to allow time for focus to be called
            setTimeout(() => {
              if (!focusCalled) {
                done(new Error("Expected focus function to be called"));
              }
              xprops.hidePayPalAppSwitchOverlay({ close: noop });

              done();
            }, 300);
          },
        },
        onApprove(): void {
          return done(new Error("Expected onApprove to not be called"));
        },
        onCancel(): void {
          return done(new Error("Expected onCancel to not be called"));
        },
      })
      .render("#testContainer");
  });

  it("should remove the overlay when hidePayPalAppSwitchOverlay", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        test: {
          flow: "popup",
          action: "init",
          onRender({ xprops }) {
            let closeCalled = false;
            const close = () => {
              closeCalled = true;
            };

            xprops.showPayPalAppSwitchOverlay({
              close,
              focus: noop,
            });

            if (closeCalled) {
              done(
                new Error("Expected close function to not be called on render")
              );
            }

            xprops.hidePayPalAppSwitchOverlay({ close });

            if (!closeCalled) {
              done(new Error("Expected close function to be called"));
            }

            // timeout is to allow time for animation to run for overlay removal
            setTimeout(() => {
              try {
                if (getElementRecursive(".paypal-checkout-sandbox")) {
                  done(
                    new Error(
                      "Expected overlay to be removed from dom after close was called"
                    )
                  );
                }
              } catch {
                // an error will be thrown if the overlay is not found, which means overlay was removed successfully
                done();
              }
            }, 300);

            done();
          },
        },
        onApprove(): void {
          return done(new Error("Expected onApprove to not be called"));
        },
        onCancel(): void {
          return done(new Error("Expected onCancel to not be called"));
        },
      })
      .render("#testContainer");
  });

  it("should call showPayPalAppSwitchOverlay then show the app switch overlay and call close when X is clicked", (done) => {
    done = once(done);

    window.paypal
      .Buttons({
        test: {
          flow: "popup",
          action: "init",
          onRender({ xprops }) {
            let closeCalled = false;
            xprops.showPayPalAppSwitchOverlay({
              close: () => {
                closeCalled = true;
              },
              focus: noop,
            });

            getElementRecursive(".paypal-checkout-close").click();

            if (!closeCalled) {
              done(new Error("Expected close function to be called"));
            }

            // timeout is to allow time for animation to run for overlay removal
            setTimeout(() => {
              try {
                if (getElementRecursive(".paypal-checkout-sandbox")) {
                  done(
                    new Error(
                      "Expected overlay to be removed from dom after close was called"
                    )
                  );
                }
              } catch {
                // an error will be thrown if the overlay is not found, which means overlay was removed successfully
              }

              done();
            }, 300);
          },
        },
        onApprove(): void {
          return done(new Error("Expected onApprove to not be called"));
        },
        onCancel(): void {
          return done(new Error("Expected onCancel to not be called"));
        },
      })
      .render("#testContainer");
  });
});

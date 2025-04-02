/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, once, noop } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import {
  createTestContainer,
  destroyTestContainer,
  IPHONE6_USER_AGENT,
  getElementRecursive,
  assert,
} from "../common";

describe(`paypal button component props`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("should render an Apple Pay button if applePaySupport is true", () => {
    // setup applePaySupport
    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

    function ApplePaySession(version, request): Object {
      return {
        version,
        request,
        begin: () => true,
      };
    }

    window.ApplePaySession = ApplePaySession;
    window.ApplePaySession.canMakePayments = () => true;
    window.ApplePaySession.supportsVersion = () => true;

    return ZalgoPromise.try(() => {
      return wrapPromise(({ expect, avoid }) => {
        let onRender = async ({ xprops }) => {
          const applePay = xprops.applePay;

          const request = {
            countryCode: "US",
            currencyCode: "USD",
            merchantCapabilities: ["supports3DS"],
            supportedNetworks: ["visa", "masterCard", "amex", "discover"],
            total: {
              label: "Demo (Card is not charged)",
              type: "final",
              amount: "1.99",
            },
          };

          return await applePay(3, request)
            .then((response) => {
              const { begin, addEventListener } = response;

              const callback = () => true;
              return ZalgoPromise.all([
                addEventListener("validatemerchant", callback),
                addEventListener("paymentmethodselected", callback),
                addEventListener("shippingmethodselected", callback),
                addEventListener("shippingcontactselected", callback),
                addEventListener("paymentauthorized", callback),
                addEventListener("cancel", callback),
              ]).then(() => {
                begin();
              });
            })
            .catch((err) => {
              throw err;
            });
        };

        const fundingSource = FUNDING.APPLEPAY;
        const instance = window.paypal.Buttons({
          test: {
            action: "checkout",
            onRender: (...args) => onRender(...args),
          },
          fundingSource,
          onCancel: avoid("onCancel"),
        });

        if (instance.isEligible()) {
          onRender = expect("onRender", onRender);
          return instance.render("#testContainer");
        }
      });
    });
  });

  it("should render a button and get any queried FIs", () => {
    const fundingSources = [
      FUNDING.APPLEPAY,
      FUNDING.PAYPAL,
      FUNDING.CREDIT,
      FUNDING.VENMO,
    ];

    return ZalgoPromise.all(
      fundingSources.map((fundingSource) => {
        return wrapPromise(({ expect, avoid }) => {
          let onRender = ({ xprops }) => {
            return xprops
              .getQueriedEligibleFunding()
              .then((queriedFundingSources) => {
                if (
                  JSON.stringify(queriedFundingSources) !==
                  JSON.stringify(fundingSources)
                ) {
                  throw new Error(
                    `Expected ${fundingSources.join(
                      ","
                    )} to be queried, got ${queriedFundingSources.join(",")}`
                  );
                }
              });
          };

          const instance = window.paypal.Buttons({
            test: {
              action: "checkout",
              onRender: (...args) => onRender(...args),
            },

            fundingSource,
            onApprove: avoid("onApprove"),
            onCancel: avoid("onCancel"),
          });

          if (instance.isEligible()) {
            onRender = expect("onRender", onRender);
            return instance.render("#testContainer");
          }
        });
      })
    );
  });

  it("should render a button and have the referrerDomain in xprops", () => {
    const expectReferrerDomainToEqual = (uri, domain) => {
      Object.defineProperty(document, "referrer", {
        get: () => uri,
        configurable: true,
      });

      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            test: {
              action: "checkout",
              onRender: expect("onRender", ({ xprops }) => {
                if (xprops.referrerDomain !== domain) {
                  throw new Error(
                    `Expected referrerDomain to be ${domain || ""}, got ${
                      xprops.referrerDomain
                    }`
                  );
                }
              }),
            },
          })
          .render("#testContainer");
      });
    };

    return ZalgoPromise.all([
      expectReferrerDomainToEqual(
        "https://example.com/path?q=1",
        "example.com"
      ),
      expectReferrerDomainToEqual(
        "https://not.example.com/path?q=1",
        "not.example.com"
      ),
      expectReferrerDomainToEqual(
        // eslint-disable-next-line no-script-url
        "javascript:alert(document.cookie)",
        undefined
      ),
      expectReferrerDomainToEqual(
        "", // when there is no referrer
        undefined
      ),
    ]);
  });

  it("should render a button and get the renderedButtons props", () => {
    // should not render applepay without applepay listed in xprops.enableFunding
    const renderedButtons = [FUNDING.PAYPAL, FUNDING.APPLEPAY, FUNDING.CARD];

    return ZalgoPromise.try(() => {
      return wrapPromise(({ expect, avoid }) => {
        let onRender = ({ xprops }) => {
          const queriedRenderedButtons = xprops.renderedButtons;
          if (
            JSON.stringify(queriedRenderedButtons) !==
            JSON.stringify(renderedButtons)
          ) {
            throw new Error(
              `Expected ${renderedButtons.join(
                ","
              )} to be queried, got ${queriedRenderedButtons.join(",")}`
            );
          }

          if (!String(xprops.clientMetadataID).startsWith("uid_")) {
            throw new Error(
              `Expected clientMetadataId to be present in xprops, but got ${xprops.clientMetadataID}`
            );
          }
        };

        const instance = window.paypal.Buttons({
          test: {
            action: "checkout",
            onRender: (...args) => onRender(...args),
          },

          onApprove: avoid("onApprove"),
          onCancel: avoid("onCancel"),
        });

        if (instance.isEligible()) {
          onRender = expect("onRender", onRender);
          return instance.render("#testContainer");
        }
      });
    });
  });
});

// describe.only(`paypal button props - PayPal app switch overlay`, () => {
//   beforeEach(() => {
//     createTestContainer();
//   });

//   afterEach(() => {
//     destroyTestContainer();
//   });

//   it("should call showPayPalAppSwitchOverlay and show the overlay", (done) => {
//     done = once(done);

//     window.paypal
//       .Buttons({
//         test: {
//           flow: "popup",
//           action: "init",
//           onRender({ xprops }) {
//             xprops.showPayPalAppSwitchOverlay({
//               close: noop,
//               focus: noop,
//             });
//             assert.ok(getElementRecursive(".paypal-logo-paypal-rebrand"));
//             assert.ok(getElementRecursive(".paypal-logo-color-white"));
//             assert.ok(getElementRecursive(".paypal-checkout-message"));
//             assert.ok(getElementRecursive(".paypal-checkout-continue"));

//             xprops.hidePayPalAppSwitchOverlay({ close: noop });

//             done();
//           },
//         },
//         onApprove(): void {
//           return done(new Error("Expected onApprove to not be called"));
//         },
//         onCancel(): void {
//           return done(new Error("Expected onCancel to not be called"));
//         },
//       })
//       .render("#testContainer");
//   });

//   it("should call showPayPalAppSwitchOverlay then show the overlay and call focus when continue is clicked", (done) => {
//     done = once(done);

//     window.paypal
//       .Buttons({
//         test: {
//           flow: "popup",
//           action: "init",
//           onRender({ xprops }) {
//             let focusCalled = false;

//             xprops.showPayPalAppSwitchOverlay({
//               close: noop,
//               focus: () => {
//                 focusCalled = true;
//               },
//             });

//             getElementRecursive(".paypal-checkout-continue").click();

//             if (!focusCalled) {
//               done(new Error("Expected focus function to be called"));
//             }

//             xprops.hidePayPalAppSwitchOverlay({ close: noop });

//             done();
//           },
//         },
//         onApprove(): void {
//           return done(new Error("Expected onApprove to not be called"));
//         },
//         onCancel(): void {
//           return done(new Error("Expected onCancel to not be called"));
//         },
//       })
//       .render("#testContainer");
//   });

//   it("should remove the overlay when hidePayPalAppSwitchOverlay", (done) => {
//     done = once(done);

//     window.paypal
//       .Buttons({
//         test: {
//           flow: "popup",
//           action: "init",
//           onRender({ xprops }) {
//             let closeCalled = false;
//             const close = () => {
//               closeCalled = true;
//             };

//             xprops.showPayPalAppSwitchOverlay({
//               close,
//               focus: noop,
//             });

//             if (closeCalled) {
//               done(
//                 new Error("Expected close function to not be called on render")
//               );
//             }

//             xprops.hidePayPalAppSwitchOverlay({ close });

//             if (!closeCalled) {
//               done(new Error("Expected close function to be called"));
//             }

//             // timeout is to allow time for animation to run for overlay removal
//             setTimeout(() => {
//               try {
//                 if (getElementRecursive(".paypal-checkout-sandbox")) {
//                   done(
//                     new Error(
//                       "Expected overlay to be removed from dom after close was called"
//                     )
//                   );
//                 }
//               } catch {
//                 // an error will be thrown if the overlay is not found, which means overlay was removed successfully
//                 done();
//               }
//             }, 300);

//             done();
//           },
//         },
//         onApprove(): void {
//           return done(new Error("Expected onApprove to not be called"));
//         },
//         onCancel(): void {
//           return done(new Error("Expected onCancel to not be called"));
//         },
//       })
//       .render("#testContainer");
//   });

//   it("should call showPayPalAppSwitchOverlay then show the app switch overlay and call close when X is clicked", (done) => {
//     done = once(done);

//     window.paypal
//       .Buttons({
//         test: {
//           flow: "popup",
//           action: "init",
//           onRender({ xprops }) {
//             let closeCalled = false;
//             xprops.showPayPalAppSwitchOverlay({
//               close: () => {
//                 closeCalled = true;
//               },
//               focus: noop,
//             });

//             getElementRecursive(".paypal-checkout-close").click();

//             if (!closeCalled) {
//               done(new Error("Expected close function to be called"));
//             }

//             // timeout is to allow time for animation to run for overlay removal
//             setTimeout(() => {
//               try {
//                 if (getElementRecursive(".paypal-checkout-sandbox")) {
//                   done(
//                     new Error(
//                       "Expected overlay to be removed from dom after close was called"
//                     )
//                   );
//                 }
//               } catch {
//                 // an error will be thrown if the overlay is not found, which means overlay was removed successfully
//               }

//               done();
//             }, 300);
//           },
//         },
//         onApprove(): void {
//           return done(new Error("Expected onApprove to not be called"));
//         },
//         onCancel(): void {
//           return done(new Error("Expected onCancel to not be called"));
//         },
//       })
//       .render("#testContainer");
//   });
// });

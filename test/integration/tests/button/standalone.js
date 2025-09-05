/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from "@paypal/sdk-constants/src";
import { wrapPromise } from "@krakenjs/belter/src";
import { SUPPORTED_FUNDING_SOURCES } from "@paypal/funding-components/src";

import {
  createTestContainer,
  destroyTestContainer,
  IPHONE6_USER_AGENT,
  WEBVIEW_USER_AGENT,
  mockProp,
} from "../common";

describe(`paypal standalone buttons`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
    window.localStorage.removeItem("enable_venmo_desktop");
  });

  for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
    if (!window.__TEST_FUNDING_ELIGIBILITY__[fundingSource]) {
      continue;
    }

    it(`should render a standalone ${fundingSource} button and succeed when eligible`, () => {
      return wrapPromise(({ expect }) => {
        // should not render applepay without it listed in xprops.enableFunding (see test/paypal.js)
        if (
          fundingSource === FUNDING.VENMO ||
          fundingSource === FUNDING.APPLEPAY
        ) {
          window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
          window.ApplePaySession = {
            canMakePayments: () => true,
            supportsVersion: () => true,
          };
        }

        const mockEligibility = mockProp(
          window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
          "eligible",
          true
        );

        const button = window.paypal.Buttons({
          test: {
            onRender: expect("onRender", ({ fundingSources }) => {
              if (fundingSources.length !== 1) {
                throw new Error(
                  `Expected only one funding source to be rendered, got ${fundingSources.length}`
                );
              }

              if (fundingSources[0] !== fundingSource) {
                throw new Error(
                  `Expected rendered funding source to be ${fundingSource}, got ${fundingSources[0]}`
                );
              }

              mockEligibility.cancel();
            }),
          },

          fundingSource,
        });

        if (!button.isEligible()) {
          throw new Error(`Expected button to be eligible`);
        }

        return button.render("#testContainer");
      });
    });

    it(`should not render a standalone ${fundingSource} button and error out when not eligible`, () => {
      return wrapPromise(({ expect }) => {
        if (
          fundingSource === FUNDING.VENMO ||
          fundingSource === FUNDING.APPLEPAY
        ) {
          window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        }

        const mockEligibility = mockProp(
          window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
          "eligible",
          false
        );

        const button = window.paypal.Buttons({
          test: {},
          fundingSource,
        });

        if (button.isEligible()) {
          throw new Error(`Expected button to not be eligible`);
        }

        return button
          .render("#testContainer")
          .catch(expect("buttonRenderCatch"))
          .then(() => {
            mockEligibility.cancel();
          });
      });
    });
  }

  it(`should render a standalone venmo button and error out when not on mobile, even when venmo is eligible`, () => {
    return wrapPromise(({ expect }) => {
      const fundingSource = FUNDING.VENMO;
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        false
      );

      const button = window.paypal.Buttons({
        test: {},
        fundingSource,
      });

      if (button.isEligible()) {
        throw new Error("Expected button to not be eligible");
      }

      return button
        .render("#testContainer")
        .catch(expect("buttonRenderCatch"))
        .then(() => {
          mockEligibility.cancel();
        });
    });
  });

  it(`should render a standalone venmo button and error out for webviews`, () => {
    return wrapPromise(({ expect }) => {
      const fundingSource = FUNDING.VENMO;
      window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

      const button = window.paypal.Buttons({
        test: {},
        fundingSource,
      });

      if (button.isEligible()) {
        throw new Error(`Expected button to not be eligible`);
      }

      return button
        .render("#testContainer")
        .catch(expect("buttonRenderCatch"))
        .then(() => {
          window.navigator.mockUserAgent = "";
        });
    });
  });

  it(`should render a standalone venmo button and not error out for webviews if window.popupBridge is defined`, () => {
    return wrapPromise(() => {
      const fundingSource = FUNDING.VENMO;
      window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;

      window.popupBridge = {};

      const button = window.paypal.Buttons({
        test: {},
        fundingSource,
      });

      if (!button.isEligible()) {
        throw new Error(`Expected button to be eligible`);
      }

      return button
        .render("#testContainer")
        .catch(() => {
          throw new Error("Did not expect error to be thrown.");
        })
        .then(() => {
          window.navigator.mockUserAgent = "";
          window.popupBridge = undefined;
        });
    });
  });

  it(`should render a standalone venmo button with a shipping callback`, () => {
    return wrapPromise(({ avoid }) => {
      const fundingSource = FUNDING.VENMO;

      window.localStorage.setItem("enable_venmo_desktop", true);
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        true
      );

      const button = window.paypal.Buttons({
        fundingSource,
        onShippingChange: avoid("onShippingChange"),
      });

      if (!button.isEligible()) {
        throw new Error("Expected venmo to be eligible");
      }

      return button.render("#testContainer").then(() => {
        mockEligibility.cancel();
      });
    });
  });

  it(`should not throw error if attempting to render a standalone venmo button with a shipping callback`, () => {
    return wrapPromise(({ avoid }) => {
      const fundingSource = FUNDING.VENMO;

      window.localStorage.setItem("enable_venmo_desktop", true);
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        true
      );

      const button = window.paypal.Buttons({
        fundingSource,
        onShippingChange: avoid("onShippingChange"),
      });

      if (!button.isEligible()) {
        throw new Error("Expected venmo to be eligible");
      }

      return button
        .render("#testContainer")
        .catch(() => {
          throw new Error("Did not expect error to be thrown.");
        })
        .then(() => {
          mockEligibility.cancel();
        });
    });
  });

  it(`should render a standalone ideal button and error out when onShippingChange is passed, even when ideal is eligible`, () => {
    return wrapPromise(({ expect }) => {
      const fundingSource = FUNDING.IDEAL;
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        false
      );

      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;

      const button = window.paypal.Buttons({
        test: {},
        fundingSource,
      });

      if (button.isEligible()) {
        throw new Error(`Expected button to not be eligible`);
      }

      return button
        .render("#testContainer")
        .catch(expect("buttonRenderCatch"))
        .then(() => {
          mockEligibility.cancel();
        });
    });
  });
});

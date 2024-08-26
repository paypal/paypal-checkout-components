/* @flow */
/* eslint max-lines: 0 */

import { FUNDING } from "@paypal/sdk-constants/src";
import { wrapPromise } from "@krakenjs/belter/src";

import {
  createTestContainer,
  destroyTestContainer,
  IPHONE6_USER_AGENT,
  mockProp,
  assert,
  getElementRecursive,
} from "../../common";

describe(`applepay standalone buttons`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  const fundingSource = FUNDING.APPLEPAY;

  it(`should render a standalone ${fundingSource} button and succeed when eligible`, () => {
    return wrapPromise(({ expect }) => {
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
      window.ApplePaySession = {
        canMakePayments: () => true,
        supportsVersion: () => true,
      };
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        true
      );
      window.__COMPONENTS__ = ["buttons", "legal"];
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

      return button.render("#testContainer").then(() => {
        assert.ok(
          getElementRecursive(".paypal-button-label-container"),
          "The ApplePay Button Should Exist"
        );
        assert.equal(
          getElementRecursive(".paypal-button").getAttribute("aria-label"),
          "applepay"
        );
      });
    });
  });

  it(`should not render ${fundingSource} button when applepay standalone applepay component is requested as part of components`, (done) => {
    return wrapPromise(({ expect }) => {
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
      window.ApplePaySession = {
        canMakePayments: () => true,
        supportsVersion: () => true,
      };
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
        "eligible",
        true
      );
      window.__COMPONENTS__ = ["buttons", "applepay"];
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

      assert.equal(
        button.isEligible(),
        false,
        "The ApplePay Button is ineligible when standalone applepay component is requested"
      );
      done();
    });
  });
});

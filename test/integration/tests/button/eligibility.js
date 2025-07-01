/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";

import {
  createTestContainer,
  destroyTestContainer,
  mockProp,
  IPHONE6_USER_AGENT,
  COMMON_DESKTOP_USER_AGENT,
  getElementRecursive,
  assert,
} from "../common";
import { testContent } from "../../../content";

describe("venmo button eligibility", () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();

    window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
    window.localStorage.removeItem("enable_venmo_desktop");
    window.localStorage.removeItem("enable_venmo_ios");
  });

  it("should render venmo button for desktop when eligibility is true and the default label", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
      window.localStorage.setItem("enable_venmo_desktop", true);
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO],
        "eligible",
        true
      );

      const instance = window.paypal.Buttons({
        test: {
          onRender: expect("onRender", ({ xprops, fundingSources }) => {
            const {
              experiment: { enableVenmo, venmoWebEnabled },
            } = xprops;
            if (!enableVenmo) {
              throw new Error(
                `Expected venmo experiment to be eligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (venmoWebEnabled) {
              throw new Error(
                `Expected venmo web experiment to not be eligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (!fundingSources.includes(FUNDING.VENMO)) {
              throw new Error(
                `Venmo is missing from the list of funding sources: ${fundingSources}`
              );
            }

            mockEligibility.cancel();
          }),
        },

        onApprove: avoid("onApprove"),
        onCancel: avoid("onCancel"),
        onError: avoid("onError"),
      });

      return instance.render("#testContainer");
    });
  });

  it("should render venmo button for desktop when eligibility is true and the app label", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
      window.localStorage.setItem("enable_venmo_desktop", true);
      window.localStorage.setItem("enable_venmo_app_label", true);
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO],
        "eligible",
        true
      );

      const instance = window.paypal.Buttons({
        test: {
          onRender: expect("onRender", ({ xprops, fundingSources }) => {
            const {
              experiment: { enableVenmo },
            } = xprops;
            if (!enableVenmo) {
              throw new Error(
                `Expected venmo experiment to be eligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (!fundingSources.includes(FUNDING.VENMO)) {
              throw new Error(
                `Venmo is missing from the list of funding sources: ${fundingSources}`
              );
            }

            mockEligibility.cancel();
          }),
        },

        onApprove: avoid("onApprove"),
        onCancel: avoid("onCancel"),
        onError: avoid("onError"),
      });

      return instance.render("#testContainer");
    });
  });

  it("should not render venmo button for desktop when eligibility is false", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.navigator.mockUserAgent = COMMON_DESKTOP_USER_AGENT;
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO],
        "eligible",
        false
      );

      const instance = window.paypal.Buttons({
        test: {
          onRender: expect("onRender", ({ xprops, fundingSources }) => {
            const {
              experiment: { enableVenmo },
            } = xprops;
            if (enableVenmo) {
              throw new Error(
                `Expected venmo experiment to be ineligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (fundingSources.includes(FUNDING.VENMO)) {
              throw new Error(
                `Venmo shound not be rendered: ${fundingSources}`
              );
            }

            mockEligibility.cancel();
          }),
        },

        onApprove: avoid("onApprove"),
        onCancel: avoid("onCancel"),
        onError: avoid("onError"),
      });

      return instance.render("#testContainer");
    });
  });

  it("should render venmo button for mobile when eligibility is true", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
      window.outerHeight = 667;
      window.localStorage.setItem("enable_venmo_ios", true);
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO],
        "eligible",
        true
      );

      const instance = window.paypal.Buttons({
        test: {
          onRender: expect("onRender", ({ xprops, fundingSources }) => {
            const {
              experiment: { enableVenmo },
            } = xprops;
            if (!enableVenmo) {
              throw new Error(
                `Expected venmo experiment to be eligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (!fundingSources.includes(FUNDING.VENMO)) {
              throw new Error(
                `Venmo is missing from the list of funding sources: ${fundingSources}`
              );
            }

            mockEligibility.cancel();
          }),
        },

        onApprove: avoid("onApprove"),
        onCancel: avoid("onCancel"),
        onError: avoid("onError"),
      });

      return instance.render("#testContainer");
    });
  });

  it("should not render venmo button for mobile when eligibility is false", () => {
    return wrapPromise(({ expect, avoid }) => {
      window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
      const mockEligibility = mockProp(
        window.__TEST_FUNDING_ELIGIBILITY__[FUNDING.VENMO],
        "eligible",
        true
      );

      const instance = window.paypal.Buttons({
        test: {
          onRender: expect("onRender", ({ xprops, fundingSources }) => {
            const {
              experiment: { enableVenmo },
            } = xprops;
            if (!enableVenmo) {
              throw new Error(
                `Expected venmo experiment to be eligible: ${JSON.stringify(
                  xprops.experiment
                )}`
              );
            }

            if (!fundingSources.includes(FUNDING.VENMO)) {
              throw new Error(
                `Venmo is missing from the list of funding sources: ${fundingSources}`
              );
            }

            mockEligibility.cancel();
          }),
        },

        onApprove: avoid("onApprove"),
        onCancel: avoid("onCancel"),
        onError: avoid("onError"),
      });

      return instance.render("#testContainer");
    });
  });
});

describe("paypal on file eligibility", () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it(`should render paypal button with wallet instrument labels and aria-label when ppof eligibility is true`, (done) => {
    const fundingSource = FUNDING.PAYPAL;
    const content = testContent;
    const wallet = {
      [fundingSource]: {
        instruments: [
          {
            accessToken: null,
            instrumentID: "abc12345",
            label: "••1234",
            logoUrl: null,
            oneClick: true,
            planID: null,
            secondaryInstruments: [
              {
                instrumentID: "BALANCEUSD",
                label: "PayPal Balance",
                type: "BALANCE",
              },
            ],
            tokenID: null,
            type: "card",
            vendor: "VISA",
          },
        ],
      },
    };

    window.paypal
      .Buttons({
        content,
        fundingSource,
        wallet,
        showPayLabel: false,
        test: {
          onRender: () => {
            assert.equal(
              getElementRecursive(".balance .paypal-button-text").innerHTML,
              "Balance &amp;"
            );
            assert.equal(
              getElementRecursive(".fi-label .paypal-button-text").innerHTML,
              "••1234"
            );
            assert.equal(
              getElementRecursive(".menu-button").getAttribute("aria-label"),
              "More options"
            );
            done();
          },
        },
      })
      .render("#testContainer");
  });
});

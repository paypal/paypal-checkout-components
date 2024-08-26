/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";
import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";

import {
  createTestContainer,
  destroyTestContainer,
  IPHONE6_USER_AGENT,
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

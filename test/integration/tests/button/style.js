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
  mockProp,
  IPHONE6_USER_AGENT,
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

  it("should render a button with gold background when empty string is passed in for color", () => {
    return window.paypal
      .Buttons({
        style: {
          color: "",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button-color-gold"));
      });
  });

  it("should render a button with gold background when no color is specified", () => {
    return window.paypal
      .Buttons()
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button-color-gold"));
      });
  });

  it('should render a button with black background when passed "black"', () => {
    return window.paypal
      .Buttons({
        style: {
          color: "black",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button-color-black"));
      });
  });

  it('should render a button with gold background when passed ""', () => {
    return window.paypal
      .Buttons({
        style: {
          color: "gold",
        },
      })
      .render("#testContainer")
      .then(() => {
        assert.ok(getElementRecursive(".paypal-button-color-gold"));
      });
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

describe.only("Button Redesign", () => {
  const setMockPaypalRebrandExperiment = (value) =>
    mockProp(
      window.__TEST_FIRST_RENDER_EXPERIMENTS__,
      "isPaypalRebrandEnabled",
      value
    );

  const setMockPaypalRebrandABTestExperiment = (value) =>
    mockProp(
      window.__TEST_FIRST_RENDER_EXPERIMENTS__,
      "isPaypalRebrandABTestEnabled",
      value
    );

  const enableFundingSource = (fundingSource) => {
    mockProp(
      window.__TEST_FUNDING_ELIGIBILITY__[fundingSource],
      "eligible",
      true
    );
  };

  const validateLegacyGoldButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-gold"));
    assert.ok(getElementRecursive(".paypal-button-text-color-black"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}.paypal-logo-color-blue`
      )
    );
  };

  const validateLegacyBlackButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-black"));
    assert.ok(getElementRecursive(".paypal-button-text-color-white"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}.paypal-logo-color-white`
      )
    );
  };

  const validateLegacyBlackCardButton = (fundingSource = "card") => {
    assert.ok(getElementRecursive(".paypal-button-color-black"));
    assert.ok(getElementRecursive(".paypal-button-text-color-white"));
    assert.ok(getElementRecursive(`.paypal-logo-${fundingSource}`));
  };

  const validateLegacyWhiteCardButton = (fundingSource = "card") => {
    assert.ok(getElementRecursive(".paypal-button-color-white"));
    assert.ok(getElementRecursive(".paypal-button-text-color-black"));
    assert.ok(getElementRecursive(`.paypal-logo-${fundingSource}`));
  };

  const validateLegacyWhiteButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-white"));
    assert.ok(getElementRecursive(".paypal-button-text-color-black"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}.paypal-logo-color-blue`
      )
    );
  };

  const validateLegacySilverButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-silver"));
    assert.ok(getElementRecursive(".paypal-button-text-color-black"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}.paypal-logo-color-blue`
      )
    );
  };

  const validateBlueRebrandButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-rebrand_blue"));
    assert.ok(getElementRecursive(".paypal-button-text-color-black"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}-rebrand.paypal-logo-color-black`
      )
    );
  };

  const validateDarkBlueRebrandButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-rebrand_darkblue"));
    assert.ok(getElementRecursive(".paypal-button-text-color-white"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}-rebrand.paypal-logo-color-blue`
      )
    );
  };

  const validateLegacyBlueButton = (fundingSource = "paypal") => {
    assert.ok(getElementRecursive(".paypal-button-color-blue"));
    assert.ok(getElementRecursive(".paypal-button-text-color-white"));
    assert.ok(
      getElementRecursive(
        `.paypal-logo-${fundingSource}.paypal-logo-color-white`
      )
    );
  };

  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  describe("button color A/B Test", () => {
    const fundingSource = "paypal";
    describe("render legacy button", () => {
      it("should render the legacy button when isPaypalRebrandEnabled and isPaypalRebrandABTestEnabled is false", () => {
        const mockPaypalRebrandExperiment =
          setMockPaypalRebrandExperiment(false);
        const mockPaypalRebrandABTestExperiment =
          setMockPaypalRebrandABTestExperiment(false);

        const button = window.paypal.Buttons({
          fundingSource,
        });

        return button.render("#testContainer").then(() => {
          validateLegacyGoldButton();

          mockPaypalRebrandExperiment.cancel();
          mockPaypalRebrandABTestExperiment.cancel();
        });
      });

      it("should render the legacy button when isPaypalRebrandEnabled false and isPaypalRebrandABTestEnabled is true", () => {
        const mockPaypalRebrandExperiment =
          setMockPaypalRebrandExperiment(false);
        const mockPaypalRebrandABTestExperiment =
          setMockPaypalRebrandABTestExperiment(true);

        const button = window.paypal.Buttons({
          fundingSource,
        });

        return button.render("#testContainer").then(() => {
          validateLegacyGoldButton();

          mockPaypalRebrandExperiment.cancel();
          mockPaypalRebrandABTestExperiment.cancel();
        });
      });
    });

    describe("render A/B Test button", () => {
      it("should render one of three button colors when isPaypalRebrandEnabled and isPaypalRebrandABTestEnabled is true", () => {
        const mockPaypalRebrandExperiment =
          setMockPaypalRebrandExperiment(true);
        const mockPaypalRebrandABTestExperiment =
          setMockPaypalRebrandABTestExperiment(true);

        const button = window.paypal.Buttons({
          fundingSource,
        });

        return button.render("#testContainer").then(() => {
          let passed = false;

          try {
            validateBlueRebrandButton();
            passed = passed || true;
          } catch (err) {
            // Ignore error and continue
          }

          try {
            validateLegacyGoldButton();
            passed = true;
          } catch (err) {
            // Ignore error and continue
          }

          try {
            validateDarkBlueRebrandButton();
            passed = passed || true;
          } catch (err) {
            // Ignore error and continue
          }

          assert.ok(passed, "Expected at least one button style to pass");

          mockPaypalRebrandExperiment.cancel();
          mockPaypalRebrandABTestExperiment.cancel();
        });
      });
    });
  });

  describe("full rebrand", () => {
    describe("funding source = PayPal", () => {
      const fundingSource = "paypal";

      describe("supported rebranded colors", () => {
        it("should render the rebranded light blue button when color is blue and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "blue",
            },
          });

          return button.render("#testContainer").then(() => {
            validateBlueRebrandButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });

        // This test fails since the first time normalizeButtonStyles is called isPaypalRebrandEnabled is undefined
        it.skip("should render the rebranded dark blue button when color is darkblue and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "darkblue",
            },
          });

          return button.render("#testContainer").then(() => {
            validateDarkBlueRebrandButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the rebranded blue button when color is gold and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "gold",
            },
          });

          return button.render("#testContainer").then(() => {
            validateBlueRebrandButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });
      });

      describe("not supported rebranded colors (yet)", () => {
        it("should render the legacy black button when color is black and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "black",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacyBlackButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the legacy white button when color is white and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "white",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacyWhiteButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the legacy silver button when color is silver and isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "silver",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacySilverButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });
      });
    });

    describe("unsupported funding sources", () => {
      describe("funding source = Venmo", () => {
        const fundingSource = "venmo";

        beforeEach(() => {
          enableFundingSource(fundingSource);
          window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
        });

        it("should render the legacy venmo button when isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // blue is the default color for Venmo
            validateLegacyBlueButton(fundingSource);

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the legacy venmo button when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // blue is the default color for Venmo
            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });

        it("should render the legacy venmo button in black color is black & when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "black",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacyBlackButton(fundingSource);

            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });
      });

      describe("funding source = PayLater", () => {
        const fundingSource = "paylater";

        beforeEach(() => {
          enableFundingSource(fundingSource);
        });

        it("should render the legacy PayLater button when isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // white is the default color for Pay Later
            validateLegacyWhiteButton("pp");

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the legacy PayLater button when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // white is the default color for Pay Later
            validateLegacyWhiteButton("pp");

            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });

        it("should render the legacy PayLater button in black color is black & when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "black",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacyBlackButton("pp");

            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });
      });

      describe("funding source = Card", () => {
        const fundingSource = "card";

        beforeEach(() => {
          enableFundingSource(fundingSource);
        });

        it("should render the legacy card button when isPaypalRebrandEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // black is the default color for Card
            validateLegacyBlackCardButton();

            mockPaypalRebrandExperiment.cancel();
          });
        });

        it("should render the legacy card button when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
          });

          return button.render("#testContainer").then(() => {
            // black is the default color for Card
            validateLegacyBlackCardButton();

            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });

        it("should render the legacy card button in white color is white & when isPaypalRebrandEnabled is true & isPaypalRebrandABTestEnabled is true", () => {
          const mockPaypalRebrandExperiment =
            setMockPaypalRebrandExperiment(true);
          const mockPaypalRebrandABTestExperiment =
            setMockPaypalRebrandABTestExperiment(true);

          const button = window.paypal.Buttons({
            fundingSource,
            style: {
              color: "white",
            },
          });

          return button.render("#testContainer").then(() => {
            validateLegacyWhiteCardButton();

            mockPaypalRebrandExperiment.cancel();
            mockPaypalRebrandABTestExperiment.cancel();
          });
        });
      });
    });
  });
});

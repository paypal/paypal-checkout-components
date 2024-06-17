/* @flow */
/* eslint max-lines: 0 */

import { getElement, createElement, once } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";

import {
  createTestContainer,
  destroyTestContainer,
  onElementResize,
  getElementRecursive,
} from "../common";
import { testContent } from "../../../content";

describe(`paypal button component sizes`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("should render a responsive button in the small spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "162px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 162;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the medium spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "250px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 250;
    const expectedHeight = 35;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive PPoF button in the medium spectrum with menu button displayed", (done) => {
    done = once(done);

    const containerWidth = 250;

    const container = createElement(
      "div",
      {
        style: {
          width: `${containerWidth}px`,
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

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

        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const paypalButton = getElementRecursive(".paypal-button");
            const paypalButtonWidth = paypalButton.offsetWidth;
            const menuButton = getElementRecursive(".menu-button");

            if (!menuButton) {
              return done(
                new Error("Expected menu button to be rendered to the DOM")
              );
            }

            if (paypalButtonWidth === containerWidth) {
              return done(
                new Error(
                  "Menu button should be visibile at >= 250px button width, but is scrolled out of view"
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the large spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "350px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 350;
    const expectedHeight = 45;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button below the tiny spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "30px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 150;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button above the large spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "800px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 750;
    const expectedHeight = 55;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");

            // $FlowFixMe
            const win = frame.contentWindow;
            const buttonContainer = win.document.body.querySelector(
              ".paypal-button-container"
            );
            const width = buttonContainer.offsetWidth;
            const height = buttonContainer.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the tiny spectrum into an element below the minimum height", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "68px",
          height: "5px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 150;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the small spectrum into an element below the minimum height", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "155px",
          height: "22px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 155;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the medium spectrum into an element below the minimum height", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "235px",
          height: "27px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 235;
    const expectedHeight = 35;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button in the large spectrum into an element below the minimum height", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "370px",
          height: "40px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 370;
    const expectedHeight = 45;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive pay button below the small spectrum", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "40px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 150;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        test: {},

        style: {
          layout: "horizontal",
          label: "pay",
          tagline: false,
        },

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it.skip("should render a responsive button and resize it", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "162px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 255;
    const expectedHeight = 38;

    window.paypal
      .Buttons({
        test: {},

        style: {
          layout: "horizontal",
          label: "pay",
          tagline: false,
        },

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          const frame = getElement("#testContainer iframe");

          onElementResize(frame, {})
            .then(() => {
              const height = frame.offsetHeight;

              if (height === 42) {
                return onElementResize(frame, {
                  height: expectedHeight,
                  width: expectedWidth,
                });
              }
            })
            .then(done, done);

          container.style.width = "255px";
        },
      })
      .render(container);
  });

  it("should render a responsive button and resize the zoid container when the button resizes", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "162px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 255;
    const expectedHeight = 35;

    window.paypal
      .Buttons({
        test: {},

        style: {
          layout: "horizontal",
          label: "pay",
          tagline: false,
        },

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          const frame = getElement("#testContainer iframe");

          onElementResize(frame, {})
            .then(() => {
              const height = frame.offsetHeight;

              if (height === 42) {
                return onElementResize(frame, {
                  height: expectedHeight,
                  width: expectedWidth,
                });
              }
            })
            .then(() => {
              const zoidContainer = container.querySelector(
                ".paypal-buttons-context-iframe"
              );
              if (
                !zoidContainer ||
                parseInt(zoidContainer.style.height, 10) !== expectedHeight
              ) {
                done(
                  new Error(
                    // $FlowFixMe
                    `Expected zoid container height to be ${expectedHeight}. Received: ${zoidContainer.style.height}`
                  )
                );
              }
            })
            .then(done, done);

          container.style.width = "255px";
        },
      })
      .render(container);
  });

  it("should render a responsive button in a hidden element then display it", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "457px",
          height: "100px",
          display: "none",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 457;
    const expectedHeight = 45;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          const frame = getElement("#testContainer iframe");
          onElementResize(frame, {
            height: expectedHeight,
            width: expectedWidth,
          }).then(done, done);
          container.style.display = "block";
        },
      })
      .render(container);
  });

  it("should render a responsive button in a floated div without a width", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          height: "100px",
          float: "right",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 150;
    const expectedHeight = 25;

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button centered", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          height: "100px",
          width: "800px",
          textAlign: "center",
        },
      },
      getElement("#testContainer")
    );

    window.paypal
      .Buttons({
        style: {
          layout: "horizontal",
          tagline: false,
        },

        test: {},

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const c = container.getBoundingClientRect();
            const e = getElement(
              "#testContainer iframe"
            ).getBoundingClientRect();

            const expectedPosition =
              c.left + Math.floor(c.width / 2) - Math.floor(e.width / 2);
            const actualPosition = e.left;

            if (expectedPosition !== actualPosition) {
              return done(
                new Error(
                  `Expected button to have left position of ${expectedPosition}, found ${actualPosition}`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });

  it("should render a responsive button with a custon height", (done) => {
    done = once(done);

    const container = createElement(
      "div",
      {
        style: {
          width: "162px",
          height: "100px",
        },
      },
      getElement("#testContainer")
    );

    const expectedWidth = 162;
    const expectedHeight = 36;

    window.paypal
      .Buttons({
        test: {},

        style: {
          height: 36,
          layout: "horizontal",
          tagline: false,
        },

        createOrder() {
          done(new Error("Expected createOrder() to not be called"));
        },

        onApprove() {
          done(new Error("Expected onApprove() to not be called"));
        },

        onRendered() {
          setTimeout(() => {
            const frame = getElement("#testContainer iframe");
            const width = frame.offsetWidth;
            const height = frame.offsetHeight;

            if (width !== expectedWidth) {
              return done(
                new Error(
                  `Expected button to have width of ${expectedWidth}px, got ${width}px`
                )
              );
            }

            if (height !== expectedHeight) {
              return done(
                new Error(
                  `Expected button to have height of ${expectedHeight}px, got ${height}px`
                )
              );
            }

            return done();
          }, 100);
        },
      })
      .render(container);
  });
});

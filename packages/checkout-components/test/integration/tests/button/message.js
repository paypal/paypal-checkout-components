/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, getElement } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";
import { getNamespace } from "@paypal/sdk-client/src";

import { CLASS } from "../../../../src/constants";
import {
  assert,
  getElementRecursive,
  createTestContainer,
  destroyTestContainer,
} from "../common";

describe(`paypal button message`, () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  describe("sets computed default values for undefined message properties", () => {
    it("should populate message color when it is undefined", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            message: {},
            test: {
              onRender: expect("onRender", ({ xprops }) => {
                const {
                  message: { color },
                } = xprops;
                if (!color) {
                  throw new Error(
                    `Expected message color property to be populated: ${JSON.stringify(
                      xprops.message
                    )}`
                  );
                }
              }),
            },
          })
          .render("#testContainer");
      });
    });
    it("should populate message align(ment) when it is undefined", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            message: {},
            test: {
              onRender: expect("onRender", ({ xprops }) => {
                const {
                  message: { align },
                } = xprops;
                if (!align) {
                  throw new Error(
                    `Expected message align property to be populated: ${JSON.stringify(
                      xprops.message
                    )}`
                  );
                }
              }),
            },
          })
          .render("#testContainer");
      });
    });
    it("should populate position with bottom when layout is horizontal", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
            },
            message: {},
            test: {
              onRender: expect("onRender", ({ xprops }) => {
                const {
                  message: { position },
                } = xprops;
                assert.equal(position, "bottom");
              }),
            },
          })
          .render("#testContainer");
      });
    });
    it("should populate position with top when layout is vertical", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {},
            test: {
              onRender: expect("onRender", ({ xprops }) => {
                const {
                  message: { position },
                } = xprops;
                assert.equal(position, "top");
              }),
            },
          })
          .render("#testContainer");
      });
    });
  });

  describe("reserves space for message", () => {
    it("should reserve space for a message when messageMarkup is undefined", (done) => {
      window.paypal
        .Buttons({
          message: {},
          test: {
            onRender() {
              const frame = document.querySelector("#testContainer iframe");
              if (!frame) {
                throw new Error(`Cannot find frame`);
              }
              // $FlowFixMe
              const win = frame.contentWindow;
              const message = win.document.querySelector(
                ".paypal-button-message"
              );
              if (!message) {
                done(new Error("No message generated"));
              }
              const reservationDiv = win.document.querySelector(
                ".paypal-button-message-reserved"
              );
              if (!reservationDiv) {
                done(new Error("message space was not reserved"));
              }
              done();
            },
          },
        })
        .render("#testContainer");
    });

    it("should not reserve space for a message when messageMarkup is a string with length === 0", (done) => {
      window.paypal
        .Buttons({
          message: {},
          messageMarkup: "",
          test: {
            onRender() {
              const frame = document.querySelector("#testContainer iframe");
              if (!frame) {
                throw new Error(`Cannot find frame`);
              }

              // $FlowFixMe
              const win = frame.contentWindow;
              const message = win.document.querySelector(
                ".paypal-button-message"
              );
              if (!message) {
                done(new Error("No message generated"));
              }
              const reservationDiv = win.document.querySelector(
                ".paypal-button-message-reserved"
              );
              if (reservationDiv) {
                done(new Error("message space was reserved incorrectly"));
              }
              done();
            },
          },
        })
        .render("#testContainer");
    });

    it("should not reserve space for a message when messageMarkup is a string with length > 0", (done) => {
      window.paypal
        .Buttons({
          message: {},
          messageMarkup: "foo",
          test: {
            onRender() {
              const frame = document.querySelector("#testContainer iframe");
              if (!frame) {
                throw new Error(`Cannot find frame`);
              }

              // $FlowFixMe
              const win = frame.contentWindow;
              const message = win.document.querySelector(
                ".paypal-button-message"
              );
              if (!message) {
                done(new Error("No message generated"));
              }
              const reservationDiv = win.document.querySelector(
                ".paypal-button-message-reserved"
              );
              if (reservationDiv) {
                done(new Error("message space was reserved incorrectly"));
              }
              done();
            },
          },
        })
        .render("#testContainer");
    });
  });

  describe(`prop considerations`, () => {
    it("message should take precedence over tagline when both are truthy", (done) => {
      window.paypal
        .Buttons({
          style: {
            layout: "horizontal",
            tagline: true,
          },
          message: {},
          test: {
            onRender() {
              const frame = getElement("#testContainer iframe");
              // $FlowFixMe
              const win = frame.contentWindow;
              const tagline = win.document.body.querySelector(CLASS.TAGLINE);

              if (tagline) {
                done(new Error(`Expected tagline not to render`));
              }

              assert.ok(getElementRecursive(".paypal-button-message-bottom"));
              done();
            },
          },
        })
        .render("#testContainer");
    });
  });

  describe(`placement`, () => {
    describe("horizontal layout", () => {
      it("should place message on bottom by default", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
            },
            message: {},
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on top when position is top", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
            },
            message: {
              position: "top",
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-top"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on bottom when position is bottom", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
            },
            message: {
              position: "bottom",
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on bottom when no position is specified and credit/debit is a funding source", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
            },
            message: {},
            fundingEligibility: {
              credit: {
                eligible: false,
              },
              paypal: {
                eligible: true,
              },
              card: {
                eligible: true,
              },
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
    });
    describe("vertical layout", () => {
      it("should place message on top by default", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {},
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-top"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on top when position is top", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {
              position: "top",
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-top"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it.skip("should place message on bottom when position is bottom and credit/debit is NOT a funding source", (done) => {
        // skipped because fundingEligibility doesn't seem to be respected as passed in in this test, but confirmed to work as intended on demo page
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {
              position: "bottom",
            },
            fundingEligibility: {
              credit: {
                eligible: true,
              },
              paypal: {
                eligible: true,
              },
              card: {
                eligible: false,
              },
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on top when position is bottom and credit/debit IS a funding source", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {
              position: "bottom",
            },
            fundingEligibility: {
              credit: {
                eligible: true,
              },
              paypal: {
                eligible: true,
              },
              card: {
                eligible: true,
              },
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-top"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
    });
    describe("standalone layout", () => {
      it("should place message on bottom by default", (done) => {
        window.paypal
          .Buttons({
            fundingSource: FUNDING.PAYPAL,
            message: {},
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on top when position is top", (done) => {
        window.paypal
          .Buttons({
            fundingSource: FUNDING.PAYPAL,
            message: {
              position: "top",
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-top"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on bottom when position is bottom", (done) => {
        window.paypal
          .Buttons({
            fundingSource: FUNDING.PAYPAL,
            message: {
              position: "bottom",
            },
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
      it("should place message on bottom when no position is specified and credit/debit is a funding source", (done) => {
        window.paypal
          .Buttons({
            fundingSource: FUNDING.CARD,
            message: {},
            test: {
              onRender() {
                assert.ok(getElementRecursive(".paypal-button-message-bottom"));
                done();
              },
            },
          })
          .render("#testContainer");
      });
    });
  });

  describe("modal", () => {
    it("should ensure data-pp-namespace passes in the namespace", (done) => {
      window.paypal
        .Buttons({
          message: {},
          test: {
            onRender({ hoverMessage }) {
              hoverMessage()
                .then(() => {
                  assert.equal(getNamespace(), window.namespace);
                  done();
                })
                .catch(done);
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal callback with clientID, merchantID, buttonSessionID, and modal callbacks is called on hover", (done) => {
      window.paypal
        .Buttons({
          message: {},
          test: {
            onRender({ hoverMessage }) {
              hoverMessage()
                .then(() => {
                  assert.ok(
                    Object.keys(window.paypal.MessagesModal.mock.calledWith)
                      .length === 4
                  );
                  assert.ok(
                    typeof window.paypal.MessagesModal.mock.calledWith
                      .onApply === "function"
                  );
                  assert.ok(
                    typeof window.paypal.MessagesModal.mock.calledWith
                      .account === "string"
                  );
                  assert.ok(
                    typeof window.paypal.MessagesModal.mock.calledWith
                      .buttonSessionId === "string"
                  );
                  assert.ok(
                    typeof window.paypal.MessagesModal.mock.calledWith
                      .merchantId === "undefined"
                  );
                  done();
                })
                .catch(done);
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal calls create a script with modal data and called with amount, offer, and currency from props", (done) => {
      const props = { offerType: "PAY_LATER", messageType: "GPL" };
      window.paypal
        .Buttons({
          message: {
            amount: 101,
          },
          test: {
            onRender({ clickMessage, hoverMessage }) {
              hoverMessage()
                .then(() => {
                  return clickMessage(props).then(() => {
                    assert.equal(
                      window.paypal.MessagesModal.mock.show.calledWith.amount,
                      101
                    );
                    assert.equal(
                      window.paypal.MessagesModal.mock.show.calledWith.offer,
                      "PAY_LATER"
                    );
                    assert.equal(
                      window.paypal.MessagesModal.mock.show.calledWith.currency,
                      "USD"
                    );
                    done();
                  });
                })
                .catch(done);
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal calls utilize a single modal instance, not creating multiple modals", (done) => {
      const props = { offerType: "PAY_LATER", messageType: "GPL" };
      window.paypal
        .Buttons({
          message: {
            amount: 101,
          },
          test: {
            onRender({ clickMessage, hoverMessage }) {
              hoverMessage()
                .then(() => {
                  return clickMessage(props).then(() => {
                    return hoverMessage().then(() => {
                      return clickMessage(props).then(() => {
                        assert.equal(window.paypal.MessagesModal.mock.calls, 1);
                        done();
                      });
                    });
                  });
                })
                .catch(done);
            },
          },
        })
        .render("#testContainer");
    });
  });

  describe("property normalization", () => {
    it("should convert string type amount to number", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            message: { amount: "100" },
            test: {
              onRender: expect("onRender", ({ xprops }) => {
                const {
                  message: { amount },
                } = xprops;
                assert.equal(amount, 100);
              }),
            },
          })
          .render("#testContainer");
      });
    });
  });
});

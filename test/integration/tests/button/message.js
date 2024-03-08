/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise, getElement } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";

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

  describe("error handling", () => {
    it("should throw error when position is bottom and credit/debit is a funding source", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
            },
            message: {
              position: "bottom",
            },
            onError: expect("onError"),
          })
          .render("#testContainer");
      });
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
    const messageMarkup = `
      <div className=".message__container locale__en" role="button">
          <div className="message__content" >
              <div className="message__logo-container">
                  <div className="message__logo--svg"></div>
              </div>
              <div className=".message__messaging text__content--black">
                  <div className="message__headline">
                      <span style="font-size: 16px">Paypal Pay Later</span>
                  </div>
                  <p className="message__disclaimer">
                      <span></span>
                  </p>
              </div>
          </div>
      </div>`;

    it("should load modal on message hover when window.paypal.MessagesModal is not present", async (done) => {
      window.paypal
        .Buttons({
          message: {},
          messageMarkup,
          test: {
            onRender() {
              const message = document.querySelector(".message__container");
              message?.focus();
              setTimeout(() => assert.ok(window.paypal.MessagesModal), 1000);
              done();
            },
          },
        })
        .render("#testContainer");
    });
    it.skip("should utilize existing MessagesModal on message hover when window.paypal.MessagesModal is present", () => {});
    it("should open modal on message click", (done) => {
      window.paypal.Buttons({
        message: {},
        messageMarkup,
        test: {
          onRender() {
            const message = document.querySelector(".message__container");
            message?.focus();
            message?.click();

            const modalWrapper = document.querySelector(".modal-wrapper");
            assert.ok(modalWrapper);
            done();
          },
        },
      });
    });
    it("should show passed-in amount in modal's pay in 4 view", (done) => {
      window.paypal
        .Buttons({
          message: {
            amount: 100,
          },
          messageMarkup,
          test: {
            onRender() {
              const message = document.querySelector(".message__container");
              message?.focus();

              const payIn4Button =
                document.querySelector(".content__col")?.childNodes[1];
              if (payIn4Button instanceof HTMLElement) {
                payIn4Button.click();
              }

              const payIn4Amount =
                document.querySelector("#donut__payment__1")?.innerHTML;
              assert.equal(payIn4Amount, "$25.00");
              done();
            },
          },
        })
        .render("#testContainer");
    });
  });
});

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
    // const messageMarkup = `
    //   <div class=".message__container locale__en" role="button">
    //       <div class="message__content" >
    //           <div class="message__logo-container">
    //               <div class="message__logo--svg"></div>
    //           </div>
    //           <div class=".message__messaging text__content--black">
    //               <div class="message__headline">
    //                   <span style="font-size: 16px">Paypal Pay Later</span>
    //               </div>
    //               <p class="message__disclaimer">
    //                   <span></span>
    //               </p>
    //           </div>
    //       </div>
    //   </div>`;

    it("should ensure data-pp-namespace passes in the namespace", (done) => {
      window.paypal
        .Buttons({
          message: {},
          test: {
            onRender({ hoverMessage }) {
              hoverMessage().then(() => {
                assert.equal(getNamespace(), window.namespace);
                done();
              });
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal callback with clientID and merchantID is called on hover", (done) => {
      const props = { clientID: "test1", merchantID: ["test2"] };
      window.paypal
        .Buttons({
          message: {},
          test: {
            onRender({ hoverMessage }) {
              hoverMessage().then(() => {
                done(
                  new Error(
                    `${JSON.stringify(
                      window.paypal.MessagesModal.mock.calledWith
                    )}`
                  )
                );
                assert.equal(
                  window.paypal.MessagesModal.mock.calledWith,
                  props
                );
                done();
              });
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal calls create a script with modal data and called with amount, offer, and currency from props", (done) => {
      const props = { offerType: ["PAY_LATER"], messageType: "GPL" };
      window.paypal
        .Buttons({
          message: {
            amount: 101,
          },
          test: {
            onRender({ clickMessage, hoverMessage }) {
              hoverMessage.then(() => {
                clickMessage.then((props) => {
                  assert.equal(
                    window.paypal.MessagesModal.mock.show.calledWith.amount,
                    101
                  );
                  done();
                });
              });
            },
          },
        })
        .render("#testContainer");
    });
    it("should ensure getModal calls utilize a single modal instance, not creating multiple modals", (done) => {
      const props = { offerType: ["PAY_LATER"], messageType: "GPL" };
      window.paypal
        .Buttons({
          message: {
            amount: 101,
          },
          test: {
            onRender({ clickMessage, hoverMessage }) {
              hoverMessage.then(() => {
                clickMessage.then((props) => {
                  hoverMessage.then(() => {
                    clickMessage.then((props) => {
                      assert.equal(window.paypal.MessagesModal.mock.calls, 1);
                      done();
                    });
                  });
                });
              });
            },
          },
        })
        .render("#testContainer");
    });
  });
});

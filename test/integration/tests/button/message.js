/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from "@krakenjs/belter/src";
import { FUNDING } from "@paypal/sdk-constants/src";

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

    it("should not reserve space for a message when messageMarkup is an empty string", (done) => {
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

    it("should not reserve space for a message when messageMarkup is truthy", (done) => {
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
    it("should throw error when tagline would also appear", () => {
      return wrapPromise(({ expect }) => {
        window.paypal
          .Buttons({
            message: {},
            style: {
              tagline: true,
              layout: "horizontal",
            },
            onError: expect("onError"),
          })
          .render("#testContainer");
      });
    });
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

  describe(`placement`, () => {
    describe("horizontal layout", () => {
      it("should place button on bottom by default", (done) => {
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
      it("should place button on top when position is top", (done) => {
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
      it("should place button on bottom when position is bottom", (done) => {
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
      it.skip("should place button on top when no position is specified and credit/debit is a funding source", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "horizontal",
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
    });
    describe("vertical layout", () => {
      it("should place button on top by default", (done) => {
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
      it("should place button on top when position is top", (done) => {
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
      it.skip("should place button on bottom when position is bottom", (done) => {
        window.paypal
          .Buttons({
            style: {
              layout: "vertical",
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
      it("should place button on top when no position is specified and credit/debit is a funding source", (done) => {
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
    });
    describe("standalone layout", () => {
      it("should place button on bottom by default", (done) => {
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
      it("should place button on top when position is top", (done) => {
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
      it("should place button on bottom when position is bottom", (done) => {
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
      it("should place button on top when no position is specified and credit/debit is a funding source", (done) => {
        window.paypal
          .Buttons({
            fundingSource: FUNDING.CARD,
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
    });
  });
});

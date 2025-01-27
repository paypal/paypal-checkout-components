/* @flow */
/* eslint max-lines: 0 */

import { once } from "@krakenjs/belter/src";

import { createTestContainer, destroyTestContainer } from "../common";

describe(`paypal button component resume flow`, () => {
  const buttonSessionID = "uid_button_session_123444";
  const orderID = "EC-1223114";
  const fundingSource = "paypal";
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("should create a button instance and validate resume flow is false", (done) => {
    done = once(done);
    const buttons = window.paypal.Buttons({
      test: { flow: "popup", action: "checkout" },

      createOrder(): void {
        return done(new Error("Expected createOrder to not be called"));
      },

      onApprove(): void {
        return done(new Error("Expected onApprove to not be called"));
      },

      onCancel(): void {
        return done(new Error("Expected onCancel to not be called"));
      },
    });

    if (buttons.hasReturned() === false) {
      return done();
    }
    return done(new Error("Expected hasReturned to be false"));
  });

  it("should create a button instance with correct query params for resume flow and validate resume flow is true", (done) => {
    done = once(done);
    const location = window.location.href;
    const url = new URL(location);
    url.searchParams.set("buttonSessionID", buttonSessionID);
    url.searchParams.set("orderID", orderID);
    url.searchParams.set("fundingSource", fundingSource);
    url.hash = "#onApprove";

    history.pushState({}, "", url.href);
    const buttons = window.paypal.Buttons({
      test: { flow: "popup", action: "checkout" },

      createOrder(): void {
        return done(new Error("Expected createOrder to not be called"));
      },

      onApprove(): void {
        return done(new Error("Expected onApprove to not be called"));
      },

      onCancel(): void {
        return done(new Error("Expected onCancel to not be called"));
      },
    });

    if (buttons.hasReturned() === true) {
      return done();
    }
    return done(new Error("Expected hasReturned to be true"));
  });

  it("should create a resume flow with onApprove", (done) => {
    done = once(done);
    const location = window.location.href;
    const url = new URL(location);
    url.searchParams.set("buttonSessionID", buttonSessionID);
    url.searchParams.set("orderID", orderID);
    url.searchParams.set("fundingSource", fundingSource);
    url.hash = "#onApprove";

    history.pushState({}, "", url.href);
    const buttons = window.paypal.Buttons({
      test: { action: "approve" },

      createOrder(): void {
        return done(new Error("Expected createOrder to not be called"));
      },

      onApprove(): void {
        return done();
      },

      onCancel(): void {
        return done(new Error("Expected onCancel to not be called"));
      },

      onError(): void {
        return done(new Error("Expected onError to not be called"));
      },
    });
    setTimeout(() => {
      done();
    }, 1000);

    if (buttons.hasReturned() === true) {
      buttons.resume();
    } else {
      return done(new Error("Expected hasReturned to be true"));
    }
  });

  it("should create a resume flow with onError", (done) => {
    done = once(done);
    const location = window.location.href;
    const url = new URL(location);
    url.searchParams.set("buttonSessionID", buttonSessionID);
    url.searchParams.set("orderID", orderID);
    url.searchParams.set("fundingSource", fundingSource);
    url.hash = "#onApprove";

    history.pushState({}, "", url.href);
    const buttons = window.paypal.Buttons({
      test: { action: "error" },

      createOrder(): void {
        return done(new Error("Expected createOrder to not be called"));
      },

      onApprove(): void {
        return done(new Error("Expected onApprove to not be called"));
      },

      onCancel(): void {
        return done(new Error("Expected onCancel to not be called"));
      },

      onError(): void {
        return done();
      },
    });
    setTimeout(() => {
      done();
    }, 1000);

    if (buttons.hasReturned() === true) {
      buttons.resume();
    } else {
      return done(new Error("Expected hasReturned to be true"));
    }
  });
});

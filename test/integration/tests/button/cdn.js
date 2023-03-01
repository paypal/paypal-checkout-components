/* @flow */
/* eslint max-lines: 0 */

import { createTestContainer, destroyTestContainer } from "../common";

describe("Tests for button CDN rendering", () => {
  beforeEach(() => {
    createTestContainer();
  });

  afterEach(() => {
    destroyTestContainer();
  });

  it("should render logo from CDN when experiment is active", (done) => {
    window.localStorage.setItem("enable_logo_cdn_experiment", true);

    window.paypal
      .Buttons({
        test: {
          onRender() {
            const frame = document.querySelector("#testContainer iframe");
            if (!frame) {
              throw new Error(`Cannot find frame`);
            }

            // $FlowFixMe
            const win = frame.contentWindow;
            const logoSVG = win.document.querySelector(".paypal-logo");

            if (!logoSVG.src.startsWith("https://www.paypalobjects.com")) {
              done(new Error("Logo should be loaded from CDN"));
            }
            done();
          },
        },

        onError: done,
      })
      .render("#testContainer");
  });

  it("should not render logo from CDN when experiment is inactive", (done) => {
    window.paypal
      .Buttons({
        test: {
          onRender() {
            const frame = document.querySelector("#testContainer iframe");
            if (!frame) {
              throw new Error(`Cannot find frame`);
            }

            // $FlowFixMe
            const win = frame.contentWindow;
            const logoSVG = win.document.querySelector(".paypal-logo");

            if (logoSVG.src.startsWith("https://www.paypalobjects.com")) {
              done(new Error("Logo should not be loaded from CDN"));
            }
            done();
          },
        },

        onError: done,
      })
      .render("#testContainer");
  });
});

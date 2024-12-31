/* @flow */
/* eslint max-lines: 0 */

import { wrapPromise } from "@krakenjs/belter/src";

import {
  createTestContainer,
  destroyTestContainer,
  WEBVIEW_USER_AGENT,
} from "../common";

for (const flow of ["popup", "iframe"]) {
  describe(`paypal button component instant click path on ${flow}`, () => {
    beforeEach(() => {
      createTestContainer();
      if (flow === "iframe") {
        window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
      }
    });

    afterEach(() => {
      destroyTestContainer();
    });

    it.only("should render a button into a container and click on the button instantly, then complete the checkout", (done) => {
      wrapPromise(({ expect, error }) => {
        window.paypal
          .Buttons({
            test: {
              // flow,
              onRender() {
                try {
                  const frame = document.querySelector(
                    "#testContainer iframe.prerender-frame"
                  );

                  if (!frame) {
                    done(new Error(`Can not find prerender frame`));
                  }

                  // $FlowFixMe
                  const win = frame.contentWindow;
                  // if (!win) {
                  //   done(new Error(`win is not winning`));
                  // }

                  setTimeout(() => {
                    const button = win.document.querySelector(`[role="link"]`);

                    frame.click();
                    if (!button) {
                      done(new Error(`not buttonn!!`));
                    }
                    button.click();
                    done();
                  }, 0);
                } catch (e) {
                  done(e);
                }
              },
            },
            onApprove: expect("onApprove"),
            onCancel: error("onCancel"),
            onError: error("onError", (err) => {
              throw err;
            }),
          })
          .render("#testContainer");
      });
    });

    it("should render a button into a container and press space button on the button instantly, then complete the checkout", (done) => {
      wrapPromise(({ expect, error }) => {
        const buttonRender = window.paypal
          .Buttons({
            test: {
              flow,
              onRender() {
                try {
                  const frame = document.querySelector(
                    "#testContainer iframe.prerender-frame"
                  );

                  if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                  }

                  // $FlowFixMe
                  const win = frame.contentWindow;
                  const button = win.document.querySelector('[role="link"]');

                  frame.click();
                  button.dispatchEvent(
                    new KeyboardEvent("keypress", { keyCode: 32 })
                  );
                  done();
                } catch (e) {
                  done(e);
                }
              },
            },
            onApprove: expect("onApprove"),
            onCancel: error("onCancel"),
            onError: error("onError", (err) => {
              throw err;
            }),
          })
          .render("#testContainer");

        return buttonRender;
      });
    });

    it("should render a button into a container and press enter button on the button instantly, then complete the checkout", (done) => {
      wrapPromise(({ expect, error }) => {
        const buttonRender = window.paypal
          .Buttons({
            test: {
              flow,
              onRender() {
                try {
                  const frame = document.querySelector(
                    "#testContainer iframe.prerender-frame"
                  );

                  if (!frame) {
                    throw new Error(`Can not find prerender frame`);
                  }

                  // $FlowFixMe
                  const win = frame.contentWindow;
                  const button = win.document.querySelector('[role="link"]');

                  frame.click();
                  button.dispatchEvent(
                    new KeyboardEvent("keypress", { keyCode: 13 })
                  );
                  done();
                } catch (e) {
                  done(e);
                }
              },
            },
            onApprove: expect("onApprove"),
            onCancel: error("onCancel"),
            onError: error("onError", (err) => {
              throw err;
            }),
          })
          .render("#testContainer");

        return buttonRender;
      });
    });
  });
}

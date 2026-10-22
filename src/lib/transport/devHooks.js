/* @flow */

import { getEnv } from "@paypal/sdk-client/src";
import { ENV } from "@paypal/sdk-constants/src";

/**
 * TESTING ONLY. Delete this file, and its one call in openerWatch.js, before
 * merging.
 *
 * Console command for exercising the fallback in a non-production environment:
 *
 *   __PP_TRANSPORT__.severOpener()
 *
 * Sets `window.opener` to null, which is what real opener loss looks like to
 * the popup: zoid and post-robot read `window.opener` at call time, so
 * postMessage to the parent stops working, and the opener watch sees null and
 * switches to Firebase. Not installed in production.
 */
export function installDevHooks() {
  try {
    if (getEnv() === ENV.PRODUCTION) {
      return;
    }

    // $FlowFixMe[prop-missing] deliberate debug global
    window.__PP_TRANSPORT__ = {
      severOpener: () => {
        window.opener = null;

        if (window.opener) {
          // Some browsers ignore the assignment; shadow the property instead.
          Object.defineProperty(window, "opener", {
            value: null,
            configurable: true,
          });
        }

        return window.opener === null;
      },
    };
  } catch (err) {
    // No env available in this context; skip rather than expose it blindly.
  }
}

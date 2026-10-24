/* @flow */

import { getEnv } from "@paypal/sdk-client/src";
import { ENV } from "@paypal/sdk-constants/src";

/**
 * TESTING ONLY. Delete this file, its call in openerWatch.js, and the
 * severOpenerAtBootIfRequested() call in zoid/checkout/component.jsx before
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
function severWindowOpener(): boolean {
  window.opener = null;

  if (window.opener) {
    // Some browsers ignore the assignment; shadow the property instead.
    Object.defineProperty(window, "opener", {
      value: null,
      configurable: true,
    });
  }

  return window.opener === null;
}

/**
 * Boot-time opener loss, for testing the detached bootstrap. Set once on the
 * merchant page (same origin as the popup in local testing):
 *
 *   localStorage.__pp_sever_at_boot = "1"      // on
 *   localStorage.removeItem("__pp_sever_at_boot")   // off
 *
 * and every checkout popup then loses its opener BEFORE zoid registers the
 * child, which is the case a console command can't reach. Only acts in a
 * zoid-rendered window (never on the merchant page) and never in production.
 */
export function severOpenerAtBootIfRequested() {
  try {
    if (
      getEnv() === ENV.PRODUCTION ||
      window.name.indexOf("__zoid__") !== 0 ||
      window.localStorage.getItem("__pp_sever_at_boot") !== "1"
    ) {
      return;
    }

    severWindowOpener();
  } catch (err) {
    // No env or storage in this context; skip.
  }
}

export function installDevHooks() {
  try {
    if (getEnv() === ENV.PRODUCTION) {
      return;
    }

    // $FlowFixMe[prop-missing] deliberate debug global
    window.__PP_TRANSPORT__ = {
      severOpener: severWindowOpener,
    };
  } catch (err) {
    // No env available in this context; skip rather than expose it blindly.
  }
}

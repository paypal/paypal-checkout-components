/* @flow */

import { getLogger } from "@paypal/sdk-client/src";

import { getActiveTransport, setActiveTransport } from "./activeTransport";
import { TRANSPORT, OPENER_POLL_MS } from "./constants";

/**
 * Arming (first draft): postMessage is the default transport; once this popup
 * can no longer reach its opener, switch to Firebase.
 *
 * "Lost" means `window.opener` is null or the opener window is closed. Both
 * are readable cross-origin (`closed` is one of the few cross-origin-safe
 * properties); anything else about the opener is not touched.
 *
 * One-way: once on Firebase we stay there. Switching back would need a
 * decision about in-flight calls that has not been made.
 *
 * Known gaps of this draft:
 *   - Polling, so detection lags by up to OPENER_POLL_MS. A call made in that
 *     window goes over postMessage and fails/hangs.
 *   - A reachable-but-unresponsive opener (frozen, discarded, severed by
 *     bfcache) is not detected; only the null/closed signals are.
 *   - No resume/visibility trigger yet. See the stashed detectSuspension.js.
 */
let armed = false;

export function isOpenerLost(): boolean {
  try {
    return !window.opener || window.opener.closed;
  } catch (err) {
    // Reading a property off a severed cross-origin opener can throw.
    return true;
  }
}

function fallBack(reason: string) {
  if (getActiveTransport() === TRANSPORT.FIREBASE) {
    return;
  }

  getLogger()
    .info("checkout_transport_fallback", { reason, to: TRANSPORT.FIREBASE })
    .flush();

  setActiveTransport(TRANSPORT.FIREBASE);
}

export function armTransportFallback() {
  if (armed) {
    return;
  }
  armed = true;

  if (isOpenerLost()) {
    fallBack("opener_lost_at_start");
    return;
  }

  const timer = setInterval(() => {
    if (getActiveTransport() === TRANSPORT.FIREBASE) {
      clearInterval(timer);
      return;
    }

    if (isOpenerLost()) {
      clearInterval(timer);
      fallBack("opener_lost");
    }
  }, OPENER_POLL_MS);
}

/* @flow */

import { getLogger } from "@paypal/sdk-client/src";
import { safeInterval } from "@krakenjs/belter/src";
import { getOpener, isWindowClosed } from "@krakenjs/cross-domain-utils/src";

import { OPENER_POLL_MS } from "./constants";
import { installDevHooks } from "./devHooks";

/**
 * Arming (first draft): postMessage is the default transport; once this popup
 * can no longer reach its opener, switch to Firebase.
 *
 * "Lost" means the opener (as zoid reads it, via cross-domain-utils' `getOpener`)
 * is missing or `isWindowClosed`. Both are safe cross-origin; anything else
 * about the opener is not touched.
 *
 * Nothing here decides anything beyond that one signal, and nothing switches
 * back: once on Firebase we stay there, because switching back would need a
 * decision about in-flight calls that has not been made. What a switch does
 * and does not affect:
 *   - Calls made after the switch use Firebase.
 *   - A call already in flight stays on the transport it started on; it
 *     cannot be migrated.
 *
 * Coordination between the two ends is not needed: the button frame serves
 * the relay for the life of the checkout regardless of this state.
 *
 * Known gaps of this draft:
 *   - Polling, so detection lags by up to OPENER_POLL_MS. Calls are covered by
 *     fallBackIfOpenerLost(); only the Firebase connection start is delayed.
 *   - A reachable-but-unresponsive opener (frozen, discarded, severed by
 *     bfcache) is not detected; only the null/closed signals are.
 *   - No resume/visibility trigger yet. See the stashed detectSuspension.js.
 */
let armed = false;
let fellBack = false;
let onFallbackHandler: ?() => void = null;

/** Whether new calls should go over Firebase. One-way. */
export function isFellBack(): boolean {
  return fellBack;
}

export function isOpenerLost(): boolean {
  try {
    const opener = getOpener(window);
    return !opener || isWindowClosed(opener);
  } catch (err) {
    // Reading a property off a severed cross-origin opener can throw.
    return true;
  }
}

function fallBack(reason: string) {
  if (fellBack) {
    return;
  }

  fellBack = true;

  getLogger()
    .info("checkout_transport_firebase_fallback", {
      reason,
      to: "firebase",
    })
    .flush();

  try {
    if (onFallbackHandler) {
      onFallbackHandler();
    }
  } catch (err) {
    // The handler (eager connect) is best effort; the next call retries.
  }
}

/**
 * Call-time check, used by the wrapper before it picks a transport: if the
 * opener is already gone, switch now rather than waiting for the next poll
 * tick, so a callback made inside the polling gap is not sent over
 * postMessage to a dead target. A no-op while the opener is reachable.
 */
export function fallBackIfOpenerLost() {
  if (!fellBack && isOpenerLost()) {
    fallBack("opener_lost_at_call");
  }
}

/**
 * Start watching. `onFallback` runs once, when the switch happens (including
 * immediately if the opener is already lost); the wrapper uses it to open the
 * Firebase connection early.
 */
export function armTransportFallback(onFallback: () => void) {
  if (armed) {
    return;
  }
  armed = true;
  onFallbackHandler = onFallback;

  installDevHooks(); // testing only, see devHooks.js

  if (isOpenerLost()) {
    fallBack("opener_lost_at_start");
    return;
  }

  const poll = safeInterval(() => {
    if (fellBack) {
      poll.cancel();
      return;
    }

    if (isOpenerLost()) {
      poll.cancel();
      fallBack("opener_lost");
    }
  }, OPENER_POLL_MS);
}

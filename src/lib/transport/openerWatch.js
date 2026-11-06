/* @flow */

import { getLogger } from "@paypal/sdk-client/src";

import { OPENER_POLL_MS } from "./constants";

/**
 * Arming: postMessage is the default transport; once this popup
 * can no longer reach its opener, switch to Firebase.
 *
 * Applies to popups only: a checkout rendered in an iframe is never "lost",
 * since its parent is reachable.
 *
 * "Lost" means `window.opener` is null or the opener window is closed. Both
 * are readable cross-origin (`closed` is one of the few cross-origin-safe
 * properties); anything else about the opener is not touched.
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
 * Known gaps:
 *   - Polling, so detection lags by up to OPENER_POLL_MS. Calls are covered by
 *     fallBackIfOpenerLost(); only the Firebase connection start is delayed.
 *   - A reachable-but-unresponsive opener (frozen, discarded, severed by
 *     bfcache) is not detected; only the null/closed signals are.
 *   - No resume/visibility trigger: a popup that was suspended and resumed is
 *     only noticed by the next poll or the next relayed call.
 */
let armed = false;
let fellBack = false;
// Whether the popup had a live opener when the watch started. Tells "never had
// one" apart from "had one and lost it" in the fallback event.
let hadOpenerAtStart = false;
let onFallbackHandler: ?() => void = null;

/** Whether new calls should go over Firebase. One-way. */
export function isFellBack(): boolean {
  return fellBack;
}

export function isOpenerLost(): boolean {
  try {
    // Only a popup has an opener to lose. Inside an iframe `window.opener` is
    // always null, but the parent is reachable, so this is not a lost opener.
    if (window.parent !== window) {
      return false;
    }

    return !window.opener || window.opener.closed;
  } catch (err) {
    // Reading a property off a severed cross-origin opener can throw.
    return true;
  }
}

// Non-identifying facts about the opener, for working out why it was lost.
// Reading them can throw on a severed cross-origin opener, which is itself a
// signal.
function getOpenerState(): {| openerNull: boolean, openerClosed: ?boolean |} {
  try {
    const opener = window.opener;

    return {
      openerNull: !opener,
      openerClosed: opener ? Boolean(opener.closed) : null,
    };
  } catch (err) {
    return { openerNull: false, openerClosed: null };
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
      hadOpenerAtStart,
      ...getOpenerState(),
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
  hadOpenerAtStart = !isOpenerLost();

  // The denominator for the fallback rate: popups that could fall back.
  try {
    getLogger()
      .info("checkout_transport_firebase_armed", { hadOpenerAtStart })
      .flush();
  } catch (err) {
    // Logging must never affect the checkout.
  }

  if (isOpenerLost()) {
    fallBack("opener_lost_at_start");
    return;
  }

  const timer = setInterval(() => {
    if (fellBack) {
      clearInterval(timer);
      return;
    }

    if (isOpenerLost()) {
      clearInterval(timer);
      fallBack("opener_lost");
    }
  }, OPENER_POLL_MS);
}

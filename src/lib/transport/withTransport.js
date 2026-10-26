/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { getLogger } from "@paypal/sdk-client/src";
import { getQueryParam, stringifyError } from "@krakenjs/belter/src";

import { createFirebaseChannel, type FirebaseChannel } from "./firebaseChannel";
import { getFirebaseConfig } from "./firebaseConfig";
import {
  armTransportFallback,
  fallBackIfOpenerLost,
  isFellBack,
} from "./openerWatch";
import { pickRelayable } from "./pickRelayable";
import { RELAYABLE } from "./constants";

/**
 * Route an xprops callback over postMessage, or over the Firebase relay once
 * the popup has fallen back (see openerWatch.js).
 *
 * Applied via zoid's PUBLIC `childDecorate` prop hook, so nothing in zoid or
 * post-robot is modified: the function the checkout app calls as
 * `window.xprops.onApprove(...)` is this wrapper, and the app never learns
 * which wire carried the call.
 *
 * Until the popup falls back, the wrapper is a pass-through to the original
 * cross-domain function, i.e. exactly today's behaviour.
 *
 * After it falls back, the call goes over the relay instead as a named
 * request carrying only the filtered first argument. Function arguments
 * (`actions`) cannot travel: the parent reports a `reject` back in its
 * response and this wrapper applies it to the app's own `actions.reject`.
 *
 * The only automatic switch is postMessage -> firebase when the opener is
 * lost (openerWatch.js). If the popup has fallen back and Firebase is
 * unavailable, the call rejects; there is no fallback back to postMessage.
 */

let channel: ?FirebaseChannel = null;

/**
 * The channel key is the per-checkout `relayChannelID`, a UUID the button
 * frame generates and the checkout component sends as a `queryParam`, so it
 * is in this popup's own URL and survives loss of both `window.opener` and
 * `window.name`. Reading it from `window.xprops` would defeat the purpose —
 * xprops arrives over the very channel that may be down.
 */
function getRelayChannelID(): ?string {
  return getQueryParam("relayChannelID") || null;
}

function getChannel(): FirebaseChannel {
  if (channel && channel.isUsable()) {
    return channel;
  }

  if (channel) {
    // The previous connection failed or was closed; start a fresh one.
    channel.close();
    channel = null;
  }

  const channelID = getRelayChannelID();
  const config = getFirebaseConfig();

  if (!channelID || !config) {
    const unavailableReason = !channelID
      ? "no_channel_id"
      : "no_firebase_config";

    getLogger()
      .info("checkout_transport_firebase_unavailable", {
        reason: unavailableReason,
      })
      .flush();

    throw new Error(
      `Firebase transport is active but unavailable (${unavailableReason})`,
    );
  }

  channel = createFirebaseChannel({
    sessionUID: channelID,
    config,
  });
  return channel;
}

/**
 * Connect eagerly: open the Firebase channel as soon as the popup falls back,
 * instead of on the first relayed call. Token fetch, SDK load and sign-in
 * then happen while the page is idle, so the first call does not pay for
 * them, and a setup failure shows up in the logs immediately rather than at
 * the moment a callback is needed. Passed to `armTransportFallback`.
 *
 * Failure here is deliberately quiet: getChannel() has already logged it, and
 * the next real call retries with a fresh channel.
 */
function connectEagerly() {
  try {
    getChannel();
  } catch (err) {
    // Logged in getChannel(); a later call will retry.
  }
}

export function withTransport<T>(name: string, value: ?T): ?T {
  if (typeof value !== "function") {
    return value;
  }

  const allowedKeys = RELAYABLE[name];

  if (!allowedKeys) {
    // Not relayable. Hand back the original rather than adding a layer to a
    // function that will only ever travel one way.
    return value;
  }

  // No channel id means the button frame did not offer the relay (older
  // frame, an iframe checkout, the experiment off, or id generation failed).
  // Hand back the original function: such a popup runs exactly the code it
  // ran before the relay existed. A failure reading the URL must not break
  // xprops hydration either, so it also means no relay.
  let relayOffered = false;

  try {
    relayOffered = Boolean(getRelayChannelID());
  } catch (err) {
    // Treated as not offered.
  }

  if (!relayOffered) {
    return value;
  }

  // Runs on every relay popup: a failure here must not be able to break
  // xprops hydration.
  try {
    armTransportFallback(connectEagerly);
  } catch (err) {
    getLogger()
      .warn("checkout_transport_firebase_setup_failed", {
        label: "popup_install",
        err: stringifyError(err),
      })
      .flush();
  }

  // $FlowFixMe[incompatible-return] wrapper preserves the callable shape
  return function transportRouted(...args): ZalgoPromise<mixed> {
    // Only popups that were offered the relay may switch. Checked at call time
    // so a call inside the polling gap does not go to a dead opener.
    try {
      fallBackIfOpenerLost();
    } catch (err) {
      // Never let the check itself break a call that postMessage could serve.
    }

    if (!isFellBack()) {
      // $FlowFixMe[object-this-reference]
      return value.apply(this, args);
    }

    return ZalgoPromise.try(() => {
      const [first, ...rest] = args;

      getLogger()
        .info("checkout_transport_firebase_call", {
          name,
          transport: "firebase",
        })
        .flush();

      const actions = rest[0];

      return getChannel()
        .request(name, pickRelayable(name, first))
        .then((response) => {
          // Shipping callbacks: the parent's handler called `actions.reject`.
          // Replay it locally so the app runs its own reject behaviour.
          if (
            response &&
            typeof response === "object" &&
            // $FlowFixMe[prop-missing]
            response.rejected &&
            actions &&
            typeof actions.reject === "function"
          ) {
            // $FlowFixMe[prop-missing]
            return actions.reject(response.message);
          }
        });
    });
  };
}

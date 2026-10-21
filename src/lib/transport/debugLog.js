/* @flow */

import { getDebug, getLogger } from "@paypal/sdk-client/src";

/**
 * Per-message relay logging, off unless the SDK's `debug` flag is on. Carries
 * names, IDs and statuses only, never payloads, order IDs or tokens.
 */
export function logTransportDebug(
  event: string,
  payload?: { [string]: mixed },
) {
  try {
    if (!getDebug()) {
      return;
    }

    getLogger().info(`checkout_transport_firebase_${event}`, payload).flush();
  } catch (err) {
    // Logging must never affect a relayed call.
  }
}

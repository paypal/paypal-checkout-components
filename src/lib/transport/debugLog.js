/* @flow */

import { getLogger } from "@paypal/sdk-client/src";

/**
 * Per-message relay logging. Goes through the logger like any other event
 * (console in local and stage). Carries names, IDs and statuses only, never
 * payloads, order IDs or tokens.
 */
export function logTransportDebug(
  event: string,
  payload?: { [string]: mixed },
) {
  try {
    getLogger().info(`checkout_transport_firebase_${event}`, payload).flush();
  } catch (err) {
    // Logging must never affect a relayed call.
  }
}

/* @flow */

import { TRANSPORT, DEFAULT_TRANSPORT, type TransportName } from "./constants";

/**
 * Which transport NEW calls use. This is the whole of the "policy" surface.
 *
 * It is plain state with a setter. Nothing here decides *when* to switch —
 * no failure detection, no freeze detection, no heuristics. That question is
 * open for the v5 team and is deliberately not answered by this code. Whoever
 * decides it calls `setActiveTransport`.
 *
 * What a switch does and does not affect:
 *   - Calls made after the switch use the new transport.
 *   - A call already in flight stays on the transport it started on; it
 *     cannot be migrated.
 *   - A callback stub already handed to the peer keeps using the transport it
 *     was created on, because the stub is bound to that wire.
 *
 * Coordination between the two ends is out of scope for this prototype: the
 * working assumption is that both ends are switched together. The parent
 * enforces that assumption defensively — see smartcomponentnodeweb's
 * `checkoutTransportPeer`, which rejects relayed calls while it is not itself
 * on Firebase.
 */

let active: TransportName = DEFAULT_TRANSPORT;
let handlers: Array<(TransportName) => void> = [];

export function getActiveTransport(): TransportName {
  return active;
}

export function setActiveTransport(next: TransportName) {
  if (next !== TRANSPORT.POST_MESSAGE && next !== TRANSPORT.FIREBASE) {
    throw new Error(`Unknown transport: ${String(next)}`);
  }

  if (next === active) {
    return;
  }

  active = next;

  for (const handler of handlers) {
    handler(next);
  }
}

export function onTransportChange(
  handler: (TransportName) => void,
): () => void {
  handlers.push(handler);

  return () => {
    handlers = handlers.filter((existing) => existing !== handler);
  };
}

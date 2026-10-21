/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request } from "@krakenjs/belter/src";

import { RELAY_SESSION_TOKEN_PATH } from "./constants";

/**
 * Mint a Firebase custom auth token for a relay channel.
 *
 * Uses smartcomponentnodeweb's endpoint:
 *
 *   GET /smart/relay/session-token?sessionId=<uuid>
 *   -> { sessionToken }
 *
 * This REPLACES the earlier `GetFireBaseSessionToken` GraphQL call. That call
 * signs tokens for the Venmo-era project (`testmessaging-63f5d`), while the
 * PayPal-owned relay projects (dev52 / dcg18 / dcg04) are served only by this
 * endpoint; a token from the wrong one fails with CREDENTIAL_MISMATCH.
 *
 * Constraints that shape this code:
 *  - `sessionId` must be a UUID. `channelID.js` derives one from the checkout
 *    `sessionID`; callers pass that, never the raw `sessionID`.
 *  - The endpoint is same-origin only (it rejects any `Sec-Fetch-Site` other
 *    than `same-origin`), so the URL is deliberately RELATIVE: it must be
 *    requested from a page on the same origin that serves `/smart`. That
 *    holds on the PayPal checkout host and for the smart-buttons frame.
 *
 * Security: this is not an authorization boundary. The request carries no
 * buyer credentials, so anyone who can derive the channel id (i.e. anyone who
 * knows the `sessionID` from the URL) can obtain a token for it. What protects
 * the relay is the unguessability of `sessionID`, the Firebase Security Rules
 * for the project (not yet reviewed by this team), and the payload allowlist.
 * `source_app` in the envelope is self-asserted.
 */
export function getFirebaseSessionToken(
  channelID: string,
): ZalgoPromise<string> {
  return request({
    url: `${RELAY_SESSION_TOKEN_PATH}?sessionId=${encodeURIComponent(
      channelID,
    )}`,
    method: "GET",
    headers: { accept: "application/json" },
  }).then(({ status, body }) => {
    const sessionToken = body && body.sessionToken;

    if (status !== 200 || !sessionToken) {
      throw new Error(
        `Could not get a Firebase session token (status ${String(status)})`,
      );
    }

    return sessionToken;
  });
}

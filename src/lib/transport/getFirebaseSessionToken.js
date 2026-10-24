/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { request } from "@krakenjs/belter/src";

import { RELAY_SESSION_TOKEN_PATH } from "./constants";

/**
 * Mint a Firebase custom auth token for a relay channel.
 *
 * Uses the web SDK server's relay endpoint:
 *
 *   GET /web-sdk/v<major.minor.patch>/relay/session-token?sessionId=<uuid>
 *   -> { sessionToken }
 *
 * The token must come from the project this build's relay config points at
 * (see firebaseConfig.js); a token for another project fails sign-in with
 * CREDENTIAL_MISMATCH.
 *
 * Constraints that shape this code:
 *  - `sessionId` must be a UUID. Callers pass the per-checkout
 *    `relayChannelID` the button frame generated, never the raw `sessionID`.
 *  - The endpoint is same-origin only (it rejects any `Sec-Fetch-Site` other
 *    than `same-origin`), so the URL is deliberately RELATIVE: it must be
 *    requested from a page on the same origin that serves `/web-sdk`.
 *
 * The request carries no buyer credentials. The relay is protected by the
 * unguessable per-checkout channel id, the database's security rules, and the
 * payload allowlist (see constants.js). `source_app` in the envelope is
 * informational only.
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

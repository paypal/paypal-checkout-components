/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import { uniqueID, stringifyError } from "@krakenjs/belter/src";
import { getVersion, getLogger } from "@paypal/sdk-client/src";

import { logTransportDebug } from "./debugLog";
import { loadFirebaseSDK } from "./loadFirebaseSDK";
import { getFirebaseSessionToken } from "./getFirebaseSessionToken";
import type { FirebaseConfig } from "./firebaseConfig";
import {
  APP,
  FIREBASE_MESSAGES_PATH,
  MESSAGE_TYPE,
  RELAY_FIREBASE_APP_NAME,
  RESPONSE_STATUS,
  RPC_TIMEOUT_MS,
} from "./constants";

/**
 * The checkout popup's end of the Firebase wire.
 *
 * Speaks smart-payment-buttons' `messageSocket` envelope, but implements only
 * what this side needs rather than porting its ~440 lines. What it must
 * reproduce exactly:
 *
 *  1. Firebase `on("value")` fires with the ENTIRE `messages` node on every
 *     change, so every message is delivered again and again. Dedupe by
 *     `message_uid` is load-bearing, not an optimisation.
 *  2. There is no `target_app` filtering at the database level; every
 *     participant sees everything. A participant avoids reacting to its own
 *     traffic by remembering the `message_uid` of what it wrote.
 *  3. `request_uid` has a legacy alias `request_id`; read both.
 *
 * Send-only request/response: each relayed callback is a request whose
 * `message_name` is the callback name and whose `message_data` is the filtered
 * first argument. The parent answers with a response; nothing is ever sent
 * from the parent to the popup unprompted, so inbound requests are ignored.
 *
 * Nothing here decides when to be used. See `openerWatch.js`.
 */

type Pending = {|
  name: string,
  resolve: (mixed) => void,
  reject: (Error) => void,
|};

export type FirebaseChannel = {|
  // False once the channel was closed or its connection failed. A failed
  // connection never recovers on its own, so callers should replace the
  // channel rather than keep using it.
  isUsable: () => boolean,
  // $FlowIgnore[value-as-type]
  request: (name: string, data: Object) => ZalgoPromise<mixed>,
  close: () => void,
|};

type ChannelOptions = {|
  sessionUID: string,
  config: FirebaseConfig,
|};

export function createFirebaseChannel({
  sessionUID,
  config,
}: ChannelOptions): FirebaseChannel {
  const seen: { [string]: boolean } = {};
  const pending: { [string]: Pending } = {};

  let closed = false;
  let connectionFailed = false;

  const envelopeBase = () => ({
    session_uid: sessionUID,
    source_app: APP.CHECKOUT,
    source_app_version: getVersion(),
    target_app: APP.SMART_PAYMENT_BUTTONS,
  });

  const handleIncoming = (raw: mixed) => {
    if (typeof raw !== "string" || !raw) {
      return;
    }

    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      return;
    }

    if (!parsed || parsed.session_uid !== sessionUID) {
      return;
    }

    const messageUID = parsed.message_uid;

    if (!messageUID || seen[messageUID]) {
      return;
    }
    seen[messageUID] = true;

    const requestUID = parsed.request_uid || parsed.request_id;

    if (!requestUID) {
      return;
    }

    if (parsed.message_type === MESSAGE_TYPE.RESPONSE) {
      const waiting = pending[requestUID];

      if (!waiting) {
        return;
      }

      delete pending[requestUID];
      logTransportDebug("response_received", {
        name: waiting.name,
        requestUID,
        status: parsed.message_status,
      });

      if (parsed.message_status === RESPONSE_STATUS.SUCCESS) {
        waiting.resolve(parsed.message_data);
      } else {
        waiting.reject(
          new Error(
            (parsed.message_data && parsed.message_data.message) ||
              `Firebase call failed (${String(parsed.message_status)})`,
          ),
        );
      }
    }
  };

  const connection = ZalgoPromise.hash({
    firebase: loadFirebaseSDK(config),
    sessionToken: getFirebaseSessionToken(sessionUID),
  })
    .then(({ firebase, sessionToken }) => {
      const app = firebase.app(RELAY_FIREBASE_APP_NAME);

      return app
        .auth()
        .signInWithCustomToken(sessionToken)
        .then(() => {
          const database = app.database();

          // Long-polling can stall behind a suspended tab in exactly the
          // conditions this transport exists to survive.
          firebase.database.INTERNAL.forceWebSockets();

          database.ref(FIREBASE_MESSAGES_PATH(sessionUID)).on(
            "value",
            (snapshot) => {
              const messages = (snapshot && snapshot.val()) || {};

              for (const key of Object.keys(messages)) {
                handleIncoming(messages[key]);
              }
            },
            (err) => {
              // The subscription is dead (typically PERMISSION_DENIED once
              // the custom token expires). Nothing will arrive again, so
              // fail whatever is waiting instead of letting it time out.
              getLogger()
                .warn("checkout_transport_firebase_subscription_failed", {
                  err: stringifyError(err),
                  pending: Object.keys(pending).length,
                })
                .flush();

              for (const requestUID of Object.keys(pending)) {
                pending[requestUID].reject(
                  err || new Error(`Firebase subscription failed`),
                );
                delete pending[requestUID];
              }
            },
          );

          database.goOnline();

          return database;
        });
    })
    .then((database) => {
      getLogger().info("checkout_transport_firebase_connected").flush();
      return database;
    });

  connection.catch((err) => {
    connectionFailed = true;

    getLogger()
      .warn("checkout_transport_firebase_connect_failed", {
        err: stringifyError(err),
      })
      .flush();
  });

  const request = (name: string, data: Object): ZalgoPromise<mixed> => {
    return connection.then((database) => {
      if (closed) {
        throw new Error(`Firebase channel closed`);
      }

      const requestUID = uniqueID();
      const messageUID = uniqueID();

      // Record before writing: the value listener echoes our own write
      // straight back to us.
      seen[messageUID] = true;

      return new ZalgoPromise((resolve, reject) => {
        const timer = setTimeout(() => {
          delete pending[requestUID];
          getLogger()
            .warn("checkout_transport_firebase_request_timeout", {
              name,
              requestUID,
            })
            .flush();
          reject(
            new Error(
              `Firebase call timed out after ${RPC_TIMEOUT_MS}ms (${name})`,
            ),
          );
        }, RPC_TIMEOUT_MS);

        pending[requestUID] = {
          name,
          resolve: (value) => {
            clearTimeout(timer);
            resolve(value);
          },
          reject: (err) => {
            clearTimeout(timer);
            reject(err);
          },
        };

        try {
          database
            .ref(`${FIREBASE_MESSAGES_PATH(sessionUID)}/${uniqueID()}`)
            .set(
              JSON.stringify({
                ...envelopeBase(),
                message_name: name,
                message_uid: messageUID,
                request_uid: requestUID,
                message_type: MESSAGE_TYPE.REQUEST,
                message_data: data,
              }),
            );
          logTransportDebug("request_sent", { name, requestUID, messageUID });
        } catch (err) {
          clearTimeout(timer);
          delete pending[requestUID];
          reject(err);
        }
      });
    });
  };

  return {
    isUsable: () => !closed && !connectionFailed,

    request,

    close: () => {
      closed = true;

      for (const requestUID of Object.keys(pending)) {
        pending[requestUID].reject(new Error(`Firebase channel closed`));
        delete pending[requestUID];
      }

      connection
        .then((database) => {
          database.ref(FIREBASE_MESSAGES_PATH(sessionUID)).off();
          database.goOffline();
        })
        .catch(() => {
          // Never connected; nothing to tear down.
        });
    },
  };
}

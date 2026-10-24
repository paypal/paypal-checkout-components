/* @flow */

import { ZalgoPromise } from "@krakenjs/zalgo-promise/src";
import {
  memoize,
  createElement,
  appendChild,
  getBody,
  type Memoized,
} from "@krakenjs/belter/src";

import { FIREBASE_SCRIPTS, RELAY_FIREBASE_APP_NAME } from "./constants";
import type { FirebaseConfig } from "./firebaseConfig";

/**
 * Minimal surface of the Firebase compat SDK that this transport touches.
 * Deliberately narrow — anything wider would imply we own more of Firebase's
 * behaviour than we do.
 */
type FirebaseDatabase = {|
  ref: (string) => {|
    // eslint-disable-next-line no-undef
    set: <T>(T) => mixed,
    // eslint-disable-next-line no-undef
    on: <T>("value", (T) => void, (Error) => void) => void,
    off: () => void,
  |},
  goOnline: () => void,
  goOffline: () => void,
|};

export type FirebaseSDK = {|
  initializeApp: (FirebaseConfig, name: string) => void,
  app: (name: string) => {|
    auth: () => {|
      signInWithCustomToken: (string) => ZalgoPromise<mixed>,
    |},
    database: () => FirebaseDatabase,
  |},
  database: {|
    INTERNAL: {|
      forceWebSockets: () => void,
    |},
  |},
|};

function loadScript(url: string): ZalgoPromise<void> {
  return new ZalgoPromise((resolve, reject) => {
    const script = createElement("script", {
      attributes: { src: url, async: "true" },
    });

    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () =>
      reject(new Error(`Failed to load script: ${url}`)),
    );

    appendChild(getBody(), script);
  });
}

/**
 * Loaded from the CDN rather than bundled.
 *
 * The Firebase compat SDK is ~200KB; adding it to the SDK bundle would tax
 * every merchant page for a path that almost no session takes. Fetching it
 * only once a transport failure has already happened keeps the healthy case
 * exactly as it is today. These are the same three files smart-payment-buttons
 * loads.
 *
 * Memoized: concurrent failures (say onApprove and onShippingChange racing)
 * must share one load and one `initializeApp` call. The app is named so it
 * cannot collide with a default app the page initialized itself.
 */
// $FlowIgnore[value-as-type]
export const loadFirebaseSDK: Memoized<
  (FirebaseConfig) => ZalgoPromise<FirebaseSDK>,
> = memoize((config: FirebaseConfig) => {
  return ZalgoPromise.try(() => {
    if (window.firebase && window.firebase.auth && window.firebase.database) {
      // Another PayPal surface on this page already loaded it.
      return;
    }

    // app must be present before auth/database register themselves on it.
    return loadScript(FIREBASE_SCRIPTS.APP).then(() => {
      return ZalgoPromise.all([
        loadScript(FIREBASE_SCRIPTS.AUTH),
        loadScript(FIREBASE_SCRIPTS.DATABASE),
      ]);
    });
  }).then(() => {
    const firebase = window.firebase;

    if (!firebase) {
      throw new Error(`Firebase failed to load`);
    }

    firebase.initializeApp(config, RELAY_FIREBASE_APP_NAME);

    return firebase;
  });
});

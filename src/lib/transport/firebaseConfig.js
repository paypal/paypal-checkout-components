/* @flow */

export type FirebaseConfig = {|
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
|};

export type FirebaseScripts = {|
  APP: string,
  AUTH: string,
  DATABASE: string,
|};

// `__FIREBASE__` is provided at build time.
// It is undefined in any build that does not provide it, so it is read behind
// a typeof check and the relay simply stays off.
function getFirebaseGlobal(): ?{|
  __CONFIG__: FirebaseConfig,
  __SCRIPTS__: FirebaseScripts,
|} {
  return typeof __FIREBASE__ === "undefined" ? null : __FIREBASE__;
}

/**
 * The relay's Firebase config for the current env, provided at build time.
 * It must be the project the relay session token is issued for in this env,
 * and the one the button frame uses, or sign-in fails with
 * CREDENTIAL_MISMATCH. The values are client-safe by design: a Firebase web
 * apiKey identifies the project and grants no access. See
 * https://firebase.google.com/docs/projects/api-keys
 */
export function getFirebaseConfig(): ?FirebaseConfig {
  const global = getFirebaseGlobal();
  const config = global && global.__CONFIG__;

  return config && config.apiKey && config.databaseURL ? config : null;
}

/** URLs of the Firebase SDK files, provided at build time. */
export function getFirebaseScripts(): ?FirebaseScripts {
  const global = getFirebaseGlobal();
  const scripts = global && global.__SCRIPTS__;

  return scripts && scripts.APP && scripts.AUTH && scripts.DATABASE
    ? scripts
    : null;
}

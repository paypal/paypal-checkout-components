/* @flow */

import { getEnv } from "@paypal/sdk-client/src";
import { ENV } from "@paypal/sdk-constants/src";

export type FirebaseConfig = {|
  apiKey: string,
  authDomain: string,
  databaseURL: string,
  projectId: string,
  storageBucket: string,
  messagingSenderId: string,
  appId: string,
  measurementId?: string,
|};

/**
 * The v6 SDK's PayPal Firebase project for the current env, baked in at build
 * time from `globals.js`. It must be the project that the websdknodeweb relay
 * token endpoint signs for in this env (local / stage / test -> dev52; sandbox ->
 * dcg18; production -> dcg04) and the same one
 * smartcomponentnodeweb uses, or sign-in fails with CREDENTIAL_MISMATCH. The
 * apiKey is a public client identifier; see globals.js.
 */
export function getFirebaseConfig(): ?FirebaseConfig {
  const env = getEnv();
  // local / stage / test use the dev52 project (the one websdknodeweb signs
  // for when /web-sdk resolves to msmaster).
  let project = __FIREBASE__.__STAGE__;

  if (env === ENV.PRODUCTION) {
    project = __FIREBASE__.__PRODUCTION__;
  } else if (env === ENV.SANDBOX) {
    project = __FIREBASE__.__SANDBOX__;
  }

  return project && project.apiKey && project.databaseURL ? project : null;
}

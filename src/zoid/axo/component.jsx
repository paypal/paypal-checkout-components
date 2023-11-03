/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { loadConnectScript } from "@paypal/connect-loader-component";
import { getClientID, getClientMetadataID } from "@paypal/sdk-client/src";
// eslint-disable-next-line flowtype/no-weak-types
export type AXOComponent = any;

export function getAxoComponent(): AXOComponent {
  const cmid = getClientMetadataID();
  const clientID = getClientID();
  // this will change to whatever options we received
  // from the merchant
  try {
    return loadConnectScript({ cmid, clientID });
  } catch (error) {
    return new Error(error);
  }
}

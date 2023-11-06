/* @flow */
import { loadConnectScript } from "@paypal/connect-loader-component";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
} from "@paypal/sdk-client/src";

import type { LazyExport } from "../types";

// eslint-disable-next-line flowtype/no-weak-types
export type AXOComponent = any;

// TODO: What's the expected structure/approach for this interface. It's not a zoid
// scenario, so what do we return?
// -> Looks like it returns a function that accepts the props
// How do we define the input of merchant params here?
export const connect: LazyExport<AXOComponent> = {
  __get__: () => {
    return async (merchantProps) => {
      const cmid = getClientMetadataID();
      const clientID = getClientID();
      const userIdToken = getUserIDToken();
      // TODO: Sort out integration specifics for inputs
      try {
        const loadResult = await loadConnectScript();
        return window.braintree.connect.create({
          ...loadResult.metadata,
          ...merchantProps,
          cmid,
          clientID,
          userIdToken,
        });
      } catch (error) {
        return new Error(error);
      }
    };
  },
};

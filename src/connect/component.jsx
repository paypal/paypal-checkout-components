/* @flow */
import { loadAxo } from "@paypal/connect-loader-component";
import {
  getClientID,
  getClientMetadataID,
  getUserIDToken,
  getSessionID,
} from "@paypal/sdk-client/src";

// TODO: What's the expected structure/approach for this interface. It's not a zoid
// scenario, so what do we return?
// -> Looks like it returns a function that accepts the props
// How do we define the input of merchant params here?
export const getConnectComponent = async (merchantProps) => {
  const cmid = getClientMetadataID() ?? getSessionID();
  const clientID = getClientID();
  const userIdToken = getUserIDToken();
  // TODO: Sort out integration specifics for inputs
  try {
    const loadResult = await loadAxo({
      client: { getVersion: () => "3.97.3-connect-alpha.6.1" },
      minified: false,
    });

    return await window.braintree.connect.create({
      ...loadResult.metadata,
      ...merchantProps,
      authorization: userIdToken,
      deviceData: JSON.stringify({
        correlation_id: cmid,
      }),
      clientID,
    });
  } catch (error) {
    return new Error(error);
  }
};

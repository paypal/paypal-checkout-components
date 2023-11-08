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
      client: { getVersion: () => "3.97.3-connect-alpha.6.1" }, // this is currently supported for BT
      sdkVersion: "", // PPCP proposal: string instead of function
      minified: false,
    });
    // FPTI: sdkversion, fraudnet info
    return await window.braintree.connect.create({
      ...loadResult.metadata, // returns a localeURL for assets
      ...merchantProps, // AXO specific props
      ppcp: {
        userIdToken, // <merchant-specified-via-data-user-id-token>
        clientID, // <merchant-specified-to-SDK-on-query-param>
        clientMetadataID: cmid, // <merchant-specified-via-data-client-metadata-id>
        fraudnet: () => {
          return "";
        }, // Pattern TBD
      },
    });
  } catch (error) {
    // FPTI Log here
    return new Error(error);
  }
};

/* @flow */
import { getLogger, getSDKToken } from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

import { ValidationError } from "../lib";

export const getThreeDomainSecure = (): Function => {
  console.log("getThreeDomainSecure");
  const sdkToken = getSDKToken();
  const ThreeDomainSecureAuth = () => {
    if (sdkToken) {
      // eslint-disable-next-line no-console
      console.log("Three Domain Secure Called");
      // Make a Zoid component and introduce methods here
      // onSuccess
      // onCancel
      // onClose
      getLogger()
        .info("three domain secure v2 invoked")
        .track({
          [FPTI_KEY.TRANSITION]: "three_DS_auth_v2",
        });
    } else {
      throw new ValidationError(
        `script data attribute sdk-client-token is required but was not passed`
      );
    }
  };

  return ThreeDomainSecureAuth;
};

/* @flow */
import { getLogger } from "@paypal/sdk-client/src";
import { FPTI_KEY } from "@paypal/sdk-constants/src";

export const getThreeDomainSecure = (): Function => {
  const ThreeDomainSecureAuth = () => {
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
  };
  return ThreeDomainSecureAuth;
};

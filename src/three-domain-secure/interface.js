/* @flow */
import {
  getEnv,
  getLogger,
  getPayPalAPIDomain,
  getSDKToken,
  getUserIDToken,
  getClientID,
} from "@paypal/sdk-client/src";
import { destroy as zoidDestroy } from "@krakenjs/zoid/src";

import type { LazyExport } from "../types";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";
import { GraphQLClient, RestClient } from "./api";
import { getThreeDS } from "./utils";

const BRAINTREE_PROD = "https://payments.braintree-api.com";
const BRAINTREE_SANDBOX = "https://payments.sandbox.braintree-api.com";

export function setup() {
  getThreeDS();
}
export function destroy(err?: mixed) {
  zoidDestroy(err);
}

export const ThreeDomainSecureClient: LazyExport<ThreeDomainSecureComponentInterface> =
  {
    __get__: () => {
      const threeDomainSecureInstance = new ThreeDomainSecureComponent({
        logger: getLogger(),
        restClient: new RestClient({ accessToken: getSDKToken() }),
        graphQLClient: new GraphQLClient({
          baseURL:
            getEnv() === "production" ? BRAINTREE_PROD : BRAINTREE_SANDBOX,
          accessToken: getSDKToken(),
        }),
        // $FlowIssue ZalgoPromise vs Promise
        sdkConfig: {
          authenticationToken: getSDKToken() || getUserIDToken(),
          paypalApiDomain: getPayPalAPIDomain(),
          clientID: getClientID(),
        },
      });
      return {
        isEligible: (payload) => threeDomainSecureInstance.isEligible(payload),
        show: () => threeDomainSecureInstance.show(),
      };
    },
  };

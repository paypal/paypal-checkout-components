/* @flow */
import {
  getEnv,
  getLogger,
  getPayPalAPIDomain,
  getSDKToken,
  getClientID,
} from "@paypal/sdk-client/src";

import type { LazyExport } from "../types";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";
import { GraphQLClient, RestClient } from "./api";

const BRAINTREE_PROD = "https://payments.braintree-api.com";
const BRAINTREE_SANDBOX = "https://payments.sandbox.braintree-api.com";

export const ThreeDomainSecureClient: LazyExport<ThreeDomainSecureComponentInterface> =
  {
    __get__: () => {
      const threeDomainSecureInstance = new ThreeDomainSecureComponent({
        logger: getLogger(),
        restClient: new RestClient(),
        graphQLClient: new GraphQLClient({
          baseURL:
            getEnv() === "production" ? BRAINTREE_PROD : BRAINTREE_SANDBOX,
          accessToken: getSDKToken(),
        }),
        // $FlowIssue ZalgoPromise vs Promise
        sdkConfig: {
          authenticationToken: getSDKToken(),
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

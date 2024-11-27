/* @flow */
import {
  getLogger,
  getPayPalAPIDomain,
  getUserIDToken,
} from "@paypal/sdk-client/src";

import { callRestAPI, devEnvOnlyExport } from "../lib";
import type { LazyExport } from "../types";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";

export const ThreeDomainSecureClient: LazyExport<ThreeDomainSecureComponentInterface> =
  {
    __get__: () => {
      const threeDomainSecureInstance = new ThreeDomainSecureComponent({
        logger: getLogger(),
        // $FlowIssue ZalgoPromise vs Promise
        request: callRestAPI,
        sdkConfig: {
          authenticationToken: getUserIDToken(),
          paypalApiDomain: getPayPalAPIDomain(),
        },
      });
      return devEnvOnlyExport({
        isEligible: (payload) => threeDomainSecureInstance.isEligible(payload),
        show: () => threeDomainSecureInstance.show(),
      });
    },
  };

/* @flow */
import {
  getLogger,
  getSDKToken,
  getPayPalAPIDomain,
} from "@paypal/sdk-client/src";

import { callRestAPI, protectedExport } from "../lib";
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
        request: callRestAPI,
        sdkConfig: {
          sdkToken: getSDKToken(),
          paypalApiDomain: getPayPalAPIDomain(),
        },
      });
      return protectedExport({
        isEligible: (payload) => threeDomainSecureInstance.isEligible(payload),
        show: () => threeDomainSecureInstance.show(),
      });
    },
  };

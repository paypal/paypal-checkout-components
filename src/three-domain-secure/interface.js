/* @flow */
import { getLogger, getSDKToken } from "@paypal/sdk-client/src";

import type { LazyExport } from "../types";
import { protectedExport } from "../lib";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";

export const ThreeDomainSecureClient: LazyExport<ThreeDomainSecureComponentInterface> =
  {
    __get__: () => {
      const threeDomainSecureInstance = new ThreeDomainSecureComponent({
        logger: getLogger(),
        sdkConfig: {
          sdkToken: getSDKToken(),
        },
      });
      return protectedExport({
        isEligible: () => threeDomainSecureInstance.isEligible(),
        show: () => threeDomainSecureInstance.show(),
      });
    },
  };

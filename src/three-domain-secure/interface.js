/* @flow */
import { getLogger, getSDKToken } from "@paypal/sdk-client/src";
import { type ZoidComponent } from "@krakenjs/zoid/src";

import type { LazyExport } from "../types";
import { protectedExport } from "../lib";

import {
  ThreeDomainSecureComponent,
  type ThreeDomainSecureComponentInterface,
} from "./component";

export const ThreeDomainSecureClient: LazyExport<ThreeDomainSecureComponentInterface> =
  {
    __get__: () =>
      protectedExport(
        new ThreeDomainSecureComponent({
          logger: getLogger(),
          sdkConfig: {
            sdkToken: getSDKToken(),
          },
        })
      ),
  };

/* @flow */
import { type ZoidComponent } from "@krakenjs/zoid/src";

import type { LazyExport } from "../types";
import { protectedExport } from "../lib";

import { getThreeDomainSecure } from "./component";

type ThreeDomainSecureAuth = ZoidComponent<void>;

export const ThreeDomainSecureComponent: LazyExport<ThreeDomainSecureAuth> = {
  __get__: () => protectedExport(getThreeDomainSecure()),
};

/* @flow */
import type { LazyExport } from "../types";
import { getThreeDomainSecure } from "./component";
import { protectedExport } from "../lib";

export const ThreeDomainSecureComponent: LazyExport<> = {
  __get__: () => protectedExport(getThreeDomainSecure()),
};

/* @flow */
import type { LazyExport } from "../types";
import { getThreeDomainSecure } from "./component";
import { protectedExport } from "../lib";

export const ThreeDomainSecureComp: LazyExport<> = {
  __get__: () => protectedExport(getThreeDomainSecure()),
};

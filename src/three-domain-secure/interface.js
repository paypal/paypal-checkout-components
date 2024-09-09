/* @flow */
import type { LazyExport } from "../types";
import { getThreeDomainSecure } from "./component";

export const ThreeDomainSecureComp: LazyExport<> = {
  __get__: () => getThreeDomainSecure(),
};

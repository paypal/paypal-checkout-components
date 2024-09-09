/* @flow */
import type { LazyExport } from "../types";
import { getThreeDomainSecure } from "./component";

export const ThreeDomainSecure: LazyExport<> = {
  __get__: () => getThreeDomainSecure(),
};

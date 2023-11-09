/* @flow */
/* eslint import/no-deprecated: 0 */

import type { LazyExport } from "../types";

import { getConnectComponent, type ConnectComponent } from "./component";

export const Connect: LazyExport<ConnectComponent> = async (merchantProps) => {
  return getConnectComponent(merchantProps);
};

/* @flow */

import type { LazyProtectedExport } from "../../types";
import { protectedExport } from "../../lib";

import {
  getShopperInsightsComponent,
  type ShopperInsightsComponent,
} from "./component";

export const ShopperInsights: LazyProtectedExport<ShopperInsightsComponent> = {
  __get__: () => protectedExport(getShopperInsightsComponent()),
};

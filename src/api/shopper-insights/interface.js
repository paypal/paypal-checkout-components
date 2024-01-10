/* @flow */

import type { LazyExport } from "../../types";

import {
  getShopperInsightsComponent,
  type ShopperInsightsComponent,
} from "./component";

export const ShopperInsights: LazyExport<ShopperInsightsComponent> = {
  __get__: () => getShopperInsightsComponent(),
};

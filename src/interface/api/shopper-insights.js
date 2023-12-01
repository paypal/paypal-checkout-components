/* @flow */

import type { LazyProtectedExport } from "../../types";
import { protectedMerchantExport } from "../../lib/security";
import {
  getShopperInsightsComponent,
  type ShopperInsightsComponent,
} from "../../api/shopper-insights/component";

export const ShopperInsights: LazyProtectedExport<ShopperInsightsComponent> = {
  __get__: () => protectedMerchantExport(getShopperInsightsComponent()),
};

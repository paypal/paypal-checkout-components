/* @flow */

import type { LazyExport } from "checkout-components/src/types";
import {
  getWalletComponent,
  type WalletComponent,
} from "checkout-components/zoid/wallet";

export const Wallet: LazyExport<WalletComponent> = {
  __get__: () => getWalletComponent(),
};

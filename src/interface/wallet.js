/* @flow */

import type { LazyExport } from '../types';
import { getWalletComponent, type WalletComponent } from '../zoid/wallet';

export const Wallet : LazyExport<WalletComponent> = {
    __get__: () => getWalletComponent()
};

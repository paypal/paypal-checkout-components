/* @flow */

import { getWalletComponent } from '../zoid/wallet';

export const Wallet = {
    __get__: () => getWalletComponent()
};

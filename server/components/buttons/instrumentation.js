/* @flow */

import type { ExpressRequest } from '../../types';
import type { Wallet } from '../../../src/types';

import { ROOT_TRANSACTION_NAME } from './constants';

type SetRootTransactionOptions = {|
    wallet : ?Wallet
|};

function hasWalletInstrument(wallet : ?Wallet) : boolean {
    if (wallet) {
        for (const fundingSource of Object.keys(wallet || {})) {
            if (wallet[fundingSource] && wallet[fundingSource].instruments && wallet[fundingSource].instruments.length) {
                return true;
            }
        }
    }

    return false;
}

export function setRootTransaction(req : ExpressRequest, { wallet } : SetRootTransactionOptions) {
    const model = req.model = req.model || {};
    const rootTxn = model.rootTxn = model.rootTxn || {};

    rootTxn.name = hasWalletInstrument(wallet)
        ? ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET
        : ROOT_TRANSACTION_NAME.SMART_BUTTONS;
}

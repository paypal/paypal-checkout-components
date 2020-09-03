/* @flow */

import type { ExpressRequest } from '../../types';

import { ROOT_TRANSACTION_NAME } from './constants';

type SetRootTransactionOptions = {|
    userIDToken : ?string
|};

export function setRootTransaction(req : ExpressRequest, { userIDToken } : SetRootTransactionOptions) {
    const model = req.model = req.model || {};
    const rootTxn = model.rootTxn = model.rootTxn || {};

    rootTxn.name = userIDToken
        ? ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET
        : ROOT_TRANSACTION_NAME.SMART_BUTTONS;
}

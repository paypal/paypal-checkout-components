/* @flow */

import type { ExpressRequest } from '../../types';

import { ROOT_TRANSACTION_NAME } from './constants';

type SetRootTransactionOptions = {|
    userIDToken : ?string,
    clientAccessToken : ?string
|};

export function setRootTransaction(req : ExpressRequest, { userIDToken, clientAccessToken } : SetRootTransactionOptions) {
    const model = req.model = req.model || {};
    const rootTxn = model.rootTxn = model.rootTxn || {};

    if (userIDToken) {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET;
    } else if (clientAccessToken) {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS_VAULT;
    } else {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS;
    }
}

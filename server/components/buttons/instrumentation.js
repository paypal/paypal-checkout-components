/* @flow */

import type { ExpressRequest } from '../../types';

import { ROOT_TRANSACTION_NAME } from './constants';

type SetRootTransactionOptions = {|
    rootTxnData : $Shape<{|
        name : string,
        client_id : string,
        sdk_version : string,
        smart_buttons_version : string,
        buyer_country : string,
        env : string
    |}>
|};

/**
 * Get the transaction name base on the user token identifier,
 * the client token or a default value in the case
 * the previous one are not define in the request
 *
 * @param {string} userIDToken       the user token
 * @param {string} clientAccessToken the client token
 * @returns the name of the root transaction
 */
export const getRootTransactionName = (userIDToken : mixed,
    clientAccessToken : mixed) : string => {
    if (userIDToken) {
        return ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET;
    } else if (clientAccessToken) {
        return ROOT_TRANSACTION_NAME.SMART_BUTTONS_VAULT;
    }
    return ROOT_TRANSACTION_NAME.SMART_BUTTONS;
};

export function setRootTransaction(req : ExpressRequest,
    { rootTxnData } : SetRootTransactionOptions) {
    req.model = req.model || {};
    req.model.rootTxn = req.model.rootTxn || {
        data: {}
    };

    const rootTxn = req.model.rootTxn;
    const existingData = req.model.rootTxn.data;
    
    rootTxn.name = rootTxnData.name;
    req.model.rootTxn.data = {
        ...existingData,
        ...rootTxnData
    };
}

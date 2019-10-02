/* @flow */

import type { ExpressRequest } from '../types';

type ResolveMerchantIDOptions = {|
    merchantID : ?$ReadOnlyArray<string>,
    facilitatorAccessToken : string,
    getMerchantID : (ExpressRequest, string) => Promise<string>
|};

export async function resolveMerchantID(req : ExpressRequest, { merchantID, getMerchantID, facilitatorAccessToken } : ResolveMerchantIDOptions) : Promise<$ReadOnlyArray<string>> {
    if (merchantID) {
        return merchantID;
    }

    return [ await getMerchantID(req, facilitatorAccessToken) ];
}

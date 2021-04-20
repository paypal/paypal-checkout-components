/* @flow */

export type NormalizeNonceInputs = {|
    nonce? : string,
    csp? : {|
        nonce? : string
    |}
|};

export function normalizeCSPNonce({ nonce, csp = {} } : NormalizeNonceInputs) : string {
    // the nonce prop takes priority
    if (nonce) {
        return nonce;
    }

    // default to using the nonce from the sdk script
    return (csp && csp.nonce) || '';
}

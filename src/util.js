/* @flow */

export function getNonce() : string {
    let nonce = '';
    if (document.body) {
        nonce = document.body.getAttribute('data-nonce') || '';
    }
    return nonce;
}

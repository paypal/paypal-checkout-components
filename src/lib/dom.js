/* @flow */

import { DATA_ATTRIBUTES } from '../constants';

export function getNonce() : string {
    let nonce = '';
    if (document.body) {
        nonce = document.body.getAttribute(`${ DATA_ATTRIBUTES.NONCE }`) || '';
    }
    return nonce;
}

/* @flow */

import { DATA_ATTRIBUTES } from '../constants';

export function getNonce() : string {
    let nonce = '';
    if (document.body) {
        nonce = document.body.getAttribute(`${ DATA_ATTRIBUTES.NONCE }`) || '';
    }
    return nonce;
}

// this is admittedly a bit silly, but it makes testing
// things where the activeElement matters much easier,
// since we can just mock this function instead of
// overriding properties on the document and polluting
// other tests
export function getActiveElement () : null | HTMLElement {
    return document.activeElement;
}

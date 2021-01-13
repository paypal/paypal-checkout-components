/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';

import { NoncedStyleElement } from '../lib';

export function TrackingBeacon({ url, nonce } : {| url : string, nonce : string |}) : ChildType {
    return (
        <Fragment>
            <NoncedStyleElement
                nonce={ nonce }
                css={ `
                    .tracking-beacon {
                        visibility: hidden;
                        position: absolute;
                        height: 1px;
                        width: 1px;
                    }
                ` } />
            <img class='tracking-beacon' src={ url } />
        </Fragment>
    );
}

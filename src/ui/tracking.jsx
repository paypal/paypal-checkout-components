/* @flow */
/** @jsx node */

import { node, Fragment, type ChildType } from '@krakenjs/jsx-pragmatic/src';

export function TrackingBeacon({ url, nonce } : {| url : string, nonce : ?string |}) : ChildType {
    return (
        <Fragment>
            <style
                nonce={ nonce }
                innerHTML={ `
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

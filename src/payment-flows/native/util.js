/* @flow */

import type { ZalgoPromise } from 'zalgo-promise/src';
import type { CrossDomainWindowType } from 'cross-domain-utils/src';

type PostMessageListener<T> = ZalgoPromise<T> & {|
    cancel : () => void
|};

export function onPostMessage<D, R>(win : CrossDomainWindowType, domain : string, event : string, handler : (D) => R) : PostMessageListener<R> {
    return paypal.postRobot.once(event, { window: win, domain }, handler);
}
    

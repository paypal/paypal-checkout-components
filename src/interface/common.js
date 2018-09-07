/* @flow */

import { destroyAll as zoidDestroyAll } from 'zoid/src';

export { ZalgoPromise as Promise } from 'zalgo-promise/src';

export let destroyAll;

if (__TEST__) {
    destroyAll = zoidDestroyAll;
}

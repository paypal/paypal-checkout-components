/* @flow */
import { ZalgoPromise } from 'zalgo-promise/src';

window.xprops.payment().then(() => {
    return ZalgoPromise.try(() => {
        if (window.xprops.onInit) {
            window.xprops.onInit();
        }
    });
});

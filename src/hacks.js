/* @flow */

import { warn } from 'beaver-logger/client';
import { getParent, getTop } from 'cross-domain-utils/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import { patchMethod } from './lib';
import { Button } from './button';
import { Checkout } from './checkout';

let parent = getParent(window);
let top = getTop(window);

if (top && parent) {
    let canRenderTop = (top === parent);

    if (!canRenderTop) {
        Checkout.canRenderTo(top).then(result => {
            canRenderTop = result;
        });

        patchMethod(Checkout, 'renderTo', ({ args: [ win, props, el ], original, context }) => {

            if (!canRenderTop) {
                win = getParent(window);
            }

            return original.call(context, win, props, el);
        });
    }
}

let debounce = false;

patchMethod(Checkout, 'renderTo', ({ callOriginal, args: [ , props ] }) => {

    if (debounce) {
        warn('button_mutliple_click_debounce');
        return;
    }

    debounce = true;

    for (let methodName of [ 'onAuthorize', 'onCancel', 'onError', 'onClose' ]) {
        let original = props[methodName];
        props[methodName] = function unDebounce() : mixed {
            debounce = false;
            if (original) {
                return original.apply(this, arguments);
            }
        };
    }

    return callOriginal();
});

if (Button.xprops && Button.xprops.validate) {

    let enabled = true;

    // $FlowFixMe
    Button.xprops.validate({
        enable() {
            enabled = true;
        },

        disable() {
            enabled = false;
        }
    });

    patchMethod(Checkout, 'renderTo', ({ callOriginal }) => {
        if (enabled) {
            return callOriginal();
        }
        return new ZalgoPromise();
    });
}

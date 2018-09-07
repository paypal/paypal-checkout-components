/* @flow */

import { logger } from 'paypal-braintree-web-client/src';
import { getParent, getTop } from 'cross-domain-utils/src';
import { patchMethod } from 'belter/src';

import { Checkout } from '../checkout';

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
        logger.warn('button_multiple_click_debounce');
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

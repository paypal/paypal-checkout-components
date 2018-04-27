/* @flow */

import { debug } from 'beaver-logger/client';

import { config } from '../config';

import { memoize } from './util';

export let getCurrentScript = memoize(() : ?HTMLScriptElement => {

    let scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (let script of scripts) {
        if (script.src && (script.src.replace(/^https?:/, '').split('?')[0] === config.scriptUrl || script.hasAttribute('data-paypal-checkout'))) {
            return script;
        }

        if (script.src && (script.src.indexOf('paypal.checkout.v4.js') !== -1)) {
            return script;
        }
    }

    if (document.currentScript) { // eslint-disable-line compat/compat
        debug(`current_script_not_recognized`, { src: document.currentScript.src }); // eslint-disable-line compat/compat
    }
});

export function isPayPalObjects() : boolean {
    return Boolean(getCurrentScript());
}

export function getScriptVersion() : string {
    if (__PAYPAL_CHECKOUT__.__MAJOR__ && isPayPalObjects()) {
        return __MIN__ ? 'min' : __PAYPAL_CHECKOUT__.__MAJOR_VERSION__;
    } else {
        return __MIN__ ? `${ __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }.min` : __PAYPAL_CHECKOUT__.__MINOR_VERSION__;
    }
}

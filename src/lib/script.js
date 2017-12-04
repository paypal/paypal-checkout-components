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
    if (isPayPalObjects() && __MAJOR__) {
        return __MINIFIED__ ? 'min' : __MAJOR_VERSION__;
    } else {
        return __MINIFIED__ ? `${ __MINOR_VERSION__ }.min` : __MINOR_VERSION__;
    }
}

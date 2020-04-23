/* @flow */

import { debug } from 'beaver-logger/client';
import { getDomain } from 'cross-domain-utils/src';

import { config } from '../config';

import { memoize, domainMatches } from './util';

export const getCurrentScript = memoize(() : ?HTMLScriptElement => {

    const scripts = Array.prototype.slice.call(document.getElementsByTagName('script'));

    for (const script of scripts) {
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

export function getCurrentScriptUrl() : string {
    const script = getCurrentScript();

    if (script && typeof script.src === 'string') {
        let scriptUrl = script.src;

        if (scriptUrl.indexOf('http://www.paypalobjects.com') === 0) {
            scriptUrl = scriptUrl.replace('http://', 'https://');
        }

        if (scriptUrl.indexOf('//www.paypalobjects.com') === 0) {
            scriptUrl = `https:${ scriptUrl }`;
        }

        return scriptUrl;
    }

    return `https://www.paypalobjects.com/api/checkout.${ __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }${ __MIN__ ? '.min' : '' }.js`;
}

export function getDomainSetting<T : mixed>(name : string, def : ?T) : ?T {

    const hostname = window.xchild
        ? window.xchild.getParentDomain()
        : getDomain();

    if (config.domain_settings) {
        for (const domain of Object.keys(config.domain_settings)) {
            if (domainMatches(hostname, domain)) {
                return config.domain_settings[domain][name];
            }
        }
    }

    return def;
}

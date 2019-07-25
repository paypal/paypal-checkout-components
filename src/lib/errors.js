/* @flow */

import { warn } from 'beaver-logger/client';

import { isIE, isIEIntranet, isIECompHeader } from './device';

function logWarn(err) : void {
    if (window.console) {
        if (window.console.warn) {
            return window.console.warn(err);
        }

        if (window.console.log) {
            return window.console.log(err);
        }
    }
}

export function checkForCommonErrors() {

    if (JSON.stringify([]) !== '[]') {
        // $FlowFixMe
        if (Array.prototype.toJSON) {
            logWarn(`Custom Array.prototype.toJSON is causing incorrect json serialization of arrays. This is likely to cause issues. Probable cause is Prototype.js`);
        } else {
            logWarn(`JSON.stringify is doing incorrect serialization of arrays. This is likely to cause issues.`);
        }

        warn(`json_stringify_array_broken`);
    }

    if (JSON.stringify({}) !== '{}') {
        logWarn(`JSON.stringify is doing incorrect serialization of objects. This is likely to cause issues.`);

        warn(`json_stringify_object_broken`);
    }

    if (isIEIntranet()) {
        warn(`ie_intranet_mode`);
    }

    if (isIE() && !isIECompHeader()) {
        warn(`ie_meta_compatibility_header_missing`, {
            message: `Drop tag: <meta http-equiv="X-UA-Compatible" content="IE=edge">` });
    }

    // eslint-disable-next-line no-unused-vars
    function foo(bar, baz, zomg) {
        // pass;
    }

    if (foo.bind({ a: 1 }).length !== 3) {
        warn(`function_bind_arrity_overwritten`);
    }

    if (window.opener && window.parent !== window) {
        warn(`window_has_opener_and_parent`);
    }

    if (window.name && window.name.indexOf('__prerender') === 0) {
        warn(`prerender_running_checkoutjs`);
    }

    const context = {};

    function returnContext() : typeof context {
        return this;
    }

    if (returnContext.bind(context)() !== context) {
        warn(`function_bind_broken`);
    }

    if (window.Window && window.constructor && window.Window !== window.constructor) {
        warn(`window_constructor_does_not_match_window`);
    }

    // $FlowFixMe
    if (Object.assign && JSON.stringify({ a: 1, b: 2, c: 3 }) !== JSON.stringify({ a: 1, b: 2, c: 3 })) { // eslint-disable-line no-self-compare, compat/compat
        warn(`object_assign_broken`);
    }
}

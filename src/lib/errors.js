/* @flow */

import * as $logger from 'beaver-logger/client';

import { isIE, isIEIntranet, isIECompHeader } from './device';

function warn(err) : void {
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
        if (Array.prototype.toJSON) {
            warn(`Custom Array.prototype.toJSON is causing incorrect json serialization of arrays. This is likely to cause issues. Probable cause is Prototype.js`);
        } else {
            warn(`JSON.stringify is doing incorrect serialization of arrays. This is likely to cause issues.`);
        }

        $logger.warn(`json_stringify_array_broken`);
    }

    if (JSON.stringify({}) !== '{}') {
        warn(`JSON.stringify is doing incorrect serialization of objects. This is likely to cause issues.`);

        $logger.warn(`json_stringify_object_broken`);
    }

    if (isIEIntranet()) {
        $logger.warn(`ie_intranet_mode`);
    }

    if (isIE() && !isIECompHeader()) {
        $logger.warn(`ie_meta_compatibility_header_missing`, {
            message: `Drop tag: <meta http-equiv="X-UA-Compatible" content="IE=edge">` });
    }

    function foo(bar, baz, zomg) {
        // pass;
    }

    if (foo.bind({ a: 1 }).length !== 3) {
        $logger.warn(`function_bind_arrity_overwritten`);
    }

    if (window.opener && window.parent !== window) {
        $logger.warn(`window_has_opener_and_parent`);
    }
}

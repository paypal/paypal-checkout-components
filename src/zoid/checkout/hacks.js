/* @flow */

import { getSDKMeta } from '@paypal/sdk-client/src';
import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';

export function fixCreditRedirect() {

    try {
        if (!window.injector) {
            return;
        }

        const $util = window.injector.get('$util');

        if (!$util || !$util.redirect) {
            return;
        }

        const redirect = $util.redirect;

        $util.redirect = function overrideRedirect(url, ...args) : ZalgoPromise<void> {

            try {
                if (url.indexOf('/ppcreditapply') !== -1 && url.indexOf('key=') !== -1 && url.indexOf('sdkMeta') === -1) {
                    url += `&sdkMeta=${ getSDKMeta() }`;
                }
            } catch (err2) {
                // pass
            }

            return redirect.call(this, url, ...args);
        };


    } catch (err) {
        // pass
    }
}

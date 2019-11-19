/* @flow */

import { getSDKMeta } from '@paypal/sdk-client/src';
import { ZalgoPromise } from 'zalgo-promise/src';

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
                if (url.indexOf('/ppcreditapply') !== -1 && url.indexOf('key=') !== -1) {
                    url += `&sdkMeta=${ getSDKMeta() }`;
                }
                
            // eslint-disable-next-line unicorn/catch-error-name
            } catch (err2) {
                // pass
            }

            return redirect.call(this, url, ...args);
        };


    } catch (err) {
        // pass
    }
}

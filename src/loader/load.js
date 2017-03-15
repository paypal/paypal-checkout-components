/* @flow */

import { config } from './config';
import { responder } from './responder';
import { isLatest, getVersion, isXComponent } from './component';
import { loadScript, warn } from './util';

export let integrationResponder = responder();

function getIntegrationURLs() : { latest : boolean, major : string, minor : string } {

    return {
        latest: isLatest(),
        major:  config.checkoutjs_url.replace('{version}', ''),
        minor:  config.checkoutjs_url.replace('{version}', `.${getVersion()}`)
    };
}

function loadCheckoutIntegration(callback : (err : ?Error, result : ?mixed) => void) : void {

    if (!isXComponent()) {
        return callback(null, null);
    }

    let urls = getIntegrationURLs();

    loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, (err, result) => {

        if (err && !urls.latest) {
            return loadScript(urls.major, config.xchild_global, callback);
        }

        return callback(err, result);
    });
}

loadCheckoutIntegration((err : ?Error, result : ?mixed) : void => {

    if (err) {
        warn('Failed to load checkout.js', err.stack || err.toString());
    }

    if (err || result) {
        return integrationResponder.respond(err, result);
    }
});

/* @flow */

import { config } from './config';
import { responder } from './responder';
import { isLatest, getVersion, isCheckoutXComponent } from './component';
import { loadScript, warn, parseQuery, stringifyError } from './util';

const integrationResponder = responder();

export function onLoadCheckoutIntegration(callback : (err : ?Error, result : ?mixed) => void) : void {
    return integrationResponder.listen(callback);
}

function getIntegrationURLs() : { latest : boolean, major : string, minor : string } {

    return {
        latest: isLatest(),
        major:  config.checkoutjs_url.replace('{version}', ''),
        minor:  config.checkoutjs_url.replace('{version}', `.${ getVersion() }`)
    };
}

function getIntegrationProps() : Object {

    const props : Object = { ...config.script_props };

    const query = parseQuery();

    if (query.env) {
        props['data-env'] = query.env;
    }

    if (query.stage) {
        props['data-stage'] = query.stage;
    }

    return props;
}

function loadCheckoutIntegration(callback : (err : ?Error, result : ?mixed) => void) : void {

    if (!isCheckoutXComponent()) {
        return callback(null, null);
    }

    const urls = getIntegrationURLs();
    const props = getIntegrationProps();

    loadScript(urls.latest ? urls.major : urls.minor, config.xchild_global, props, (err, result) => {

        if (err && !urls.latest) {
            return loadScript(`${ urls.major }?t=${ Date.now() }`, config.xchild_global, props, callback);
        }

        return callback(err, result);
    });
}

loadCheckoutIntegration((err : ?Error, result : ?mixed) : void => {

    if (err) {
        warn('Failed to load checkout.js', stringifyError(err));
    }

    if (err || result) {
        return integrationResponder.respond(err, result);
    }
});

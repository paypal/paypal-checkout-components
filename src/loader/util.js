/* @flow */

export function loadScript(url : string, prop : string, attrs : Object, callback : (err : ?Error, res : ?mixed) => void) : void {

    if (window[prop]) {
        return callback(null, window[prop]);
    }

    let container = document.body || document.head;

    if (!container) {
        return callback(new Error(`Can not find container to insert script into`));
    }

    let script = document.createElement('script');

    script.src = url;

    script.onload = () => {
        if (!window[prop]) {
            return callback(new Error(`Expected ${prop} to be present on window`));
        }

        return callback(null, window[prop]);
    };

    script.onerror = (err : Error) => {
        return callback(err);
    };

    for (let attr of Object.keys(attrs)) {
        script.setAttribute(attr, attrs[attr]);
    }

    container.appendChild(script);
}

export function warn() {
    let message = Array.prototype.slice.call(arguments).join(' ');

    if (window.console && window.console.warn) {
        window.console.warn(message);
    } else if (window.console && window.console.log) {
        window.console.log(message);
    }
}

export function parseQuery(queryString : string = window.location.search) : Object {

    let params = {};

    if (queryString && queryString.indexOf('?') === 0) {
        queryString = queryString.slice(1);
    }

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error(`Can not parse query string params: ${queryString}`);
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
}

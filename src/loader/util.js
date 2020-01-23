/* @flow */

export function loadScript(url : string, prop : string, attrs : Object, callback : (err : ?Error, res : ?mixed) => void) : void {

    if (window[prop]) {
        return callback(null, window[prop]);
    }

    const container = document.body || document.head;

    if (!container) {
        return callback(new Error(`Can not find container to insert script into`));
    }

    const script = document.createElement('script');

    script.src = url;

    script.addEventListener('load', () => {
        if (!window[prop]) {
            return callback(new Error(`Expected ${ prop } to be present on window`));
        }

        return callback(null, window[prop]);
    });

    // $FlowFixMe
    script.addEventListener('error', (err : Error) => {
        return callback(err);
    });

    for (const attr of Object.keys(attrs)) {
        script.setAttribute(attr, attrs[attr]);
    }

    container.appendChild(script);
}

export function warn(...args : $ReadOnlyArray<string>) {
    const message = args.join(' ');

    if (window.console && window.console.warn) {
        window.console.warn(message);
    } else if (window.console && window.console.log) {
        window.console.log(message);
    }
}

export function parseQuery(queryString : string = window.location.search) : Object {

    const params = {};

    if (queryString && queryString.indexOf('?') === 0) {
        queryString = queryString.slice(1);
    }

    if (!queryString) {
        return params;
    }

    if (queryString.indexOf('=') === -1) {
        throw new Error(`Can not parse query string params: ${ queryString }`);
    }

    for (let pair of queryString.split('&')) {
        pair = pair.split('=');

        if (pair[0] && pair[1]) {
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }

    return params;
}

export function stringifyError(err : mixed, level : number = 1) : string {

    if (level >= 3) {
        return 'stringifyError stack overflow';
    }

    try {
        if (!err) {
            return `<unknown error: ${ Object.prototype.toString.call(err) }>`;
        }

        if (typeof err === 'string') {
            return err;
        }

        if (err instanceof Error) {
            const stack = err && err.stack;
            const message = err && err.message;

            if (stack && message) {
                if (stack.indexOf(message) !== -1) {
                    return stack;
                } else {
                    return `${ message }\n${ stack }`;
                }
            } else if (stack) {
                return stack;
            } else if (message) {
                return message;
            }
        }

        if (typeof err.toString === 'function') {
            return err.toString();
        }

        return Object.prototype.toString.call(err);

    } catch (newErr) {
        return `Error while stringifying error: ${ stringifyError(newErr, level + 1) }`;
    }
}

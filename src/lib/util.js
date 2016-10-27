
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';
import { config } from '../config';

export function loadScript(src, timeout) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script');

        script.onload = function () {
            resolve();
        };

        // For Internet explorer 8 support
        script.onreadystatechange = function () {
            if (this.readyState === 'complete' || this.readyState === 'loaded') {
                resolve();
            }
        };

        let scriptLoadError = new Error('script_loading_error');

        script.onerror = function (event) {
            return reject(scriptLoadError);
        };

        if (timeout) {
            setTimeout(() => {
                return reject(new Error('script_loading_timed_out'));
            }, timeout);
        }

        script.setAttribute('src', src);

        document.body.appendChild(script);
    });
}


export function extend(target) {

    for (let i = 1; i < arguments.length; i++) {
        let source = arguments[i];

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }
        }
    }

    return target;
}

export function merge() {
    return extend({}, ...arguments);
}


export function request(options) {

    return new Promise((resolve, reject) => {

        options.method = options.method || 'get';

        let headers = options.headers || {};

        if (options.json) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        } else if (options.body) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        headers.Accept = headers.Accept || 'application/json';

        let isCrossDomain = options.url.indexOf('http') === 0 && options.url.indexOf(`${window.location.protocol}//${window.location.host}`) !== 0;

        let xhr;

        if (window.XDomainRequest && window.navigator.userAgent.match(/MSIE (5|6|7|8|9)\./) && isCrossDomain) {

            xhr = new window.XDomainRequest();

            xhr.onload = function() {
                resolve(JSON.parse(this.responseText));
            };

            xhr.onerror = function(evt) {
                reject(new Error(`Request to ${options.method.toLowerCase()} ${options.url} failed: ${evt.toString()}`));
            };

            xhr.open(options.method, options.url, true);

            if (headers && Object.keys(headers).length) {
                return reject(new Error(`Headers in a cross-domain IE9- request? Not a chance.`));
            }

        } else {

            xhr = new window.XMLHttpRequest();

            xhr.addEventListener('load', function() {
                resolve(JSON.parse(this.responseText));
            }, false);

            xhr.addEventListener('error', (evt) => {
                reject(new Error(`Request to ${options.method.toLowerCase()} ${options.url} failed: ${evt.toString()}`));
            }, false);

            xhr.open(options.method, options.url, true);

            if (headers) {
                for (let key in headers) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }
        }

        if (options.json && !options.body) {
            options.body = JSON.stringify(options.json);
        }

        if (options.body && typeof options.body === 'object') {
            options.body = Object.keys(options.body).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(options.body[key])}`;
            }).join('&');
        }

        xhr.send(options.body);
    });
}

request.get = (url, options = {}) => {
    let method = 'get';
    return request({ method, url, ...options });
};

request.post = (url, body, options = {}) => {
    let method = 'post';
    return request({ method, url, body, ...options });
};

export function isPayPalDomain() {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(config.paypal_domain_regex));
}


export function memoize(method) {

    let results = {};

    return function() {

        let args;

        try {
            args = JSON.stringify(Array.prototype.slice.call(arguments));
        } catch (err) {
            throw new Error('Arguments not serializable -- can not be used to memoize');
        }

        if (!results.hasOwnProperty(args)) {
            results[args] = method.apply(this, arguments);
        }

        return results[args];
    };
}

export function noop() {
    // pass
}

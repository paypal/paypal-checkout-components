
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

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


export function request(config) {

    return new Promise((resolve, reject) => {

        config.method = config.method || 'get';

        let headers = config.headers || {};

        if (config.json) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        } else if (config.body) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        headers.Accept = headers.Accept || 'application/json';

        let xhr = new window.XMLHttpRequest();

        xhr.addEventListener('load', function() {
            resolve(JSON.parse(this.responseText));
        }, false);

        xhr.addEventListener('error', (evt) => {
            reject(new Error(`Request to ${config.method.toLowerCase()} ${config.url} failed: ${evt.toString()}`));
        }, false);

        xhr.open(config.method, config.url, true);

        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        if (config.json && !config.body) {
            config.body = JSON.stringify(config.json);
        }

        if (config.body && typeof config.body === 'object') {
            config.body = Object.keys(config.body).map(key => {
                return `${encodeURIComponent(key)}=${encodeURIComponent(config.body[key])}`;
            }).join('&');
        }

        xhr.send(config.body);
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
    return Boolean(window.location.hostname.match(/\.paypal\.com$/));
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

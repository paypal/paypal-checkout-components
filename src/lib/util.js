
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

        script.onerror = function (event) {
            return reject(new Error('script_loading_error'));
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


export function request(config, callback) {
    return new Promise((resolve, reject) => {

        config.method = config.method || 'get';

        let headers = config.headers || {};
        headers.Accept = headers.Accept || 'application/json';
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';

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

        xhr.send(config.body);
    });
}

export function isPayPalDomain() {
    return Boolean(window.location.hostname.match(/\.paypal\.com$/));
}

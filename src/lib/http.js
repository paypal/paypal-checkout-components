
import { SyncPromise as Promise } from 'sync-browser-mocks/src/promise';

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

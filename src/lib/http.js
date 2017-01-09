/* @flow */

import { SyncPromise } from 'sync-browser-mocks/src/promise';

type RequestOptionsType = {
    url : string,
    method? : string,
    headers? : { [key : string] : string },
    json? : Object,
    data? : { [key : string] : string },
    body? : string,
    win? : window
};

export function request({ url, method = 'get', headers = {}, json, data, body, win = window } : RequestOptionsType) : SyncPromise<Object> {

    return new SyncPromise((resolve, reject) => {

        if (json && data || json && body || data && json) {
            throw new Error(`Only options.json or options.data or options.body should be passed`);
        }

        if (json) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        } else if (data || body) {
            headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        headers.Accept = headers.Accept || 'application/json';

        let xhr = new win.XMLHttpRequest();

        xhr.addEventListener('load', function() {
            resolve(JSON.parse(this.responseText));
        }, false);

        xhr.addEventListener('error', (evt) => {
            reject(new Error(`Request to ${method.toLowerCase()} ${url} failed: ${evt.toString()}`));
        }, false);

        xhr.open(method, url, true);

        if (headers) {
            for (let key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        if (json) {
            body = JSON.stringify(json);
        } else if (data) {
            body = Object.keys(data).map(key => {
                return `${encodeURIComponent(key)}=${data ? encodeURIComponent(data[key]) : ''}`;
            }).join('&');
        }

        xhr.send(body);
    });
}

request.get = (url : string, options = {}) => {
    return request({ method: 'get', url, ...options });
};

request.post = (url : string, data, options = {}) => {
    return request({ method: 'post', url, data, ...options });
};

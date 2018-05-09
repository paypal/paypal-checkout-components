/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { addPayloadBuilder } from 'beaver-logger/client';
import { type SameDomainWindowType } from 'cross-domain-utils/src';

type RequestOptionsType = {
    url : string,
    method? : string,
    headers? : { [key : string] : string },
    json? : Object,
    data? : { [key : string] : string },
    body? : string,
    win? : SameDomainWindowType,
    timeout? : number
};

const HEADERS = {
    CONTENT_TYPE: 'content-type',
    ACCEPT:       'accept'
};

let headerBuilders = [];
let corrids = [];

addPayloadBuilder(() => {
    return {
        prev_corr_ids: corrids.join(',')
    };
});

function parseHeaders(rawHeaders : string = '') : { [string] : string } {
    let result = {};
    for (let line of rawHeaders.trim().split('\n')) {
        let [ key, ...values ] = line.split(':');
        result[key.toLowerCase()] = values.join(':').trim();
    }
    return result;
}

export function request({ url, method = 'get', headers = {}, json, data, body, win = window, timeout = 0 } : RequestOptionsType) : ZalgoPromise<Object> {
    return new ZalgoPromise((resolve, reject) => {

        if ((json && data) || (json && body) || (data && json)) {
            throw new Error(`Only options.json or options.data or options.body should be passed`);
        }

        let normalizedHeaders = {};

        for (let key of Object.keys(headers)) {
            normalizedHeaders[key.toLowerCase()] = headers[key];
        }

        if (json) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/json';
        } else if (data || body) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || 'application/json';

        for (let headerBuilder of headerBuilders) {
            let builtHeaders = headerBuilder();

            for (let key of Object.keys(builtHeaders)) {
                normalizedHeaders[key.toLowerCase()] = builtHeaders[key];
            }
        }

        let xhr = new win.XMLHttpRequest();

        xhr.addEventListener('load', function xhrLoad() : void {

            let responseHeaders = parseHeaders(this.getAllResponseHeaders());
            let corrID = responseHeaders['paypal-debug-id'] || 'unknown';

            if (responseHeaders['paypal-debug-id']) {
                corrids.push(responseHeaders['paypal-debug-id']);
            }

            if (!this.status) {
                return reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: no response status code. Correlation id: ${ corrID }`));
            }
            
            let contentType = responseHeaders['content-type'];
            let isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
            let res = this.responseText;

            try {
                res = JSON.parse(this.responseText);
            } catch (err) {
                if (isJSON) {
                    return reject(new Error(`Invalid json: ${ this.responseText }. Correlation id: ${ corrID }`));
                }
            }

            if (this.status >= 400) {
                let message = `Request to ${ method.toLowerCase() } ${ url } failed with ${ this.status } error. Correlation id: ${ corrID }`;

                if (res) {
                    if (typeof res === 'object' && res !== null) {
                        res = JSON.stringify(res, null, 4);
                    }

                    message = `${ message }\n\n${ res }\n`;
                }

                return reject(new Error(message));
            }

            return resolve(res);

        }, false);

        xhr.addEventListener('error', function xhrError(evt) {
            let corrID = this.getResponseHeader('paypal-debug-id');
            reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: ${ evt.toString() }. Correlation id: ${ corrID }`));
        }, false);

        xhr.open(method, url, true);

        for (let key in normalizedHeaders) {
            if (normalizedHeaders.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, normalizedHeaders[key]);
            }
        }

        if (json) {
            body = JSON.stringify(json);
        } else if (data) {
            body = Object.keys(data).map(key => {
                return `${ encodeURIComponent(key) }=${ data ? encodeURIComponent(data[key]) : '' }`;
            }).join('&');
        }

        xhr.timeout = timeout;
        xhr.ontimeout = function xhrTimeout() {
            reject(new Error(`Request to ${ method.toLowerCase() } ${ url } has timed out`));
        };

        xhr.send(body);
    });
}

request.get = (url : string, options = {}) => {
    return request({ method: 'get', url, ...options });
};

request.post = (url : string, data, options = {}) => {
    return request({ method: 'post', url, data, ...options });
};

request.addHeaderBuilder = (method) => {
    headerBuilders.push(method);
};

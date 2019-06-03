/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { addPayloadBuilder } from 'beaver-logger/client';
import { type SameDomainWindowType } from 'cross-domain-utils/src';

type RequestOptionsType = {|
    url : string,
    method? : string,
    headers? : { [key : string] : string },
    json? : Object,
    data? : { [key : string] : string },
    body? : string,
    win? : SameDomainWindowType,
    timeout? : number
|};

const HEADERS = {
    CONTENT_TYPE: 'content-type',
    ACCEPT:       'accept'
};

const headerBuilders = [];
const corrids = [];

addPayloadBuilder(() => {
    return {
        prev_corr_ids: corrids.join(',')
    };
});

function parseHeaders(rawHeaders : string = '') : { [string] : string } {
    const result = {};
    for (const line of rawHeaders.trim().split('\n')) {
        const [ key, ...values ] = line.split(':');
        result[key.toLowerCase()] = values.join(':').trim();
    }
    return result;
}

export function request({ url, method = 'get', headers = {}, json, data, body, win = window, timeout = 0 } : RequestOptionsType) : ZalgoPromise<Object> {

    if (url === '/demo/checkout/api/braintree/client-token/') {
        // $FlowFixMe
        return ZalgoPromise.resolve('eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJjMDFhZmRkM2Y1OTJmNWVhNTNlMzE5MWQwYmIyMWVjYjM5NzNlZGM1MzkwNDZiMjJmNTA2ODEyNzIzZmRlMTJifGNsaWVudF9pZD1jbGllbnRfaWQkc2FuZGJveCQ0ZHByYmZjNnBoNTk1Y2NqXHUwMDI2Y3JlYXRlZF9hdD0yMDE3LTA0LTI2VDIzOjI2OjU5Ljg3OTA3ODYwNiswMDAwXHUwMDI2bWVyY2hhbnRfaWQ9M3cydHR2d2QyNDY1NDhoZCIsImNvbmZpZ1VybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy8zdzJ0dHZ3ZDI0NjU0OGhkL2NsaWVudF9hcGkvdjEvY29uZmlndXJhdGlvbiIsImNoYWxsZW5nZXMiOltdLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJjbGllbnRBcGlVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvM3cydHR2d2QyNDY1NDhoZC9jbGllbnRfYXBpIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhdXRoVXJsIjoiaHR0cHM6Ly9hdXRoLnZlbm1vLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9jbGllbnQtYW5hbHl0aWNzLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb20vM3cydHR2d2QyNDY1NDhoZCJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjpmYWxzZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiYmFyY28uMDMtZmFjaWxpdGF0b3JAZ21haWwuY29tIiwiY2xpZW50SWQiOiJBV3VZdnFnMGtaN2Y5S0V4TVpqZU53T3RjQV8yZVhnOWpMZy1QSnBGX0pnYk44M0YyVml5aEdnV2JCNDg4RGU3MFpucGRBZEI2TUNqekNqSyIsInByaXZhY3lVcmwiOiJodHRwczovL2V4YW1wbGUuY29tIiwidXNlckFncmVlbWVudFVybCI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJVU0QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjpmYWxzZSwibWVyY2hhbnRJZCI6IjN3MnR0dndkMjQ2NTQ4aGQiLCJ2ZW5tbyI6Im9mZiJ9');
    }

    return new ZalgoPromise((resolve, reject) => {

        if ((json && data) || (json && body) || (data && json)) {
            throw new Error(`Only options.json or options.data or options.body should be passed`);
        }

        const normalizedHeaders = {};

        for (const key of Object.keys(headers)) {
            normalizedHeaders[key.toLowerCase()] = headers[key];
        }

        if (json) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/json';
        } else if (data || body) {
            normalizedHeaders[HEADERS.CONTENT_TYPE] = normalizedHeaders[HEADERS.CONTENT_TYPE] || 'application/x-www-form-urlencoded; charset=utf-8';
        }

        normalizedHeaders[HEADERS.ACCEPT] = normalizedHeaders[HEADERS.ACCEPT] || 'application/json';

        for (const headerBuilder of headerBuilders) {
            const builtHeaders = headerBuilder();

            for (const key of Object.keys(builtHeaders)) {
                normalizedHeaders[key.toLowerCase()] = builtHeaders[key];
            }
        }

        const xhr = new win.XMLHttpRequest();

        xhr.addEventListener('load', function xhrLoad() : void {

            const responseHeaders = parseHeaders(this.getAllResponseHeaders());
            const corrID = responseHeaders['paypal-debug-id'] || 'unknown';

            if (responseHeaders['paypal-debug-id']) {
                corrids.push(responseHeaders['paypal-debug-id']);
            }

            if (!this.status) {
                return reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: no response status code. Correlation id: ${ corrID }`));
            }
            
            const contentType = responseHeaders['content-type'];
            const isJSON = contentType && (contentType.indexOf('application/json') === 0 || contentType.indexOf('text/json') === 0);
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
            const corrID = this.getResponseHeader('paypal-debug-id');
            reject(new Error(`Request to ${ method.toLowerCase() } ${ url } failed: ${ evt.toString() }. Correlation id: ${ corrID }`));
        }, false);

        xhr.open(method, url, true);

        for (const key in normalizedHeaders) {
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

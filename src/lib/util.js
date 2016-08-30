
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


export function extend(target, source) {

    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        }
    }

    return target;
}

export function merge(one, two) {
    return extend(extend({}, one), two);
}

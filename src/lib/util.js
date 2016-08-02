
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
            setTimeout(function () {
                return reject(new Error('script_loading_timed_out'));
            }, timeout);
        }

        script.setAttribute('src', src);

        document.body.appendChild(script);
    });
}

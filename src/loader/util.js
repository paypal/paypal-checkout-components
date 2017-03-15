/* @flow */

export function loadScript(url : string, prop : string, callback : (err : ?Error, res : ?mixed) => void) : void {

    if (window[prop]) {
        return callback(null, window[prop]);
    }

    let container = document.body || document.head;

    if (!container) {
        return callback(new Error(`Can not find container to insert script into`));
    }

    let script = document.createElement('script');

    script.src = url;
    container.appendChild(script);

    script.onload = () => {
        if (!window[prop]) {
            return callback(new Error(`Expected ${prop} to be present on window`));
        }

        return callback(null, window[prop]);
    };

    script.onerror = (err : Error) => {
        return callback(err);
    };
}

export function warn() {
    let message = Array.prototype.slice.call(arguments).join(' ');

    if (window.console && window.console.warn) {
        window.console.warn(message);
    } else if (window.console && window.console.log) {
        window.console.log(message);
    }
}

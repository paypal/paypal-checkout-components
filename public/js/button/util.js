
export function memoize(method) {

    let called = false;
    let result;

    function memoizeWrapper() {

        if (called) {
            return result;
        }

        called = true;
        result = method.apply(this, arguments);

        return result;
    }

    memoizeWrapper.reset = () => {
        called = false;
    };

    return memoizeWrapper;
}

export function querySelectorAll(selector, doc = window.document) {
    return Array.prototype.slice.call(doc.querySelectorAll(selector));
}

export function noop() {
    // pass
}

export function urlWillRedirectPage(url) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.indexOf('#') === 0) {
        return false;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}


export function redirect(win = window, url) {
    return new window.paypal.Promise(resolve => {
        setTimeout(() => {
            win.location = url;
            if (!urlWillRedirectPage(url)) {
                resolve();
            }
        }, 1);
    });
}
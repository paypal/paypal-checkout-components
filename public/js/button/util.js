
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

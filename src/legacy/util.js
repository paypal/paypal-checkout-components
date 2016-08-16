
import { logInfo } from './log';


export function urlWillRedirectPage(url) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}

export function redirect(url) {
    logInfo(`redirect`, { url });
    window.location = url;
}

export function matchToken(token) {
    return token && token.match(/^(EC-)?[A-Z0-9]{17}$/);
}


/*  On Document Ready
    -----------------

    Call the callback when the document is ready, or immediately if the document has already loaded
*/

let documentLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

export function onDocumentReady(method) {

    if (documentLoaded) {
        return method();
    }

    return document.addEventListener('DOMContentLoaded', event => {
        documentLoaded = true;
        return method();
    });
}

/* @flow */

export function getUserAgent() : string {
    return window.navigator.mockUserAgent || window.navigator.userAgent;
}

export function isDevice() : boolean {
    let userAgent = getUserAgent();
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
        return true;
    }

    return false;
}

export function isWebView() : boolean {
    let userAgent = getUserAgent();
    return (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i).test(userAgent) ||
        (/\bwv\b/).test(userAgent) ||
    (/Android.*Version\/(\d)\.(\d)/i).test(userAgent);
}

export function getAgent(agent? : ?string) : Array<string> {
    let ua = getUserAgent();
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = (/\brv[ :]+(\d+)/g).exec(ua) || [];
        return ['IE', tem[1] || ''];
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem) {
            return ['Opera', tem[1]];
        }
    }
    M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+(\.\d{1,2}))/i))) {
        M.splice(1, 1, tem[1]);
    }
    return M;
}

export function isFirefoxIOS(ua? : string = getUserAgent()) : boolean {
    return (/FxiOS/i).test(ua);
}

export function isOperaMini(ua? : string = getUserAgent()) : boolean {
    return ua.indexOf('Opera Mini') > -1;
}

export function isAndroid(ua? : string = getUserAgent()) : boolean {
    return (/Android/).test(ua);
}

export function isIos(ua? : string = getUserAgent()) : boolean {
    return (/iPhone|iPod|iPad/).test(ua);
}

export function isGoogleSearchApp(ua? : string = getUserAgent()) : boolean {
    return (/\bGSA\b/).test(ua);
}

export function isIosWebview(ua? : string = getUserAgent()) : boolean {
    if (isIos(ua)) {
        if (isGoogleSearchApp(ua)) {
            return true;
        }
        return (/.+AppleWebKit(?!.*Safari)/).test(ua);
    }
    return false;
}

export function isAndroidWebview(ua? : string = getUserAgent()) : boolean {
    if (isAndroid(ua)) {
        return (/Version\/[\d\.]+/).test(ua) && !isOperaMini(ua);
    }
    return false;
}

export function isIE() : boolean {
    return Boolean(window.document.documentMode);
}

export function isIECompHeader() : boolean {
    let mHttp = window.document.querySelector('meta[http-equiv="X-UA-Compatible"]');
    let mContent = window.document.querySelector('meta[content="IE=edge"]');
    if (mHttp && mContent) {
        return true;
    }
    return false;
}

export function isIEIntranet() : boolean {

    if (!isIE()) {
        return false;
    }

    try {
        let status = window.status;

        window.status = 'testIntranetMode';

        if (window.status === 'testIntranetMode') {
            window.status = status;

            return true;
        }

        return false;

    } catch (err) {

        return false;
    }
}

export function supportsPopups(ua? : string = getUserAgent()) : boolean {
    return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isFirefoxIOS(ua));
}

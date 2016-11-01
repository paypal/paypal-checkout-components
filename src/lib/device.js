
export function getUserAgent() {
    return window.navigator.mockUserAgent || window.navigator.userAgent;
}

export function isDevice() {
    let userAgent = getUserAgent();
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
        return true;
    }

    return false;
}

export function isWebView() {
    let userAgent = getUserAgent();
    return (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i).test(userAgent) ||
        (/\bwv\b/).test(userAgent) ||
    (/Android.*Version\/(\d)\.(\d)/i).test(userAgent);
}

export function getAgent(agent) {
    let ua = getUserAgent();
    let tem;
    let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = (/\brv[ :]+(\d+)/g).exec(ua) || [];
        return ['IE', tem[1] || ''];
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem !== null) {
            return ['Opera', tem[1]];
        }
    }
    M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+(\.\d{1,2}))/i)) !== null) {
        M.splice(1, 1, tem[1]);
    }
    return M;
}

export function isOperaMini(ua) {
    ua = ua || global.navigator.userAgent;
    return ua.indexOf('Opera Mini') > -1;
}

export function isAndroid(ua) {
    ua = ua || global.navigator.userAgent;
    return (/Android/).test(ua);
}

export function getIEVersion(ua) {
    ua = ua || global.navigator.userAgent;

    if (ua.indexOf('MSIE') !== -1) {
        return parseInt(ua.replace(/.*MSIE ([0-9]+)\..*/, '$1'), 10);
    } else if (/Trident.*rv:11/.test(ua)) {
        return 11;
    }

    return null;
}

export function isIos(ua) {
    ua = ua || global.navigator.userAgent;
    return (/iPhone|iPod|iPad/).test(ua);
}

export function isGoogleSearchApp(ua) {
    return (/\bGSA\b/).test(ua);
}

export function isIosWebview(ua) {
    ua = ua || global.navigator.userAgent;
    if (isIos(ua)) {
        if (isGoogleSearchApp(ua)) {
            return true;
        }
        return (/.+AppleWebKit(?!.*Safari)/).test(ua);
    }
    return false;
}

export function isAndroidWebview(ua) {
    ua = ua || global.navigator.userAgent;
    if (isAndroid(ua)) {
        return (/Version\/[\d\.]+/).test(ua) && !isOperaMini(ua);
    }
    return false;
}

export function supportsPopups(ua) {
    ua = ua || global.navigator.userAgent;
    return !(isIosWebview(ua) || isAndroidWebview(ua) || isOperaMini(ua));
}

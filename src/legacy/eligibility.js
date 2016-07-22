
const SUPPORTED_AGENTS = {
    Chrome: 27,
    IE: 9,
    MSIE: 9,
    Firefox: 30,
    Safari: 5.1,
    Opera: 23
};

function isDevice() {
    let userAgent = window.navigator.userAgent;
    if (userAgent.match(/Android|webOS|iPhone|iPad|iPod|bada|Symbian|Palm|CriOS|BlackBerry|IEMobile|WindowsMobile|Opera Mini/i)) {
        return true;
    }

    return false;
}

function isWebView() {
    let userAgent = window.navigator.userAgent;
    return (/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i).test(userAgent) ||
        (/\bwv\b/).test(userAgent) ||
    (/Android.*Version\/(\d)\.(\d)/i).test(userAgent);
}

function getAgent(agent) {
    let ua = window.navigator.userAgent;
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

function isOldIE() {
    return window.navigator.userAgent.match(/MSIE [5678]\./i);
}

export function isEligible() {

    let currentAgent = getAgent();

    if (typeof currentAgent === 'object' && currentAgent.length === 2) {
        if (parseFloat(currentAgent[1]) < SUPPORTED_AGENTS[currentAgent[0]]) {
            return false;
        }
    }

    return !(isDevice() || isWebView() || isOldIE());
}

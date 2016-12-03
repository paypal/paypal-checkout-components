
import 'src/index';
import './tests/common';

import postRobot from 'post-robot/src/index';

if (window.xprops.testAction === 'checkout') {

    window.xprops.paymentToken().then(paymentToken => {

        let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

        window.xprops.onAuthorize({
            paymentToken,
            cancelUrl: `#cancel?token=${paymentToken}${ hash }`,
            returnUrl: `#return?token=${paymentToken}&PayerID=YYYYYYYYYYYYY${ hash }`,
            currentUrl: window.location.href
        });
    });

} else if (window.xprops.testAction === 'cancel') {

    window.xprops.paymentToken().then(paymentToken => {

        let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

        window.xprops.onCancel({
            paymentToken,
            cancelUrl: `#cancel?token=${paymentToken}${ hash }`
        });
    });

} else if (window.xprops.testAction === 'fallback') {

    let win;

    if (window.opener) {
        win = window;
    } else {
        win = window.open('', `fallbackWindow${Math.random()}`);
    }

    let parent = window.xchild.getParentComponentWindow();

    window.xprops.fallback('#noop').then(() => {
        win.location = '/base/test/fallback.htm';

        if (postRobot.winutil.isSameDomain(parent) && parent.watchForLegacyFallback) {
            return parent.watchForLegacyFallback(win);
        }

        for (let frame of postRobot.winutil.getFrames(parent)) {
            if (postRobot.winutil.isSameDomain(frame) && frame.watchForLegacyFallback) {
                return frame.watchForLegacyFallback(win);
            }
        }

        throw new Error('Can not find frame to watch for fallback');
    });
}



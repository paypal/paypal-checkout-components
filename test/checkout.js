
import 'src/index';
import './tests/common';

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    window.console.log.apply(window.console, arguments);
};

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

}



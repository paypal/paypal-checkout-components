
import 'src/index';

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    window.console.log.apply(window.console, arguments);
};

window.xchild.props.paymentToken().then(paymentToken => {

    let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

    window.xchild.props.onPaymentAuthorize({
        paymentToken,
        cancelUrl: `#cancel?token=${paymentToken}`,
        returnUrl: `#return?token=${paymentToken}&PayerID=YYYYYYYYYYYYY${ hash }`
    });
});

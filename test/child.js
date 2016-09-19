
import 'src/index';

window.xchild.props.paymentToken().then(paymentToken => {

    let hash = window.location.hash ? `&hash=${window.location.hash.slice(1)}` : '';

    window.xchild.props.onPaymentAuthorize({
        paymentToken,
        cancelUrl: `#cancel?token=${paymentToken}`,
        returnUrl: `#return?token=${paymentToken}&PayerID=YYYYYYYYYYYYY${ hash }`
    });
});


import 'src/index';

if (window.xchild.props.run) {
    eval(`(function() { ${window.xchild.props.run} }).call(this);`); // eslint-disable-line
}

window.xchild.props.paymentToken().then(paymentToken => {

    window.xchild.props.onPaymentAuthorize({
        paymentToken: paymentToken,
        cancelUrl: `#cancel?token=${paymentToken}`,
        returnUrl: `#return?token=${paymentToken}&PayerID=YYYYYYYYYYYYY`
    });
});

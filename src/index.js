
function isPayPalDomain() {
    return Boolean(`${window.location.protocol}//${window.location.host}`.match(/^https?:\/\/[a-zA-Z0-9_.-]+\.paypal\.com(:\d+)?$/));
}

if (window.paypal && window.paypal.version === __MINOR_VERSION__) {

    let error = 'PayPal Checkout Integration Script already loaded on page';

    if (window.console) {
        if (window.console.warn) {
            window.console.warn(error);
        } else {
            window.console.log(error);
        }
    }

    module.exports = window.paypal;
    module.exports.default = module.exports;

} else {

    let paypal = (isPayPalDomain() || __TEST__) ? require('./interface/paypal') : require('./interface/public');

    module.exports = paypal;
    module.exports.default = module.exports;

    if (window.paypal) {

        window.paypal = {
            ...window.paypal,
            ...paypal
        };

    } else {
        window.paypal = paypal;
    }

    if (window.PAYPAL) {

        window.PAYPAL = {
            ...window.PAYPAL,
            ...paypal
        };

    } else {
        window.PAYPAL = paypal;
    }
}

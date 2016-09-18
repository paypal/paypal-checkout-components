
if (window.ppxo) {

    let error = 'PayPal Checkout Integration Script already loaded on page';

    if (window.console) {
        if (window.console.warn) {
            window.console.warn(error);
        } else {
            window.console.log(error);
        }
    }

    module.exports = window.ppxo;

} else {
    module.exports = require('./interface');
    module.exports.default = module.exports;
}

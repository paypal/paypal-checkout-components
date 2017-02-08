$(document).ready(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();
    
    var fn = renderPaypalButton.toString();
    fn = fn.replace('function renderPaypalButton() {', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);

    $('#eval').click(function () {
        $('#myContainerElement').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    renderPaypalButton();
});


function renderPaypalButton() {
// Render the PayPal button

paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Wait for the PayPal button to be clicked

    payment: function() {

        // Make a call to the merchant server to set up the payment

        return paypal.request.post('/create-payment').then(function(res) {
            return res.payToken;
        });
    },

    // Wait for the payment to be authorized by the customer

    onAuthorize: function(data, actions) {

        // Make a call to the merchant server to execute the payment

        return paypal.request.post('/execute-payment', {
            payToken: data.paymentID,
            payerId: data.payerID
        }).then(function (res) {

            console.log('Payment complete:', res);
        });
    }

}, '#myContainerElement');
}

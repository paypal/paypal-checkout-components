$(document).ready(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();

    var fn = renderBillingAgreementsIntegration.toString();
    fn = fn.replace('function renderBillingAgreementsIntegration() {', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);


    $('#eval').click(function () {
        $('#myContainerElement').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    renderBillingAgreementsIntegration();
});

function renderBillingAgreementsIntegration() {
// Render the PayPal button

paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // Wait for the PayPal button to be clicked

    payment: function() {

        // Make a call to the merchant server to set up the agreement

        return paypal.request.post('/create-agreement', {}).then(function (response) {
            return response.payToken;
        });
    },

    // Wait for the payment to be authorized by the customer

    onAuthorize: function(data, actions) {

        // Make a call to the merchant server to execute the agreement

        return paypal.request.post('/execute-agreement', { payToken: data.paymentToken }) .then(function() {
            console.log('The payment is complete');
        });
    }

}, '#myContainerElement');
}

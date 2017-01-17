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
paypal.Button.render({
    env: 'sandbox',
    payment: function() {
        /*
         Create a billing agreement from the server side and
         pass the pay token shown in the approval url from the HATEOAS links
         */

        return paypal.request.post('/create-agreement', {})
            .then(function (response) {
                return response.payToken;
            });
    },

    onAuthorize: function(data, actions) {
        /*
          Pass the Pay Token to execute the billing agreement
         */
        return paypal.request.post('/execute-agreement', {payToken: data.paymentToken})
            .then(function (response) {
                console.log('The payment is complete');
            });
    },

    onCancel: function(data) {
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');

}
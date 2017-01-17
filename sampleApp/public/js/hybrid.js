$(document).ready(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();

    var fn = renderHybridIntegration.toString();
    fn = fn.replace('function renderHybridIntegration() {', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);


    $('#eval').click(function () {
        $('#myContainerElement').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    renderHybridIntegration();
});

function renderHybridIntegration() {
paypal.Button.render({
    env: 'sandbox',
    payment: function() {
        /*
             You can even create a PAY token on the serverside
             and complete the payment on the client side.
         */

        return paypal.request.post('/create-payment', {})
            .then(function (response) {
                return response.payToken;
            });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {

            console.log('The payment was completed!');
        });
    },

    onCancel: function(data) {
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');

}
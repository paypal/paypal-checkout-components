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
paypal.Button.render({
    env: 'sandbox',

    payment: function() {
        // use paypal.request to make requests to your back end with Promises

        return paypal.request.post('/create-payment', {})
            .then(function (response) {
                return response.payToken;
            });
    },

    onAuthorize: function(data, actions) {
        // use paypal.request to make requests to your back end with Promises

        var body = { payToken: data.paymentID, payerId: data.payerID };

        return paypal.request.post('/execute-payment', body)
            .then(function (res) {
                console.log('Thank you for your payment', res);
            });

    },

    onCancel: function(data) {
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');
}

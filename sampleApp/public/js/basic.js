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

        eval('( function () {' + editor.getValue() + '})()');
    });

    renderPaypalButton();
});


function renderPaypalButton() {
paypal.Button.render({
    env: 'sandbox',
    client: {
        sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
    },
    payment: function() {

        return paypal.rest.payment.create(this.props.env, this.props.client, {
            transactions: [
                {
                    amount: {
                        total:    '1.00',
                        currency: 'USD'
                    }
                }
            ]
        });
    },

    onAuthorize: function(data, actions) {
        /*
          @data:       intent, payerID, paymentID, returnUrl
          @actions:    close, redirect, restart, payment.execute, payment.get, etc.
        */
        return actions.payment.execute().then(function() {

            console.log('The payment was completed!');
        });
    },

    onCancel: function(data, actions) {
        /*
            @data:      cancelUrl, paymentToken
            @actions:   close, redirect
         */
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');
}


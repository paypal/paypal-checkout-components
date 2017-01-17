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
function renderConfirmationPage(details) {

   return paypal.request.post('/confirmation', undefined , {json: details.payer.payer_info})
        .then(function (response) {
            var container = $('#content');
            container.empty();

            container.html(response.html);
        });
}

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

        var thankyouContainer = $('#thankyou');
        $('#myContainerElement').hide();

        var button = $('<button class="btn-primary">Please click the button to confirm</button>')
            .click(function () {
            // Get the payment details
            actions.payment.get()
                .then(function (data) {
                    // Execute the payment
                    actions.payment.execute()
                        .then(function () {
                            // render a confirmation page
                            console.log('the paymnet complete', data);
                            renderConfirmationPage(data);

                        });
                });
        });

        thankyouContainer.append(button);
    },

    onCancel: function(data) {
        console.log('The payment was cancelled!');
    }

}, '#myContainerElement');
}
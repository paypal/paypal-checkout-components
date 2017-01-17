$(document).ready(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();

    var fn = markIntegration.toString();
    fn = fn.replace('function markIntegration() {', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);


    $('#eval').click(function () {
        $('#myButtonContainer').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    markIntegration();
});

function markIntegration() {
var buttonContainer = $('#myButtonContainer');

// only for the first time render
renderPaypalButton();

// watching the radio button input
$('input:radio[name=paymentOption]').change(function onChange() {
    buttonContainer.empty();

    var selection = $('input[name=paymentOption]:checked').val();

    if (selection === 'Sole') {
        renderVisaButton();
    } else if (selection === 'Mark') {
        renderPaypalButton();
    }
});

function renderVisaButton() {
    var visaButton = $('<button class="btn-primary">Checkout with Generic!</button>').click(function () {

        // dummy start
        alert('LAUNCHING ALTERNATE CHECKOUT FLOW');
    });

    buttonContainer.append(visaButton);
}


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

            return actions.payment.execute().then(function() {

                console.log('The payment was completed!');
            });
        },
        onCancel: function(data) {
            console.log('The payment was cancelled!');
        }

    }, '#myButtonContainer');

}
}

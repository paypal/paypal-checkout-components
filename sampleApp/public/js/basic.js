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
// Render the PayPal button

paypal.Button.render({

    // Set your environment

    env: 'sandbox', // sandbox | production

    // PayPal Client IDs
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create

    client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
    },

    // Wait for the PayPal button to be clicked

    payment: function() {

        // Make a client-side call to the REST api to create the payment

        return paypal.rest.payment.create(this.props.env, this.props.client, {
            transactions: [
                {
                    amount: { total: '1.00', currency: 'USD' }
                }
            ]
        });
    },

    // Wait for the payment to be authorized by the customer

    onAuthorize: function(data, actions) {

        // Execute the payment

        return actions.payment.execute().then(function() {
            console.log('The payment was completed!');
        });
    }

}, '#myContainerElement');
}


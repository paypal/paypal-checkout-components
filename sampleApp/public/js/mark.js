$(document).ready(function () {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();

    var fn = markIntegration.toString();
    fn = fn.replace('function markIntegration() {\n', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);


    $('#eval').click(function () {
        $('#myButtonContainer').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    markIntegration();
});

function markIntegration() {
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
        return actions.payment.execute().then(function() {
            console.log('The payment was completed!');
        });
    }

}, '#paypalButton');

// Show the PayPal button

function showPayPalButton() {
    document.body.querySelector('#cardButton').style.display   = 'none';
    document.body.querySelector('#paypalButton').style.display = 'block';
}

// Show the standard continue button

function showCardButton() {
    document.body.querySelector('#paypalButton').style.display = 'none';
    document.body.querySelector('#cardButton').style.display   = 'block';
}

// Show the PayPal button by default

showPayPalButton();

// Listen for changes to the radio fields

document.body.querySelectorAll('input[name=paymentOption]').forEach(function(el) {
    el.addEventListener('change', function(event) {

        // If PayPal is selected, show the PayPal button

        if (event.target.value === 'paypal') { showPayPalButton(); }

        // If Card is selected, show the standard continue button

        if (event.target.value === 'card') { showCardButton(); }
    });
});

}

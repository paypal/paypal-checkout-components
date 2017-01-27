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

var radioFields           = document.body.querySelectorAll('input[name=paymentOption]');
var paypalButtonContainer = document.body.querySelector('#paypalButton');
var cardButtonContainer   = document.body.querySelector('#cardButton');

function showPayPalButton() {
    cardButtonContainer.style.display   = 'none';
    paypalButtonContainer.style.display = 'block';
}

function showCardButton() {
    paypalButtonContainer.style.display = 'none';
    cardButtonContainer.style.display   = 'block';
}

paypal.Button.render({

    env: 'sandbox',

    client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
    },

    payment: function() {
        return paypal.rest.payment.create(this.props.env, this.props.client, {
            transactions: [
                {
                    amount: { total:    '1.00', currency: 'USD' }
                }
            ]
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            console.log('The payment was completed!');
        });
    }

}, '#paypalButton');

showPayPalButton();

radioFields.forEach(function(el) {
    el.addEventListener('change', function(event) {

        if (event.target.value === 'paypal') {
            showPayPalButton();
        }

        if (event.target.value === 'card') {
            showCardButton();
        }
    });
});

}

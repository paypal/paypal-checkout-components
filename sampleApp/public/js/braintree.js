$(document).ready(function (){

    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setShowPrintMargin(false);

    var token = window.getJwtCSRFToken && window.getJwtCSRFToken();
    jwtCsrf.setToken(token);
    jwtCsrf.patchXhr();

    var fn = renderPaypalWithBraintreeButton.toString();

    fn = fn.replace('function renderPaypalWithBraintreeButton() {', '');
    fn = fn.slice(0, -1);

    editor.setValue(fn, -1);


    $('#eval').click(function () {
        $('#myContainerElement').empty();

        eval('(function () {' + editor.getValue() + '})()');
    });

    renderPaypalWithBraintreeButton();
});

function renderPaypalWithBraintreeButton() {
// Set up the Braintree client

paypal.request.get('/generate-client-token').then(function(res) {
    braintree.client.create({ authorization: res.clientToken }, function (err, client) {
        braintree.paypal.create({ client: client }, function (err, paypalClient) {

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: 'sandbox', // sandbox | production

                // Wait for the PayPal button to be clicked

                payment: function(resolve, reject) {

                    // Call Braintree to create the payment

                    return paypalClient.createPayment({
                        flow:     'checkout',
                        amount:   '1.00',
                        currency: 'USD',
                        intent:   'sale'

                    }, function (err, data) {
                        return err ? reject(err) : resolve(data.paymentID);
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Call Braintree to tokenize the payment

                    return paypalClient.tokenizePayment(data, function (err, result) {

                        // Call your server to finalize the payment

                        return paypal.request.post('/payment', {
                            nonce: result.nonce,
                            amount: transaction.amount,
                            currency: transaction.currency

                        }).then(function (res) {
                            console.log('Payment completed: ', res);
                        });
                    });
                }

            }, '#myContainerElement');

        });
    });
});
}

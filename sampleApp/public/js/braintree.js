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
function generateBraintreePaypalInstance() {

    // Request for getting the braintree client token from our serverside

    return paypal.request.get('/generate-client-token')
        .then(function (response) {
            return getClientInstance(response.clientToken);
        });
}

function getClientInstance (clientToken) {

    // Create your own promises using paypal.Promise
    return new paypal.Promise(function (resolve, reject) {

        // producing a braintree client
        braintree.client.create( {authorization: clientToken }, function (err, clientInstance) {
            if (err) {
                reject(err);
            }
            // producing a paypal instance to create a payment
            braintree.paypal.create( {client: clientInstance}, function (err, paypalInstance) {
                if (err) {
                    reject(err);
                }
                resolve(paypalInstance);
            });
        });
    });
}

function completeBraintreeTransaction(req) {

    // Request to complete the Braintree payment

    return paypal.request.post('/payment', req)
        .then(function (res) {
            if(res.success) {
                console.log('Payment completed: ', res);
            }
        });
}

function generateNonce(paypalInstance, data) {

    // Fetch a Braintree Nonce

    return new paypal.Promise(function (resolve, reject) {
        return paypalInstance.tokenizePayment(data, function (err, result) {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
}

function renderPaypalButton(paypalInstance) {
    var transaction = {
        amount: '1.00',
        currency: 'USD'
    };

    paypal.Button.render({
        env: 'sandbox',
        payment: function(resolve, reject) {

            paypalInstance.createPayment({
                flow: 'checkout',
                amount: transaction.amount,
                currency: transaction.currency,
                intent: 'sale'
            }, function (err, data) {
                return err ? reject(err) : resolve(data.paymentID);
            });

        },

        onAuthorize: function(data, actions) {
            // fetch Braintree nonce
            generateNonce(paypalInstance, data)
                .then(function (result) {
                    var req = {
                        nonce: result.nonce,
                        amount: transaction.amount,
                        currency: transaction.currency
                    };

                    return completeBraintreeTransaction(req);
                });

        },

        onCancel: function(data) {
            console.log('The payment was cancelled!');
        }
    }, '#myContainerElement');
}

generateBraintreePaypalInstance()
    .then(function (paypalInstance) {

        renderPaypalButton(paypalInstance);
    });

}
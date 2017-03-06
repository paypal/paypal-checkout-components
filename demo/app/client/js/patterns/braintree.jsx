
import React from 'react';

export let braintree = {

    name: `Braintree`,

    fullName: `Braintree Express Checkout`,

    intro: (
        <p>Create a PayPal button and accept payments using a Braintree integration.</p>
    ),

    description: (
        <div>
            <p>First, we generate a client token and initialize Braintree using <span className="pre">braintree.client.create()</span> / <span className="pre">braintree.paypal.create()</span>.</p>
            <p>Then, a button is created using <span className="pre">paypal.Button.render()</span> to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>When the button is clicked, <span className="pre">payment()</span> is called. This function then uses <span className="pre">paypalClient.createPayment()</span> to invoke Braintree and create the payment.</p>
            <p>When the payment is authorized by the customer, <span className="pre">onAuthorize()</span> is called. This function then uses <span className="pre">paypalClient.tokenizePayment()</span> to invoke Braintree to tokenize the payment, then <span className="pre">paypal.request.post()</span> to invoke the merchant server and finalize the payment using the Braintree SDK.</p>
        </div>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>
        <script src="https://js.braintreegateway.com/web/3.9.0/js/client.min.js"></script>
        <script src="https://js.braintreegateway.com/web/3.9.0/js/paypal-checkout.min.js"></script>

        <div id="paypal-button-container"></div>

        <script>

            // Set up the Braintree client

            paypal.request.get('/checkout/api/braintree/client-token/').then(function(res) {
                braintree.client.create({ authorization: res.clientToken }, function (err, client) {
                    braintree.paypalCheckout.create({ client: client }, function (err, paypalClient) {

                        // Render the PayPal button

                        paypal.Button.render({

                            // Set your environment

                            env: '${ctx.env}', // sandbox | production

                            // Wait for the PayPal button to be clicked

                            payment: function() {

                                // Call Braintree to create the payment

                                return paypalClient.createPayment({
                                    flow:     'checkout',
                                    amount:   '1.00',
                                    currency: 'USD',
                                    intent:   'sale'
                                });
                            },

                            // Wait for the payment to be authorized by the customer

                            onAuthorize: function(data, actions) {

                                // Call Braintree to tokenize the payment

                                return paypalClient.tokenizePayment(data).then(function(result) {

                                    // Call your server to finalize the payment

                                    return paypal.request.post('/checkout/api/braintree/pay/', {
                                        nonce: result.nonce,
                                        amount: transaction.amount,
                                        currency: transaction.currency

                                    });

                                }).then(function (res) {

                                    document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                                });
                            }

                        }, '#paypal-button-container');

                    });
                });
            });

        </script>
    `
};

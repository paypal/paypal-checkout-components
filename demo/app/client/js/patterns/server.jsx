
import React from 'react';

export let server = {

    name: `Server Side`,

    fullName: `Server Side Express Checkout`,

    description: (
        <div>
            <p>Create a PayPal button and accept payments using a server-side integration.</p>
            <hr />
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>When the button is clicked, <span className="pre">payment()</span> is called. This function then uses <span className="pre">paypal.request.post()</span> to call the merchant server, which invokes the PayPal REST API to create the payment.</p>
            <p>When the payment is authorized by the customer, <span className="pre">onAuthorize()</span> is called. This function then uses <span className="pre">paypal.request.post()</span> to call the merchant server, which invokes the PayPal REST API to execute the payment.</p>
        </div>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <div id="paypal-button-container"></div>

        <script>

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // Wait for the PayPal button to be clicked

                payment: function() {

                    // Make a call to the merchant server to set up the payment

                    return paypal.request.post('/checkout/api/paypal/payment/create/').then(function(res) {
                        return res.payToken;
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Make a call to the merchant server to execute the payment

                    return paypal.request.post('/checkout/api/paypal/payment/execute/', {
                        payToken: data.paymentID,
                        payerId: data.payerID
                    }).then(function (res) {

                        document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};

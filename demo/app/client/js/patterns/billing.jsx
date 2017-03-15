
import React from 'react';

export let billing = {

    name: `Agreements`,

    fullName: `Billing Agreements`,

    intro: (
        <p>Create a PayPal button and generate billing agreements using a server-side integration.</p>
    ),

    description: (
        <div>
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>When the button is clicked, <span className="pre">payment()</span> is called. This function then uses <span className="pre">paypal.request.post()</span> to call the merchant server, which invokes the PayPal REST API to create the billing agreement.</p>
            <p>When the agreement is authorized by the customer, <span className="pre">onAuthorize()</span> is called. This function then uses <span className="pre">paypal.request.post()</span> to call the merchant server, which invokes the PayPal REST API to capture the payment.</p>
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

                    // Make a call to the merchant server to set up the agreement

                    return paypal.request.post('${ctx.baseURL}/api/paypal/agreement/create/', {}).then(function (response) {
                        return response.payToken;
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Make a call to the merchant server to execute the agreement

                    return paypal.request.post('${ctx.baseURL}/api/paypal/agreement/execute/', { payToken: data.paymentToken }) .then(function() {
                        document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};

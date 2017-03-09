
import React from 'react';

export let experience = {

    name: `Experience`,

    fullName: `Client Side Express Checkout Experience Profiles`,

    intro: (
        <p>Create a PayPal button and accept payments using a purely client-side integration, with an experience profile.</p>
    ),

    description: (
        <div>
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>When the button is clicked, <span className="pre">payment()</span> is called. This function then calls <span className="pre">paypal.rest.payment.create()</span>, which invokes the PayPal REST API directly to create the payment and experience profile.</p>
            <p>When the payment is authorized by the customer, <span className="pre">onAuthorize()</span> is called. This function then calls <span className="pre">actions.payment.execute()</span>, which invokes the PayPal REST API directly to execute the payment.</p>
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

                // PayPal Client IDs - replace with your own
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
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ]
                    }, {
                        input_fields: {
                            no_shipping: 1
                        }
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {

                    // Execute the payment

                    return actions.payment.execute().then(function() {
                        document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};


import React from 'react';

export let styles = {

    name: `Button Styles`,

    fullName: `Express Checkout Custom Button Styles`,

    description: (
        <div>
            <p>Create a PayPal button and accept payments with a custom button style.</p>
            <hr />
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>Along with the other required options, we pass a <span className="pre">style</span> block with various options to customize the button. In this block I can specify the <span className="pre">size</span>, <span className="pre">color</span> and <span className="pre">shape</span> of the button</p>
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

                // Specify the style of the button

                style: {
                    size:  'small', // tiny | small | medium
                    color: 'blue',  // gold | blue | silver
                    shape: 'pill'   // pill | rect
                },

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
                                amount: { total: '1.00', currency: 'USD' }
                            }
                        ]
                    });
                },

                // Wait for the payment to be authorized by the customer

                onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function() {
                        document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};

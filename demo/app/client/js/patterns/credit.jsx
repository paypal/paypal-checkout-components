
import React from 'react';

export let credit = {

    name: `Credit Button`,

    fullName: `Express Checkout Custom Credit Button`,

    intro: (
        <p>Create a PayPal credit button and initialize the credit flow.</p>
    ),

    description: (
        <div>
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>Along with the other required options, we pass a <span className="pre">style</span> block with various options to customize the button. In order to render the credit button, set the <span className="pre">label</span> parameter as credit. Various options for <span className="pre">size</span> and <span className="pre">shape</span> of the button can be specified to customize the button.</p>
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
                    label: 'credit',
                    size:  'small', // small | medium
                    shape: 'rect'   // pill | rect
                },

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
                },

                // Wait for the PayPal button to be clicked

                payment: function() {

                    return paypal.rest.payment.create(this.props.env, this.props.client, {
                        transactions: [
                            {
                                amount: { total: '0.01', currency: 'USD' }
                            }
                        ],
                        
                        payer: {
                            payment_method: 'paypal',
                            external_selected_funding_instrument_type: 'CREDIT'
                        }
                                            
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

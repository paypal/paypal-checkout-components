
import React from 'react';

export let validation = {

    name: `Validation`,

    fullName: `Express Checkout with validation`,

    intro: (
        <p>Create a PayPal button and only trigger checkout when the form validates</p>
    ),

    description: (
        <div>
            <p>First, a button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
            <p>When the button is clicked, <span className="pre">payment()</span> is called. This function then calls <span className="pre">paypal.rest.payment.create()</span>, which invokes the PayPal REST API directly to create the payment.</p>
            <p>When the payment is authorized by the customer, <span className="pre">onAuthorize()</span> is called. This function then calls <span className="pre">actions.payment.execute()</span>, which invokes the PayPal REST API directly to execute the payment.</p>
        </div>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <p id="msg" class="hidden error">Please check the checkbox</p>

        <p>
            <label><input id="check" type="checkbox"> Check here to continue</label>
        </p>

        <div id="paypal-button-container"></div>

        <script>

            function isValid() {
                return document.querySelector('#check').checked;
            }

            function onChangeCheckbox(handler) {
                document.querySelector('#check').addEventListener('change', handler);
            }

            function toggleValidationMessage() {
                document.querySelector('#msg').style.display = (isValid() ? 'none' : 'block');
            }

            function toggleButton(actions) {
                return isValid() ? actions.enable() : actions.disable();
            }

            // Render the PayPal button

            paypal.Button.render({

                // Set your environment

                env: '${ctx.env}', // sandbox | production

                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create

                client: {
                    local:      'alc_client1',
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
                },

                validate: function(actions) {
                    toggleButton(actions);

                    onChangeCheckbox(function() {
                        toggleButton(actions);
                    });
                },

                onClick: function() {
                    toggleValidationMessage();
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

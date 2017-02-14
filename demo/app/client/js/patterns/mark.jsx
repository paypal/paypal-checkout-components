
import React from 'react';

export let mark = {

    name: `Mark`,

    fullName: `Express Checkout Mark Integration`,

    intro: (
        <p>Create a PayPal button and accept payments using a mark integration.</p>
    ),

    description: (
        <div>
            <p>First, we create html <span className="pre">radio</span> fields with images for our different marks, and containers for the different buttons. We show the PayPal button container by default and hide the other.</p>
            <p>Then, we listen for changes on the radio fields in javascript, and based on <span className="pre">event.target.value</span>, we show the appropriate button</p>
            <p>Then, a PayPal button is created using <span className="pre">paypal.Button.render()</span>, and rendered to the <span className="pre">#paypal-button-container</span> element.</p>
        </div>
    ),

    code: (ctx) => `
        <script src="https://www.paypalobjects.com/api/checkout.js"></script>

        <!-- Render the radio fields and button containers -->

        <label>
            <input type="radio" name="payment-option" value="paypal" checked>
            <img src="/checkout/static/img/paypal-mark.jpg" alt="Pay with Paypal">
        </label>

        <label>
            <input type="radio" name="payment-option" value="card">
            <img src="/checkout/static/img/card-mark.png" alt="Accepting Visa, Mastercard, Discover and American Express">
        </label>

        <div id="paypal-button-container"></div>
        <div id="card-button-container" class="hidden"><button>Continue</button></div>

        <script>

            // Listen for changes to the radio fields

            document.body.querySelectorAll('input[name=payment-option]').forEach(function(el) {
                el.addEventListener('change', function(event) {

                    // If PayPal is selected, show the PayPal button

                    if (event.target.value === 'paypal') {
                        document.body.querySelector('#card-button-container').style.display   = 'none';
                        document.body.querySelector('#paypal-button-container').style.display = 'block';
                    }

                    // If Card is selected, show the standard continue button

                    if (event.target.value === 'card') {
                        document.body.querySelector('#card-button-container').style.display   = 'block';
                        document.body.querySelector('#paypal-button-container').style.display = 'none';
                    }
                });
            });

            // Render the PayPal button

            paypal.Button.render({

                env: '${ctx.env}',

                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: 'Aco85QiB9jk8Q3GdsidqKVCXuPAAVbnqm0agscHCL2-K2Lu2L6MxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
                },

                payment: function() {
                    return paypal.rest.payment.create(this.props.env, this.props.client, {
                        transactions: [
                            {
                                amount: { total: '1.00', currency: 'USD' }
                            }
                        ]
                    });
                },

                onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function() {
                        document.querySelector('#paypal-button-container').innerText = 'Payment Complete!';
                    });
                }

            }, '#paypal-button-container');

        </script>
    `
};

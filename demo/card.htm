<div id="paypal-button"></div>

<script src="http://localhost.paypal.com:9000/checkout.js"></script>
<!-- <script src="https://www.paypalobjects.com/api/checkout.js" data&#45;paypal&#45;checkout data&#45;log&#45;level="debug" data&#45;stage="msrelease" data&#45;api&#45;stage="api.msrelease"></script> -->

<script>
    paypal.Button.render({

        env: 'local', // Optional: specify 'sandbox' environment
        // env: 'stage', // Optional: specify 'sandbox' environment

        locale: 'en_US',

        style: {
            branding: true, // optional
            layout: 'vertical',
            size:  'medium', // small | medium | large | responsive
            shape: 'rect',   // pill | rect
            color: 'gold'   // gold | blue | silve | black
        },

        client: {
            sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQst9pYgaQNAfS1FLFxkxQuiaqRBj1vV5PmgHX_jA_c1ncL',
            stage: 'alc_client1',
            local: 'alc_client1'
        },

        payment: function(data, actions) {

            var env    = this.props.env;
            var client = this.props.client;

            return actions.payment.create({
                transactions: [
                    {
                        amount: { total: '3.00', currency: 'USD' },
                        "item_list": {
                            "items": [
                                {
                                    "name": "hat",
                                    "description": "Brown hat.",
                                    "quantity": "1",
                                    "price": "3",
                                    "sku": "1",
                                    "currency": "USD"
                                },
                            ],
                            "shipping_address": {
                                recipient_name: "Brian Robinson",
                                state: "CA",
                                line1: "2702394 Calista Court",
                                city: "San Jose",
                                postal_code: "95111",
                                country_code: "US"
                            }
                        }
                    },
                ],
                payer: {
                    payer_info: {
                        email: 'khang.hoang12123123123213@pp.com',
                        first_name: "khang",
                        last_name: "hoang",
                        billing_address: {
                            state: "CA",
                            line1: "2702394 Calista Court",
                            city: "San Jose",
                            postal_code: "95111",
                            country_code: "US"
                        }
                    }
                },
            });
        },

        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

        onAuthorize: function(data, actions) {

          console.log(data, actions);
          actions.payment.execute().then(function(data) {
            console.log(data);
            // Show a success page to the buyer
          });
        }

    }, '#paypal-button');
</script>

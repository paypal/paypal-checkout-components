## PayPal Checkout Button

![PayPal Button](./img/button.png)

![PayPal Checkout](./img/checkout.png)

### Before you start

#### Create a PayPal App

1. Go to https://developer.paypal.com/developer/applications/create
2. Log in to the site with your PayPal credentials
3. Follow the instructions to create a new app
4. Make a note of your **Client ID** and **Secret** for both **Sandbox** and **Live** (Production).

#### Add the PayPal Checkout Integration Script

Add the following to your html page:

```html
<script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
```
### Basic Integration

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

You'll need:

- Your **Client ID**.
- Your **Payment Details** (see [developer.paypal.com/docs/checkout/integrate](https://developer.paypal.com/docs/checkout/integrate/#2-set-up-a-payment) for the expected json structure)
- An **HTML Container Element** to render the button into

```javascript
<div id="myContainerElement"></div>

<script>
    // Render the button into the container element

    paypal.Button.render({

        // Pass the client ids to use to create your transaction on sandbox and production environments

        client: {
            sandbox:    'xxxxxxxxx', // from https://developer.paypal.com/developer/applications/
            production: 'xxxxxxxxx'  // from https://developer.paypal.com/developer/applications/
        },

        // Pass the payment details for your transaction
        // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters

        payment: function(data, actions) {
            return actions.payment.create({
                transactions: [
                    {
                        amount: {
                            total:    '1.00',
                            currency: 'USD'
                        }
                    }
                ]
            });
        },

        // Display a "Pay Now" button rather than a "Continue" button

        commit: true,

        // Pass a function to be called when the customer completes the payment

        onAuthorize: function(data, actions) {
            return actions.payment.execute().then(function(response) {
                console.log('The payment was completed!');
            });
        },

        // Pass a function to be called when the customer cancels the payment

        onCancel: function(data) {
            console.log('The payment was cancelled!');
        }

    }, '#myContainerElement');
</script>
```

### Advanced Integration

It's also possible to create and execute payments by calling the [PayPal REST API](./paypal-rest-api.md) from your
server side, rather than specifying the payment details inline on your client side.

With this integration:

- We set up the `payment` method to call our web-server, which then calls the PayPal REST API to **create** a Payment ID.
- We listen for `onAuthorize`, and call our web-server again, which then calls the PayPal REST API to **execute** the payment

You'll need:

- A web-server, with routes set up to do the payment creation and payment execute calls to api.paypal.com
- Your **Client ID** and **Secret** to make [PayPal REST API](./paypal-rest-api.md) calls on your server side
- An **HTML Container Element** to render the button into

```javascript

<div id="myContainerElement"></div>

<script>

    paypal.Button.render({

        // Set up a getter to create a Payment ID using the payments api, on your server side:

        payment: function() {
            return new paypal.Promise(function(resolve, reject) {

                // Make an ajax call to get the Payment ID. This should call your back-end,
                // which should invoke the PayPal Payment Create api to retrieve the Payment ID.

                // When you have a Payment ID, you need to call the `resolve` method, e.g `resolve(data.paymentID)`
                // Or, if you have an error from your server side, you need to call `reject`, e.g. `reject(err)`

                jQuery.post('/my-api/create-payment')
                    .done(function(data) { resolve(data.paymentID); })
                    .fail(function(err)  { reject(err); });
            });
        },

        // Pass a function to be called when the customer approves the payment,
        // then call execute payment on your server:

        onAuthorize: function(data) {

            console.log('The payment was authorized!');
            console.log('Payment ID = ',   data.paymentID);
            console.log('PayerID = ', data.payerID);

            // At this point, the payment has been authorized, and you will need to call your back-end to complete the
            // payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.

            jQuery.post('/my-api/execute-payment', { paymentID: data.paymentID, payerID: data.payerID })
                .done(function(data) { /* Go to a success page */ })
                .fail(function(err)  { /* Go to an error page  */  });
        },

        // Pass a function to be called when the customer cancels the payment

        onCancel: function(data) {

            console.log('The payment was cancelled!');
            console.log('Payment ID = ', data.paymentID);
        }

    }, '#myContainerElement');
</script>
```

### Customizing the Button

You can change the look and feel of the button, using the `style` parameter, and language of the button using `locale` parameter:

```javascript
paypal.Button.render({

    ...
    // Specify the language displayed on your button
    locale: 'en_US',

    // Specify the style of your button

    style: {
        size:   'medium', // tiny, small, medium
        color:  'orange', // orange, blue, silver
        shape:  'pill'    // pill, rect
    }

}, '#myContainerElement');
```

### Native framework bindings

You can also drop a PayPal Button inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
The button will appear exactly where you place them in your HTML.

See [Native Framework Bindings](./frameworks.md)


### Hybrid Integrations

You can combine any flavor of payment create and execute -- see [Hybrid Integrations](./hybrid.md).

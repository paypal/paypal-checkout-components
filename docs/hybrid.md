# Hybrid Integrations

For the `Button` and `Checkout` components, you can combine any flavor of payment create and execute, depending on what
you want to do on the client or on the server side.

### Create and execute the payment entirely from the client side

- Specify `client` and `payment` to create the payment
- Specify `commit: true` to display a "Pay Now" button rather than a "Continue" button
- Specify `onAuthorize` to get a callback after the payment is authorized, and execute the payment

```javascript
paypal.Button.render({

    client: {
        sandbox:    'xxxxxxxxx',
        production: 'xxxxxxxxx'
    },

    payment: function() {
        return paypal.rest.payment.create(this.props.env, this.props.client, {
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

    commit: true,

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            console.log('The payment was completed!');
        });
    }

}, '#myContainerElement');
```

### Create and execute the payment on your server side

- Specify `payment` method to call your server and create the payment
- Specify `onAuthorize` to get a callback after the payment is authorized, and call your server to execute the payment

```javascript
paypal.Button.render({

    payment: function() {
        return new paypal.Promise(function(resolve, reject) {
            jQuery.post('/my-api/create-payment')
                .done(function(data) { resolve(data.paymentID); })
                .fail(function(err)  { reject(err); });
        });
    },

    onAuthorize: function(data) {

        jQuery.post('/my-api/execute-payment', { paymentID: data.paymentID, payerID: data.payerID })
            .done(function(data) { console.log('The payment was executed!'); })
            .fail(function(err)  { console.log('There was an error!');  });
    }

}, '#myContainerElement');
```

### Create the payment on the client side, and execute it on your server side

- Specify `client` and `payment` to create the payment
- Specify `onAuthorize` to get a callback after the payment is authorized, and call your server to execute the payment

```javascript
paypal.Button.render({

    client: {
        sandbox:    'xxxxxxxxx',
        production: 'xxxxxxxxx'
    },

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

    onAuthorize: function(data) {

        jQuery.post('/my-api/execute-payment', { paymentID: data.paymentID, payerID: data.payerID })
            .done(function(data) { console.log('The payment was executed!'); })
            .fail(function(err)  { console.log('There was an error!');  });
    }

}, '#myContainerElement');
```

### Create the payment on your server, then execute on the client side

- Specify `payment` method to call your server and create the payment
- Specify `commit: true` to display a "Pay Now" button rather than a "Continue" button
- Specify `onAuthorize` to get a callback after the payment is authorized, and execute the payment

```javascript
paypal.Button.render({

    payment: function() {
        return new paypal.Promise(function(resolve, reject) {
            jQuery.post('/my-api/create-payment')
                .done(function(data) { resolve(data.paymentID); })
                .fail(function(err)  { reject(err); });
        });
    },

    commit: true,

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            console.log('The payment was completed!');
        });
    }

}, '#myContainerElement');
```

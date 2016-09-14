## PayPal Checkout

![PayPal Checkout](./checkout.png)

### Before you start

#### Create a PayPal App

1. Go to https://developer.paypal.com/developer/applications/create
2. Log in to the site with your PayPal credentials
3. Follow the instructions to create a new app
4. Make a note of your **Client ID** and **Secret** for both **Sandbox** and **Live** (Production).

#### Add the PayPal Checkout Integration Script

Add the following to your html page:

```html
<script src="https://www.paypalobjects.com/api/paypal.checkout.v4.js"></script>
```

### Basic Integration

This integration lets you specify all of your payment parameters all at once, to render PayPal Checkout.

You'll need:

- Your **Client ID**.
- Your **Payment Details** (see [developer.paypal.com/docs/api/payments](https://developer.paypal.com/docs/api/payments/#payment_create) for the expected json structure)

```javascript
<script>
	ppxo.Checkout.render({

		// Pass the client ID to use to create your transaction

		clientID: {
			sandbox:    'xxxxxxxxx', // from https://developer.paypal.com/developer/applications/
			production: 'xxxxxxxxx'  // from https://developer.paypal.com/developer/applications/
		},

		// Pass the payment details for your transaction

		paymentDetails: {
			transactions: [
				{
					amount: {
						total: '1.00',
						currency: 'USD'
					}
				}
			]
		},

		// Automatically execute the payment on paypal.com when the buyer clicks 'Pay Now'

		autoExecute: true,

		// Pass a function to be called when the customer completes the payment

		onPaymentComplete: function(data) {
			console.log('The payment was completed!');
		},

		// Pass a function to be called when the customer cancels the payment

		onPaymentCancel: function(data) {
			console.log('The payment was cancelled!');
		}
	});
</script>
```

### Advanced Integration

It's also possible to create and execute payments by calling the [PayPal REST API](./paypal-rest-api.md) from your
server side, rather than specifying the payment details inline on your client side.

With this integration:

- We set up `paymentToken` to call our web-server, which then calls the PayPal REST API to **create** a Payment Token.
- We listen for `onPaymentAuthorize`, and call our web-server again, which then calls the PayPal REST API to **execute** the payment

You'll need:

- A web-server, with routes set up to do the payment creation and payment execute calls to api.paypal.com
- Your **Client ID** and **Secret** to make [PayPal REST API](./paypal-rest-api.md) calls on your server side

```javascript
<script>
	ppxo.Checkout.render({

		// Set up a getter to create a payment token using the payments api, on your server side:

		paymentToken: function(resolve, reject) {

			// Make an ajax call to get the express-checkout token. This should call your back-end,
			// which should invoke the PayPal Payment Create api to retrieve the token.

			jQuery.post('/my-api/create-payment')
				.done(function(data) { resolve(data.token); })
				.fail(function(err)  { reject(err); });
		},

		// Pass a function to be called when the customer approves the payment,
		// then call execute payment on your server:

		onPaymentAuthorize: function(data) {

			console.log('The payment was authorized!');
			console.log('Token = ',   data.paymentToken);
			console.log('PayerID = ', data.payerID);

			// At this point, the payment has been authorized, and you will need to call your back-end to complete the
			// payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.

			jQuery.post('/my-api/execute-payment', { token: data.token, payerID: data.payerID });
				.done(function(data) { // Go to a success page })
				.fail(function(err)  { // Go to an error page  });
		},

		// Pass a function to be called when the customer cancels the payment

		onPaymentCancel: function(data) {

			console.log('The payment was cancelled!');
			console.log('Token = ', data.paymentToken);
		}
	});
</script>
```


### Hybrid Integrations

You can combine any flavor of payment create and execute:

- Create and execute the payment all from the client side using `paymentDetails`, `autoExecute` and `onPaymentComplete`

```javascript
ppxo.Checkout.render({

	autoExecute: true,
	paymentDetails:  { ... },
	onPaymentComplete: function(data) { ... }
});
```

- Create and execute the payment on your server, using `paymentToken` and `onPaymentAuthorize`

```javascript
ppxo.Checkout.render({

	paymentToken: function(resolve, reject) { ... },
	onPaymentAuthorize: function(data) { ... }
});
```

- Create the payment on the client side using `paymentDetails`, then execute on your server using `onPaymentAuthorize`

```javascript
ppxo.Checkout.render({

	paymentDetails:  { ... },
	onPaymentAuthorize: function(data) { ... }
});
```

- Create the payment on your server using `paymentToken`, then execute on the client side using `autoExecute` and `onPaymentComplete`

```javascript
ppxo.Checkout.render({

	autoExecute: true,
	paymentToken: function(resolve, reject) { ... },
	onPaymentComplete: function(data) { ... }
});
```


### Billing Agreements

You can also set up a billing agreement using the Checkout component. For example:

```javascript
ppxo.Checkout.render({

	// Pass the client ID to use to create your transaction

	clientID: {
		sandbox:    'xxxxxxxxx', // from https://developer.paypal.com/developer/applications/
		production: 'xxxxxxxxx'  // from https://developer.paypal.com/developer/applications/
	},

	// Pass the billing details for your transaction

	billingDetails: {
		"plan": {
			"type": "MERCHANT_INITIATED_BILLING"
		}
	},

	// Pass a function to be called when the customer completes the payment

	onPaymentAuthorize: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.billingToken);

		// Go to your success page
	}
});
```

Or create a billing token on the server side, using the [PayPal REST API](./paypal-rest-api.md):

```javascript
ppxo.Checkout.render({

	// Pass a getter to generate a billing token on your server side

	billingToken: function(resolve, reject) {

		// Make an ajax call to get the billing token. This should call your back-end, which should invoke
		// the PayPal Billing api to retrieve the token.

		jQuery.post('https://www.my-paypal-store.com/my-api/create-billing-agreement')
			.done(function(data) { resolve(data.token_id); })
			.fail(function(err)  { reject(err); });
	},

	// Pass a function to be called when the customer authorizes the billing agreement

	onPaymentAuthorize: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.billingToken);
	}
});
```

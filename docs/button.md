## PayPal Checkout Button

![PayPal Button](./button.png)

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

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

You'll need:

- Your **Client ID**.
- Your **Payment Details** (see [developer.paypal.com/docs/api/payments](https://developer.paypal.com/docs/api/payments/#payment_create) for the expected json structure)
- An **HTML Element** to place the button into

```javascript
<script>
	ppxo.Button.render({

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

		payNow: true,

		// Pass a function to be called when the customer completes the payment

		onPaymentComplete: function(data) {
			console.log('The payment was completed!');
		},

		// Pass a function to be called when the customer cancels the payment

		onPaymentCancel: function(data) {
			console.log('The payment was cancelled!');
		}

	}, '#myContainerElement');
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
	ppxo.Button.render({

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
				.done(function(data) { /* Go to a success page */ })
				.fail(function(err)  { /* Go to an error page  */  });
		},

		// Pass a function to be called when the customer cancels the payment

		onPaymentCancel: function(data) {

			console.log('The payment was cancelled!');
			console.log('Token = ', data.paymentToken);
		}

	}, '#myContainerElement');
</script>
```

### Customizing the Button

You can change the look and feel of the button, using the `buttonStyle` parameter:

```javascript
ppxo.Button.render({

	...

	// Specify the style of your button

	buttonStyle: {
		size:  'medium', // tiny, small, medium
		color: 'orange', // orange, blue
		shape: 'pill'    // pill, rect
	}

}, '#myContainerElement');
```

### Native framework bindings

You can also drop a PayPal Button inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
The button will appear exactly where you place them in your HTML.

#### Script Tag

```html
<div class="myCart">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<script type="application/x-component" data-component="paypal-button">
		{
			payNow: true,
			paymentDetails: { ... },
			onPaymentComplete: function() { ... }
		}
	</script>
</div>
```

#### React.js Element

```javascript
var MyCartComponent = window.React.createClass({
	render: function() {

		return (<div className='shoppingCart'>
			<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

			<ppxo.Button.React
				clientID={clientID}
				paymentDetails={paymentDetails}
				onPaymentComplete={onPaymentComplete} />
		</div>);
	}
});
```

#### Angular.js Element

```html
<div class="shoppingCart" ng-controller="cartController">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<paypal-button
		clientID="clientID"
		paymentDetails="paymentDetails"
		onPaymentComplete="onPaymentComplete">
	</paypal-button>
</div>
```

#### Ember.js Element

```javascipt
// Watch this space
```


### Hybrid Integrations

You can combine any flavor of payment create and execute:

- Create and execute the payment all from the client side using `paymentDetails`, `payNow` and `onPaymentComplete`

```javascript
ppxo.Button.render({

	payNow: true,
	paymentDetails:  { ... },
	onPaymentComplete: function(data) { ... }

}, '#myContainerElement');
```

- Create and execute the payment on your server, using `paymentToken` and `onPaymentAuthorize`

```javascript
ppxo.Button.render({

	paymentToken: function(resolve, reject) { ... },
	onPaymentAuthorize: function(data) { ... }

}, '#myContainerElement');
```

- Create the payment on the client side using `paymentDetails`, then execute on your server using `onPaymentAuthorize`

```javascript
ppxo.Button.render({

	paymentDetails:  { ... },
	onPaymentAuthorize: function(data) { ... }

}, '#myContainerElement');
```

- Create the payment on your server using `paymentToken`, then execute on the client side using `payNow` and `onPaymentComplete`

```javascript
ppxo.Button.render({

	payNow: true,
	paymentToken: function(resolve, reject) { ... },
	onPaymentComplete: function(data) { ... }

}, '#myContainerElement');
```


### Billing Agreements

You can also set up a billing agreement using the button component. For example:

```javascript
ppxo.Button.render({

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

}, '#myContainerElement');
```

Or create a billing token on the server side, using the [PayPal REST API](./paypal-rest-api.md):

```javascript
ppxo.Button.render({

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

}, '#myContainerElement');
```

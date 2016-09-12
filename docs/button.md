## PayPal Checkout Button

![PayPal Button](./button.png)

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

1. You call `ppxo.PayPalButton.render` to add the PayPal Button to the page
2. When the buyer clicks the button and completes the payment on PayPal, we call your `onPaymentComplete` function

```javascript
ppxo.PayPalButton.render({

	// Pass the client ID to use to create your transaction

	clientID: {
		sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQstf5hyjQNAfS1FLFxkxQuiaqRBj1vV5P3hg_jA_cf1ncL',
		production: 'Aco35QiB9jk8Q3GdsidqKVCXuPBAVbnqm0agscHCL2-K2Lu25FMxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
	},

	// Pass the payment options for your transaction

	paymentOptions: {
		transactions: [
			{
				amount: {
					total: '1.00',
					currency: 'USD'
				}
			}
		]
	},

	// Pass a function to be called when the customer completes the payment

	onPaymentComplete: function(data) {

		console.log('The payment was completed!');
		console.log('Token = ', data.paymentToken);
		console.log('PayerID = ', data.payerID);

		// Go to your success page
	}

}, '#myContainerElement');
```

### Server side Payment Create and Execute

It's also possible to create and execute payments on your server side, using this component.

For payment token and creation, see [PayPal REST API](./paypal-rest-api.md).

```javascript
ppxo.PayPalButton.render({

	// Set up a getter to create a payment token using the payments api, on your server side:

	paymentToken: function(resolve, reject) {

		// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
		// the PayPal Payment Create api to retrieve the token.

		jQuery.post('https://www.my-paypal-store.com/my-api/create-payment')

			.done(function(data) {
				resolve(data.token);
			})

			.fail(function(err) {
				reject(err);
			});
	},

	// Pass a function to be called when the customer approves the payment, then call execute payment on your server side:

	onPaymentAuthorize: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.paymentToken);
		console.log('PayerID = ', data.payerID);

		// At this point, the payment has been authorized, and you will need to call your back-end to complete the
		// payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.

		jQuery.post('https://www.my-paypal-store.com/my-api/execute-payment', { token: data.token, payerID: data.payerID });

			.done(function(data) {
				 // Go to a success page
			})

			.fail(function(err) {
				// Go to an error page
			});
	}

}, '#myContainerElement');
```

You can combine any flavor of payment create and execute:

- Create and execute the payment from the client side using `paymentDetails` and `onPaymentComplete`
- Create and execute the payment on your server side, using `paymentToken` and `onPaymentAuthorize`
- Create the payment on the client side using `paymentDetails` and execute on your server side using `onPaymentAuthorize`
- Create the payment on the server side using `paymentToken` and execute on your server side using `onPaymentComplete`

### Native bindings

You can also drop PayPal Buttons inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
will appear exactly where you place them in your HTML.

#### Script Element

```html
<div class="myCart">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<script type="application/x-component" data-component="paypal-button">
		{
			paymentOptions: {
				...
			}
		}
	</script>
</div>
```

#### React.js Element

```javascript
var MyCartComponent = window.React.createClass({
	render: function() {
		let paymentOptions = {
			...
		};

		return (<div className='shoppingCart'>
			<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

			<ppxo.PayPalButton.React clientID={clientID} paymentOptions={paymentOptions} onPaymentComplete={onPaymentComplete} />
		</div>);
	}
});
```

#### Angular.js Element

```javascript
myapp.controller('cartController', function($scope) {

	$scope.paymentOptions = {
		...
	};
});
```

```html
<div class="shoppingCart" ng-controller="cartController">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<paypal-button clientID="clientID" paymentOptions="paymentOptions" onPaymentComplete="onPaymentComplete"></paypal-button>
</div>
```

#### Ember.js Element

```javascipt
// Watch this space
```

### Billing Agreements

You can also set up a billing agreements using the button component. For example:

```javascript
ppxo.PayPalButton.render({

	// Pass the client ID to use to create your transaction

	clientID: {
		sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQstf5hyjQNAfS1FLFxkxQuiaqRBj1vV5P3hg_jA_cf1ncL',
		production: 'Aco35QiB9jk8Q3GdsidqKVCXuPBAVbnqm0agscHCL2-K2Lu25FMxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
	},

	// Pass the payment options for your transaction

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

Or to create a billing token on the server side, using the [PayPal REST API](./paypal-rest-api.md):

```javascript
ppxo.PayPalButton.render({

	// Pass a getter to generate a billing token on your server side

	billingToken: function(resolve, reject) {

		// Make an ajax call to get the billing token. This should call your back-end, which should invoke
		// the PayPal Billing api to retrieve the token.

		jQuery.post('https://www.my-paypal-store.com/my-api/create-billing-agreement')

			.done(function(data) {
				resolve(data.token_id);
			})

			.fail(function(err) {
				reject(err);
			});
	},

	// Pass a function to be called when the customer authorizes the billing agreement

	onPaymentAuthorize: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.billingToken);

		// Go to your success page
	}

}, '#myContainerElement');
```

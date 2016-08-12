## PayPal Checkout Button

![PayPal Button](./button.png)

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

1. You call `ppxo.PayPalButton.render` to add the PayPal Button to the page
2. When the buyer clicks the button and completes the payment on PayPal, we call your `onPaymentComplete` function
3. The payment is now complete!

````javascript
ppxo.PayPalButton.render({

	// Pass your preferred locale, used to render the button (optional)

	locale: 'en_US',

	// Pass the payment options for your transaction

	paymentOptions: {
		merchant: 'merchant@my-paypal-enabled-business.com',
		amount: '24.99',
		currency: 'USD'
	},

	// Pass a function to be called when the customer completes the payment

	onPaymentComplete: function(data) {

		console.log('The payment was completed!');
		console.log('Token = ', data.paymentToken);
		console.log('PayerID = ', data.payerID);

		// Go to your success page
	}

}, '#myContainerElement');
````

You can also drop PayPal Buttons inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
will appear exactly where you place them in your HTML.

#### Script Element

```html
<div class="myCart">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<script type="application/x-component" data-component="paypal-button">
		{
			// Pass your preferred locale, used to render the button (optional)

			locale: 'en_US',

			// Pass the payment options for your transaction

			paymentOptions: {
				merchant: 'merchant@my-paypal-enabled-business.com',
				amount: '24.99',
                currency: 'USD'
			},

			// Pass a function to be called when the customer completes the payment

			onPaymentComplete: function(data) {

				console.log('The payment was completed!');
				console.log('Token = ', data.paymentToken);
				console.log('PayerID = ', data.payerID);

				// Go to your success page
			}
		}
	</script>
</div>
```

#### React.js Element

```javascript
var MyCartComponent = window.React.createClass({
	render: function() {

		var paymentOptions = {
			merchant: 'merchant@my-paypal-enabled-business.com',
			amount: '24.99',
			currency: 'USD'
		}

		function onPaymentComplete(data) {
			console.log('The payment was completed!');
			console.log('Token = ', data.paymentToken);
			console.log('PayerID = ', data.payerID);

			// Go to your success page
		}

		return (<div className='shoppingCart'>
			<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

			<ppxo.PayPalButton.React locale='en_US' paymentOptions={paymentOptions} onPaymentComplete={onPaymentComplete} />
		</div>);
	}
});
```

#### Angular.js Element

```javascript
myapp.controller('cartController', function($scope) {

	$scope.paymentOptions = {
		merchant: 'merchant@my-paypal-enabled-business.com',
		amount: '24.99',
		currency: 'USD'
	}

	$scope.onPaymentComplete = function(data) {
		console.log('The payment was completed!');
		console.log('Token = ', data.paymentToken);
		console.log('PayerID = ', data.payerID);

		// Go to your success page
	}
});
```

```html
<div class="shoppingCart" ng-controller="cartController">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<paypal-button locale='en_US' paymentOptions="paymentOptions" onPaymentComplete="onPaymentComplete"></paypal-button>
</div>
```

#### Ember.js Element

```javascipt
// Watch this space
```

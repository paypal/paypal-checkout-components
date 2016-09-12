## PayPal Checkout Button

![PayPal Button](./button.png)

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

1. You call `ppxo.PayPalButton.render` to add the PayPal Button to the page
2. When the buyer clicks the button and completes the payment on PayPal, we call your `onPaymentComplete` function
3. The payment is now complete!

````javascript
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
````

You can also drop PayPal Buttons inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
will appear exactly where you place them in your HTML.

#### Script Element

```html
<div class="myCart">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<script type="application/x-component" data-component="paypal-button">
		{
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
		}
	</script>
</div>
```

#### React.js Element

```javascript
var MyCartComponent = window.React.createClass({
	render: function() {

		// Pass the client ID to use to create your transaction

		var clientID = {
			sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQstf5hyjQNAfS1FLFxkxQuiaqRBj1vV5P3hg_jA_cf1ncL',
			production: 'Aco35QiB9jk8Q3GdsidqKVCXuPBAVbnqm0agscHCL2-K2Lu25FMxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
		};

		// Pass the payment options for your transaction

		var paymentOptions = {
			transactions: [
				{
					amount: {
						total: '1.00',
						currency: 'USD'
					}
				}
			]
		};

		function onPaymentComplete(data) {
			console.log('The payment was completed!');
			console.log('Token = ', data.paymentToken);
			console.log('PayerID = ', data.payerID);

			// Go to your success page
		}

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

	// Pass the client ID to use to create your transaction

	$scope.clientID = {
		sandbox:    'AWi18rxt26-hrueMoPZ0tpGEOJnNT4QkiMQstf5hyjQNAfS1FLFxkxQuiaqRBj1vV5P3hg_jA_cf1ncL',
		production: 'Aco35QiB9jk8Q3GdsidqKVCXuPBAVbnqm0agscHCL2-K2Lu25FMxDU2AwTZa-ALMn_N0z-s2MXKJBxqJ'
	};

	// Pass the payment options for your transaction

	$scope.paymentOptions = {
		transactions: [
			{
				amount: {
					total: '1.00',
					currency: 'USD'
				}
			}
		]
	};

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

	<paypal-button clientID="clientID" paymentOptions="paymentOptions" onPaymentComplete="onPaymentComplete"></paypal-button>
</div>
```

#### Ember.js Element

```javascipt
// Watch this space
```

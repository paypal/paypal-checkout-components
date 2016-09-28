# Native Framework Bindings

You can also drop a PayPal Button inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
The button will appear exactly where you place it in your HTML.

## Script Tag

```html
<div class="myCart">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<script type="application/x-component" data-component="paypal-button">
		{
			clientID: {
				...
			},

			paymentDetails: {
				...
			},

			autoExecute: true,

			onPaymentComplete: function(data) {
				...
			}
		}
	</script>
</div>
```

## React.js Element

```javascript
var MyCartComponent = window.React.createClass({
	render: function() {

		let clientID = {
			...
		};

		let paymentDetails = {
			...
		};

		let onPaymentComplete = (data) => {
			...
		};

		return (<div className='shoppingCart'>
			<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

			<ppxo.Button.react
				clientID={clientID}
				paymentDetails={paymentDetails}
				autoExecute=true
				onPaymentComplete={onPaymentComplete} />
		</div>);
	}
});
```

## Angular.js Element

```html
<script>
	// Add 'paypal-button' as a dependency for your angular app

	angular.module('myapp', [ 'paypal-button' ])

		.controller('cartController', function($scope) {

			// Add the props needed to your $scope

			$scope.clientID = {
				...
			};

			$scope.paymentDetails = {
				...
			};

			$scope.onPaymentComplete = function(data) {
				...
			};
		});
</script>

<div class="shoppingCart" ng-controller="cartController">
	<p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

	<paypal-button
		clientID="clientID"
		paymentDetails="paymentDetails"
		autoExecute="true"
		onPaymentComplete="onPaymentComplete">
	</paypal-button>
</div>
```

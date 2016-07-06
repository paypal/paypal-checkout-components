PayPal Checkout Components
--------------------------

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[xcomponent](https://github.com/krakenjs/xcomponent).

These components support various levels of integration, depending on your requirements:

- A simple PayPal Button which takes your customer through the payment process end-to-end
- An advanced PayPal Button which allows you to use [Express Checkout](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECGettingStarted/) to accept payments
- Support for drop-in PayPal Buttons using simple JavaScript, HTML, React.js, Angular.js, or Ember.js, depending on the technology your site uses
- Stand-alone PayPal Checkout, if you have your own pre-existing checkout button

### Which Integration is right for me?

- Do you want the **simplest possible PayPal Integration**? If so, you should stick with the **PayPal Checkout Button**
  using a **Script Element** which allows you to just drop a button straight into your page. This will allow your customer
  to pay with PayPal, and we'll notify you when they're done.

- Do you use **React.js, Angular.js or Ember.js** to render your page? If so, you should use the **React.js, Angular.js or Ember.js Elements**,
  which provide native support for each of these frameworks, so you can drop PayPal Buttons in any of your front-end views.

- Do you **have your own checkout button** and you only want to use the PayPal Checkout flow? If so you
  should use the **PayPal Checkout** component, which opens up the PayPal Checkout flow on-demand, when you decide.

- Do you need **finely grained control** over your transaction; creating and finalizing transactions from your server
  side using PayPal's REST api? If so you should use the **Advanced Javascript Integration**, which will allow you to create
  and finalize the transaction yourself on your server side using the [Express Checkout](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECGettingStarted/) APIs.
  Then you can just use the **PayPal Button** or **PayPal Checkout** components to get the customer's approval for the payment,
  and do everything else on your server side.

## Usage

1. Add `checkout.v4.js` to your page:

   ```html
   <script src="https://www.paypalobjects.com/api/checkout.v4.js"></script>
   ```

2. Drop one of the following components into your page:

## PayPal Checkout Button

![PayPal Button](./button.png)

This component renders a PayPal button onto your page, which will take care of opening up PayPal for you and guiding
your customer through the payment process. After the payment is complete, we will notify you using a javascript callback,
and you can take your customer to a success page.

### Simple Javascript Integration

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.

We will call the `onPaymentComplete` function you define when the payment has been fully completed by the customer.

````javascript
ppxo.PayPalButton.render({

	// Pass your preferred locale, used to render the button

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
		console.log('Token = ', data.token);
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
			// Pass your preferred locale, used to render the button

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
				console.log('Token = ', data.token);
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
			console.log('Token = ', data.token);
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
		amount: '24.99'
	}

	$scope.onPaymentComplete = function(data) {
		console.log('The payment was completed!');
		console.log('Token = ', data.token);
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


### Advanced Javascript Integration (Express-Checkout)

This integration uses [Express Checkout](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECGettingStarted/),
which is more useful for advanced integrations.

Unlike the simple integration, you will be responsible for calling PayPal's
[Express Checkout](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECGettingStarted/) api to set up the
transaction and create an express-checkout token, and to finalize the transaction once your customer has approved the payment.

We will call the `getToken` function you provide, in which you are responsible for calling [SetExpresscheckout](https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/)
to retrieve an express-checkout token, and passing it back to the `callback`. Then once the payment has been authorized, we will call the `onPaymentAuthorized`
function you provide, and you will be responsible for calling [DoExpressCheckoutPayment](https://developer.paypal.com/docs/classic/api/merchant/DoExpressCheckoutPayment_API_Operation_NVP/)
to finalize the transaction.


```javascript
ppxo.PayPalButton.render({

	// Pass your preferred locale, used to render the button

	locale: 'en_US',

	// Pass a function which will retrieve the express checkout token for the transaction

	getToken: function(callback) {

		// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
		// the PayPal SetExpressCheckout api to retrieve the token.
		//
		// See https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/

		$.post('/my-api/set-express-checkout')

			// Handle the success case by passing the token to the callback

			.done(function(data) {
				callback(null, data.token);
			})

			// Handle the error case by passing the error to the callback

			.fail(function(err) {
				callback(err);
			});
	},

	// Pass a function to be called when the customer approves the payment

	onPaymentAuthorized: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.token);
		console.log('PayerID = ', data.payerID);

		// At this point, the payment has been authorized, and you will need to call your back-end to complete the
		// payment. Your back-end should invoke the PayPal DoExpressCheckoutPayment api to finalize the transaction.
		//
		// See https://developer.paypal.com/docs/classic/api/merchant/DoExpressCheckoutPayment_API_Operation_NVP/

		$.post('/my-api/do-express-checkout');

			.done(function(data) {
				 // Go to a success page
			})

			.fail(function(err) {
				// Go to an error page
			});
	}

}, '#myContainerElement');
```


## PayPal Checkout

![PayPal Checkout](./checkout.png)

This component immediately opens PayPal on your page, and guides your customer through th epayment process. After the
payment is complete, we will notify you using a javascript callback and you can take your customer to a success page.

### Simple Javascript Integration

This integration lets you specify all of your payment parameters all at once, to initialize the checkout flow.

We will call the `onPaymentComplete` function you define when the payment has been fully completed by the customer.

```javascript
ppxo.PayPalCheckout.render({

	// Pass your preferred locale, used to render the checkout flow

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
		console.log('Token = ', data.token);
		console.log('PayerID = ', data.payerID);

		// Go to your success page
	}
});
```


### Advanced Javascript Integration (Express-Checkout)

Unlike the simple integration, you will be responsible for calling PayPal's
[Express Checkout](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECGettingStarted/) api to set up the
transaction and create an express-checkout token, and to finalize the transaction once your customer has approved the payment.

We will call the `getToken` function you provide, in which you are responsible for calling [SetExpresscheckout](https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/)
to retrieve an express-checkout token, and passing it back to the `callback`. Then once the payment has been authorized, we will call the `onPaymentAuthorized`
function you provide, and you will be responsible for calling [DoExpressCheckoutPayment](https://developer.paypal.com/docs/classic/api/merchant/DoExpressCheckoutPayment_API_Operation_NVP/)
to finalize the transaction.



```javascript
ppxo.PayPalCheckout.render({

	// Pass your preferred locale, used to render the checkout flow

	locale: 'en_US',

	// Pass a function which will retrieve the express checkout token for the transaction

	getToken: function(callback) {

		// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
		// the PayPal SetExpressCheckout api to retrieve the token.
		//
		// See https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/

		$.post('/my-api/set-express-checkout')

			// Handle the success case by passing the token to the callback

			.done(function(data) {
				callback(null, data.token);
			})

			// Handle the error case by passing the error to the callback

			.fail(function(err) {
				callback(err);
			});
	},

	// Pass a function to be called when the customer approves the payment

	onPaymentAuthorized: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.token);
		console.log('PayerID = ', data.payerID);

		// At this point, the payment has been authorized, and you will need to call your back-end to complete the
		// payment. Your back-end should invoke the PayPal DoExpressCheckoutPayment api to finalize the transaction.
		//
		// See https://developer.paypal.com/docs/classic/api/merchant/DoExpressCheckoutPayment_API_Operation_NVP/

		$.post('/my-api/do-express-checkout');

			.done(function(data) {
				 // Go to a success page
			})

			.fail(function(err) {
				// Go to an error page
			});
	}
});
```

## Legacy Integrations

All of the [legacy integration patterns](https://developer.paypal.com/docs/classic/express-checkout/in-context/integration/)
for PayPal Checkout will continue to work with this script.

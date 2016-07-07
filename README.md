PayPal Checkout Components
--------------------------

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[xcomponent](https://github.com/krakenjs/xcomponent).

These components support various levels of integration, depending on your requirements:

- A simple PayPal Button which takes your customer through the payment process end-to-end
- An advanced PayPal Button which allows you to use [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/) to accept payments
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
  and finalize the transaction yourself on your server side using the [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/).
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

1. You call `ppxo.PayPalButton.render` to add the PayPal Button to the page
2. When the buyer clicks the button and completes the payment on PayPal, we call your `onPaymentComplete` function
3. The payment is now complete!

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
		amount: '24.99',
		currency: 'USD'
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

This integration uses [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/),
which is more useful for advanced integrations.

Unlike the simple integration, you will be responsible for calling PayPal's
[PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/) to set up the
transaction and create an express-checkout token, and to finalize the transaction once your customer has approved the payment.

1. You call `ppxo.PayPalButton.render` to invoke PayPal Checkout
2. We call your `getToken` function, when we need you to call the PayPal REST API to create a payment token
3. You call your server side, which calls [Payment Create](https://developer.paypal.com/docs/api/payments/#payment_create) to create a payment token
4. When you get the token, you pass it back to us using `callback(null, token)`;
5. We take the buyer through the PayPal Checkout flow to authorize the transaction
6. When we're done, we call your `onPaymentAuthorized` function
7. You then call your server side, which calls the [Payment Execute](https://developer.paypal.com/docs/api/payments/#payment_execute) api to finalize the transaction
8. The payment is complete!

```javascript
ppxo.PayPalButton.render({

	// Pass your preferred locale, used to render the button

	locale: 'en_US',

	// Pass a function which will retrieve the payment token for the transaction

	getToken: function(callback) {

		// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
		// the PayPal Payment Create api to retrieve the token.
		//
		// See https://developer.paypal.com/docs/api/payments/#payment_create

		$.post('https://www.my-paypal-store.com/my-api/set-express-checkout')

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
		// payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.
		//
		// See https://developer.paypal.com/docs/api/payments/#payment_execute

		$.post('https://www.my-paypal-store.com/my-api/do-express-checkout');

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

**Important Note:** Since PayPal Checkout opens a popup window, you must call `ppxo.PayPalCheckout.render()` only during
a **click event**, otherwise the component will be blocked by most web browsers' inbuilt popup blockers.

### Simple Javascript Integration

This integration lets you specify all of your payment parameters all at once, to initialize the checkout flow.

1. You call `ppxo.PayPalCheckout.render` to load the PayPal Checkout flow on your page
2. When the buyer completes the payment on PayPal, we call your `onPaymentComplete` function
3. The payment is now complete!

```javascript
$('#myCheckoutButton').on('click', function() {
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
});
```


### Advanced Javascript Integration (Express-Checkout)

Unlike the simple integration, you will be responsible for calling PayPal's
[PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/) to set up the
transaction and create an express-checkout token, and to finalize the transaction once your customer has approved the payment.

1. You call `ppxo.PayPalCheckout.render` to invoke PayPal Checkout
2. We call your `getToken` function, when we need you to call the PayPal REST API to create a payment token
3. You call your server side, which calls [Payment Create](https://developer.paypal.com/docs/api/payments/#payment_create) to create a payment token
4. When you get the token, you pass it back to us using `callback(null, token)`;
5. We take the buyer through the PayPal Checkout flow to authorize the transaction
6. When we're done, we call your `onPaymentAuthorized` function
7. You then call your server side, which calls the [Payment Execute](https://developer.paypal.com/docs/api/payments/#payment_execute) api to finalize the transaction
8. The payment is complete!

```javascript
$('#myCheckoutButton').on('click', function() {
	ppxo.PayPalCheckout.render({

		// Pass your preferred locale, used to render the checkout flow

		locale: 'en_US',

		// Pass a function which will retrieve the payment token for the transaction

		getToken: function(callback) {

			// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
			// the PayPal Payment Create api to retrieve the token.
			//
			// See https://developer.paypal.com/docs/api/payments/#payment_create

			$.post('https://www.my-paypal-store.com/my-api/set-express-checkout')

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
			// payment. Your back-end should invoke the PayPal Payment Exexute api to finalize the transaction.
			//
			// See https://developer.paypal.com/docs/api/payments/#payment_execute

			$.post('https://www.my-paypal-store.com/my-api/do-express-checkout');

				.done(function(data) {
					 // Go to a success page
				})

				.fail(function(err) {
					// Go to an error page
				});
		}
	});
});
```

## Integrating with the PayPal REST API

If you want to use the advanced javascript integration, you will need a way to create payment tokens on your
server side. The simplest way to do this is using the [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/)

1. Go to [developer.paypal.com/developer/applications](https://developer.paypal.com/developer/applications) and create a **REST API app**, then note down your client id and secret

2. Call `api.paypal.com/v1/oauth2/token` to get a temporary access token

   You'll need:

   - Your app client id (from step 1)
   - Your app secret (from step 1)

   ```shell
   CLIENT_ID='E4gg1bkY8HgPXVFuqOeQMXppxgdfJglTkYaez4tLVUnVBeRsgTpVBK9ngxGdqp7';
   SECRET='HyltbozR9LCmWfW61XrUmoMnfctxgDmnbl4WlIDX5pvipzHDB0Y65aZ72tJk7aV';

   curl 'https://api.paypal.com/v1/oauth2/token' \
     --request POST \
     --user "$CLIENT_ID:$SECRET" \
     --data 'grant_type=client_credentials';
   ```

   The access token will be returned under `access_token` in the json response.

   ```json
   {
     "scope": "https://uri.paypal.com/services/subscriptions https://api.paypal.com/v1/payments/.* https://api.paypal.com/v1/vault/credit-card https://uri.paypal.com/services/applications/webhooks openid https://uri.paypal.com/payments/payouts https://api.paypal.com/v1/vault/credit-card/.*",
     "nonce": "2016-07-06T22:54:44ZDOeMD8yOgBhAtMJGxFVvtoWFEP0zpA8u47VARZwkrIo",
     "access_token": "89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn",
     "token_type": "Bearer",
     "app_id": "APP-1EK098459H112623B",
     "expires_in": 32400
   }
   ```

3. Call `api.paypal.com/v1/payments/payment` to create a transaction

   You'll need:

   - The access token (`access_token` from the response in step 2)
   - The payment details for the transaction you want to create

   ```shell
   ACCESS_TOKEN='89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn';

   PAYMENT='{
     "intent": "sale",
     "redirect_urls": {
       "return_url": "http://example.com/your_redirect_url.html",
       "cancel_url": "http://example.com/your_cancel_url.html"
     },
     "payer": {
       "payment_method":"paypal"
     },
     "transactions": [
       {
         "amount":{
           "total":"7.47",
           "currency":"USD"
         }
       }
     ]
   }';

   curl 'https://api.paypal.com/v1/payments/payment' \
     --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header 'Content-type: application/json' \
     --data "$PAYMENT";
   ```

   The payment token will be returned under `links[].href` for the `approval_url`:

   ```json
   {
     "id": "PAY-0J356327TH335450NK56Y2PQ",
     "intent": "sale",
     "state": "created",
     "payer": {
       "payment_method": "paypal"
     },
     "transactions": [
       {
         "amount": {
           "total": "7.47",
           "currency": "USD"
         },
         "related_resources": []
       }
     ],
     "create_time": "2016-07-06T22:59:10Z",
     "links": [
       {
         "href": "https://api.paypal.com/v1/payments/payment/PAY-0J356327TH335450NK56Y2PQ",
         "rel": "self",
         "method": "GET"
       },
       {
         "href": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2003069323602984G",
         "rel": "approval_url",
         "method": "REDIRECT"
       },
       {
         "href": "https://api.paypal.com/v1/payments/payment/PAY-0J356327TH335450NK56Y2PQ/execute",
         "rel": "execute",
         "method": "POST"
       }
     ]
   }
   ```

   Here you can see `token=EC-2003069323602984G`. This is the token we need to use on our front-end.

4. Use the `PayPalButton` or `PayPalCheckout` component to let the buyer authorize the payment

   You'll need:

   - The approval url (`links[i].href` from the response in step 3, where `rel === "approval_url"`)

   ```javascript
   ppxo.PayPalButton.render({

	   getToken: function(callback) {
	       // Call your server side to get the approval url from step 3

	       callback(null, approval_url);
	   },

	   onPaymentAuthorized: function(data) {
	       // Call payment execute (see step 5)
	   }

   }, '#myContainerElement');
   ```

5. Call `api.paypal.com/v1/payments/payment/PAYMENT-ID/execute` to finalize a transaction

	You'll need:

	- The access token (`access_token` from the response in step 2)
	- The payment id (`id` from the response in step 3)
	- The payer id (`data.payerID` from the response to `onPaymentAuthorized` from the buyer approval in step 4)

   ```shell
   ACCESS_TOKEN='89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn';
   PAYMENT_ID='PAY-0J356327TH335450NK56Y2PQ';
   PAYER_ID='GSF4567F5DSCGH34'

   curl "https://api.paypal.com/v1/payments/payment/$PAYMENT_ID/execute" \
     --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header 'Content-type: application/json' \
     --data "{\"payer_id\": \"$PAYER_ID\"}";
   ```

## Legacy Integrations

All of the [legacy integration patterns](https://developer.paypal.com/docs/classic/express-checkout/in-context/integration/)
for PayPal Checkout will continue to work with this script.

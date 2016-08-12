## PayPal Checkout Button

![PayPal Button](./button.png)

This component renders a PayPal button onto your page, which will take care of opening up PayPal for you and guiding
your customer through the payment process. After the payment is complete, we will notify you using a javascript callback,
and you can take your customer to a success page.

Please note - this advanced integration only covers the **buyer authorization** portion of the Checkout. It expects you
to use PayPal's REST api to initiate the payment, and execute the payment once the buyer authorization is complete.
Please see the [PayPal REST API Docs](./paypal-rest-api.md) for information on creating the payment token and executing
the payment.

### Advanced Javascript Integration (Express-Checkout)

This integration uses [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/),
which is more useful for advanced integrations.

Unlike the simple integration, you will be responsible for calling PayPal's
[PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/) to set up the
transaction and create an express-checkout token, and to finalize the transaction once your customer has approved the payment.

1. You call `ppxo.PayPalButton.render` to invoke PayPal Checkout
2. We call your `paymentToken` function, when we need a payment token
3. You call your server side, which calls [Payment Create](https://developer.paypal.com/docs/api/payments/#payment_create) to create a payment token
4. When you get the token, you pass it back to us using `resolve(token)`;
5. We take the buyer through the PayPal Checkout flow to authorize the transaction
6. When we're done, we call your `onPaymentAuthorize` function
7. You then call your server side, which calls the [Payment Execute](https://developer.paypal.com/docs/api/payments/#payment_execute) api to finalize the transaction
8. The payment is complete!

```javascript
ppxo.PayPalButton.render({

	// Pass your preferred locale, used to render the button (optional)

	locale: 'en_US',

	// Pass a function which will retrieve the payment token for the transaction

	paymentToken: function(resolve, reject) {

		// Make an ajax call to get the express-checkout token. This should call your back-end, which should invoke
		// the PayPal Payment Create api to retrieve the token.
		//
		// See https://developer.paypal.com/docs/api/payments/#payment_create

		jQuery.post('https://www.my-paypal-store.com/my-api/payment-create')

			// Handle the success case by passing the token to the resolve callback

			.done(function(data) {
				resolve(data.token);
			})

			// Handle the error case by passing the error to the reject callback

			.fail(function(err) {
				reject(err);
			});
	},

	// Pass a function to be called when the customer approves the payment

	onPaymentAuthorize: function(data) {

		console.log('The payment was authorized!');
		console.log('Token = ', data.paymentToken);
		console.log('PayerID = ', data.payerID);

		// At this point, the payment has been authorized, and you will need to call your back-end to complete the
		// payment. Your back-end should invoke the PayPal Payment Execute api to finalize the transaction.
		//
		// See https://developer.paypal.com/docs/api/payments/#payment_execute

		jQuery.post('https://www.my-paypal-store.com/my-api/payment-execute', { token: data.paymentToken, payerID: data.payerID });

			.done(function(data) {
				 // Go to a success page
			})

			.fail(function(err) {
				// Go to an error page
			});
	}

}, '#myContainerElement');
```

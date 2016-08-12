## PayPal Checkout Simple

![PayPal Checkout](./checkout.png)

This integration lets you specify all of your payment parameters all at once, to initialize the checkout flow.

1. You call `ppxo.PayPalCheckout.render` to load the PayPal Checkout flow on your page
2. When the buyer completes the payment on PayPal, we call your `onPaymentComplete` function
3. The payment is now complete!

**Important Note:** Since PayPal Checkout opens a popup window, you must call `ppxo.PayPalCheckout.render()` only during
a **click event**, otherwise the component will be blocked by most web browsers' inbuilt popup blockers.

```javascript
// The PayPal Checkout component MUST be rendered on a click event, to function correctly

document.getElementById('myButton').addEventListener('click', function() {

	ppxo.PayPalCheckout.render({

		// Pass your preferred locale, used to render the checkout flow (optional)

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
	});
});
```

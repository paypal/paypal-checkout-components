# Hybrid Integrations

For the `Button` and `Checkout` components, you can combine any flavor of payment create and execute, depending on what
you want to do on the client or on the server side.

### Create and execute the payment entirely from the client side

- Specify `paymentDetails` to create the payment
- Specify `autoExecute` to execute the payment after the buyer clicks Pay
- Specify `onPaymentComplete` to get a callback after the payment is executed

```javascript
ppxo.Button.render({

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

	autoExecute: true,

	onPaymentComplete: function(data) {
		console.log('The payment was executed!');
	}

}, '#myContainerElement');
```

### Create and execute the payment on your server side

- Specify `paymentToken` to call your server and create the payment
- Specify `onPaymentAuthorize` to get a callback after the payment is authorized, and call your server to execute the payment

```javascript
ppxo.Button.render({

	paymentToken: function(resolve, reject) {

		jQuery.post('/my-api/create-payment')
			.done(function(data) { resolve(data.token); })
			.fail(function(err)  { reject(err); });
	},

	onPaymentAuthorize: function(data) {

		jQuery.post('/my-api/execute-payment', { token: data.token, payerID: data.payerID });
			.done(function(data) { console.log('The payment was executed!'); })
			.fail(function(err)  { console.log('There was an error!');  });
	}

}, '#myContainerElement');
```

### Create the payment on the client side, and execute it on your server side

- Specify `paymentDetails` to create the payment
- Specify `onPaymentAuthorize` to get a callback after the payment is authorized, and call your server to execute the payment

```javascript
ppxo.Button.render({

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

	onPaymentAuthorize: function(data) {

		jQuery.post('/my-api/execute-payment', { token: data.token, payerID: data.payerID });
			.done(function(data) { console.log('The payment was executed!'); })
			.fail(function(err)  { console.log('There was an error!');  });
	}

}, '#myContainerElement');
```

### Create the payment on your server, then execute on the client side

- Specify `paymentToken` to call your server and create the payment
- Specify `autoExecute` to execute the payment after the buyer clicks Pay
- Specify `onPaymentComplete` to get a callback after the payment is executed

```javascript
ppxo.Button.render({

	paymentToken: function(resolve, reject) {

		jQuery.post('/my-api/create-payment')
			.done(function(data) { resolve(data.token); })
			.fail(function(err)  { reject(err); });
	},

	autoExecute: true,

	onPaymentComplete: function(data) {
		console.log('The payment was executed!');
	}

}, '#myContainerElement');
```

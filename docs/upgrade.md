# Upgrading Your PayPal Checkout Integration

If you have an existing full-page PayPal Checkout integration, you may want to upgrade to use the
[Button Component](./button.md), and take advantage of support for same-page checkout, and callbacks.

#### What's new:

- We no longer recommend doing a full-page redirect to the PayPal Checkout web flow. Instead, we'll open up a popup or a
  lightbox on your page, and the customer will be able to pay without ever leaving your site.

- Instead of a `success url` and `cancel url`, you just need to pass in the PayPal payment token and a callback function,
  and we'll call your callback function when the payment has been authorized by the customer.

- You no longer have to set up the PayPal button yourself. We will render the button for you, and you'll get any
  upgrades to the button automatically.


## Form Post Integration

[YouTube - How to upgrade form post integration](https://youtu.be/UH-tiYoBFZQ)

You may have a PayPal button in an html form, which posts to your server and does a 302 redirect to PayPal:

```html
<form id="paypalForm" method="post" action="/classic/setexpresscheckout">
	<input type="hidden" name="amount" value="50" />
	<input type="hidden" name="currency" value="USD" />
	<input type="hidden" name="action" value="Sale" />
	<input type="image" src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png" />
</form>
```
Upgrade
```js
function formEncode(form) {
	var ret = {};
	Object.keys(form.elements).forEach(function (key) {
		ret[form.elements[key].name] = form.elements[key].value;
	});
	return ret;
}
paypal.Button.render({
	env: 'sandbox',
	funding: {
		allowed: [paypal.FUNDING.VENMO]
	},
	payment: function(data, actions) {
		return paypal.request.post('/classic/setexpresscheckout', formEncode(document.getElementById('paypalForm')), {
			headers: {
				'Accept': 'application/paypal-json-token',
			}
		})
		.then(function (response) {
			return response.token;
		});
	},
	onAuthorize: function(data, actions) {
		return actions.redirect();
	},
	onCancel: function (data, actions) {
		return actions.redirect();
	},
	onError: function (err) {
		console.log(err);
		alert("There was an error check the console");
	}
}, '#paypal-button-container');
```

## Get Request Integration

[YouTube - How to upgrade get request integration](https://youtu.be/3mD_ACwYoV8)

You may have a simple anchor or form with method "get" like this: 
```html
<a id="paypalLink" href="/classic/setexpresscheckout">
	<img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png"/>
</a>
```
Upgrade
```js
paypal.Button.render({
	env: 'sandbox',
	funding: {
		allowed: [paypal.FUNDING.VENMO]
	},
	payment: function(data, actions) {
		return paypal.request.get('/classic/setexpresscheckout', {
			headers: {
				'Accept': 'application/paypal-json-token',
			}
		})
		.then(function (response) {
			return response.token;
		});
	},
	onAuthorize: function(data, actions) {
		return actions.redirect();
	},
	onCancel: function (data, actions) {
		return actions.redirect();
	},
	onError: function (err) {
		console.log(err);
		alert("There was an error check the console");
	}
}, '#paypal-button-container');
```

## Ajax Integration

You may be making an ajax call to PayPal, then redirecting to the PayPal Checkout flow:

```html
<div id="paymentMethods">
    <button id="paypalButton">Pay with PayPal</button>
</div>

<script>
    document.querySelector('#paypalButton').addEventListener('click', function(event) {
        jQuery.post('/create-paypal-token', function(data) {
            window.location = 'https://www.paypal.com/checkoutnow?token=' + data.token;
        });
    });
</script>
```

If so, you can easily upgrade to use the Button component like so:

```html
<div id="paymentMethods"></div>
<script>
    paypal.Button.render({

        payment: function() {
            return new paypal.Promise(function(resolve, reject) {
                jQuery.post('/create-paypal-token', function(data) {
                    resolve(data.token);
                });
            });
        },
		onAuthorize: function(data, actions) {
			return actions.redirect();
		},
    }, '#paymentMethods');
</script>
```

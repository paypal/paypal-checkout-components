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
        }

        onAuthorize: function(data) {
            window.location = data.returnUrl;
        }

    }, '#paymentMethods');
</script>
```

## Form Integration

You may have a PayPal button in an html form, which does a 302 redirect to PayPal:

```html
<form method="post" action="/redirect-to-paypal">
    <button id="paypalButton">Pay with PayPal</button>
</div>
```

If so, you can easily upgrade and drop in the PayPal Button like so:

```html
<form method="post" action="/redirect-to-paypal">
    <script data-component="paypal-button" type="application/x-component">
        {
            submitForm: true,

            onAuthorize: function(data) {
                window.location = data.returnUrl;
            }
        }
    </script>
</div>
```

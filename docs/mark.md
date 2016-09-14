## PayPal Checkout Mark Integrations

![PayPal Mark](./mark.png)

It's possible to use PayPal Checkout as part of a Mark integration

#### Showing the PayPal Button conditionally

Show the PayPal button only when the user selects the PayPal radio field

```html

<div id="paypalButtonContainer"></div>

<script>

	// Render the button

	ppxo.Button.render({
		...
	}, '#paypalButtonContainer');

	// When the user selects the PayPal radio field:

	showPayPalButtonContainer();

	// When the user deselects the PayPal radio field:

	hidePayPalButtonContainer();

</script>
```

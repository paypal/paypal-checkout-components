## PayPal Checkout Mark Integrations

![PayPal Mark](./img/mark.png)

It's possible to use PayPal Checkout as part of a Mark integration.
We recommend showing the PayPal Button conditionally when the PayPal radio field is selected.

### Showing the PayPal Button conditionally (recommended)

Use the [PayPal Button](./button.md) component.

1. Set up the html for your radio fields
2. Render the PayPal Button in advance onto your page using the instructions for the [PayPal Button](./button.md)
3. Use javascript to show the button container when the user selects the PayPal radio field
4. Use javascript to hide the button container when the user selects any other radio field

## PayPal Checkout Mark Integrations

![PayPal Mark](./mark.png)

It's possible to use PayPal Checkout as part of a Mark integration. There are a few different flavors of Mark integration
that we support. We recommend showing the PayPal Button conditionally when the PayPal radio field is selected.

### Showing the PayPal Button conditionally (recommended)

You may want a mark integration where the PayPal Button is only shown when the PayPal radio field is selected. This is
our recommended approach.

In this case you should use the [PayPal Button](./button.md) component.

1. Set up the html for your radio fields
2. Render the PayPal Button in advance onto your page using the instructions for the [PayPal Button](./button.md)
3. Use javascript to show the button container when the user selects the PayPal radio field
4. Use javascript to hide the button container when the user selects any other radio field

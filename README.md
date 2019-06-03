# PayPal Smart Payment Buttons

Smart Payment Buttons application, including:

- Server-side buttons renderer
- Client side logic

Please note: this repo is **not intended as a public entry point into the smart buttons**. Please see:

- Smart Payment Buttons developer docs: https://developer.paypal.com/docs/checkout/
- PayPal JavaScript SDK repo (PayPal JavaScript SDK): https://github.com/paypal/paypal-checkout-components
- Smart Payment Buttons Framework examples: https://github.com/paypal/paypal-checkout-components/tree/master/demo
- Smart Payment Buttons Issues: https://github.com/paypal/paypal-checkout-components/issues

## Development

Running the development server

```bash
npm install
npm start
```

Then load http://localhost/smart/buttons?clientID=alc_client1 in your browser.

### Using local paypal-checkout-components

This repo uses the button renderer from [github.com/paypal/paypal-checkout-components](https://github.com/paypal/paypal-checkout-components). To pull in local changes from `paypal-checkout-components` to this module:

- Clone and set up the [github.com/paypal/paypal-checkout-components](https://github.com/paypal/paypal-checkout-components) repo
- Run this module with `BUTTON_RENDER_DIR=/path/to/paypal-checkout-components npm start`
- Load http://localhost/smart/buttons?clientID=alc_client1 in your browser

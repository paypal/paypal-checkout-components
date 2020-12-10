# PayPal Smart Payment Buttons

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![npm version][version-badge]][package]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/paypal/paypal-smart-payment-buttons/build?logo=github&style=flat-square
[build]: https://github.com/paypal/paypal-smart-payment-buttons/actions?query=workflow%3Abuild
[coverage-badge]: https://img.shields.io/codecov/c/github/paypal/paypal-smart-payment-buttons.svg?style=flat-square
[coverage]: https://codecov.io/github/paypal/paypal-smart-payment-buttons/
[version-badge]: https://img.shields.io/npm/v/@paypal/smart-payment-buttons.svg?style=flat-square
[package]: https://www.npmjs.com/package/@paypal/smart-payment-buttons
[license-badge]: https://img.shields.io/npm/l/@paypal/smart-payment-buttons.svg?style=flat-square
[license]: https://github.com/paypal/paypal-smart-payment-buttons/blob/master/LICENSE

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

## Release

### Release a new version

```bash
npm run release
```

### Deploy the new version

```bash
npm run deploy
```

### Activate traffic on the new version

```bash
npm run activate
```

### Activate traffic on a specific version

```bash
npm run activate 2.0.123
```

### Activate traffic on a specific version to a specific environment

```bash
npm run activate 2.0.123 sandbox
```

### Activate traffic on a specific version to multiple specific environments

```bash
npm run activate 2.0.123 'local stage sandbox'
```

## Using local paypal-checkout-components

This repo uses the button renderer from [github.com/paypal/paypal-checkout-components](https://github.com/paypal/paypal-checkout-components). To pull in local changes from `paypal-checkout-components` to this module:

- Clone and set up the [github.com/paypal/paypal-checkout-components](https://github.com/paypal/paypal-checkout-components) repo
- Run this module with `BUTTON_RENDER_DIR=/path/to/paypal-checkout-components npm start`
- Load http://localhost/smart/buttons?clientID=alc_client1 in your browser

## Preflight call

This section is relevant to integrations passing `data-user-id-token`, for vaulted/one-click button renders.

Rendering the vaulted button can be time consuming. The Smart Buttons server allows a pre-flight call to be made. This pre-caches the button, ready to be rendered immediately when the buyer lands on your page. This should typically be done in one of the following places:

- On a page immediately prior to displaying the Smart Buttons
- On a single-page app prior to displaying the Smart Buttons, if the Smart Buttons are displayed after a user action
- On the server-side prior to rendering the cart or checkout page containing the Smart Buttons

To invoke, simply make a call to the following URL:

```bash
https://www.paypal.com/smart/buttons/preload?client-id=CLIENT_ID&user-id-token=ID_TOKEN
```

The following URL params can be passed:

- `client-id`: (required) Your PayPal client id
- `user-id-token`: (required) Your customer's id token
- `merchant-id` (optional) The merchant id or email of the transaction payee
- `amount`: (optional) The estimated amount of the transaction
- `currency`: (optional) The currency of the transaction

This request can be made as a fire-and-forget call: you do not need to wait for a response, or check the status code of the response.

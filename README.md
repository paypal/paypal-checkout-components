PayPal Checkout
---------------

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/paypal/paypal-checkout) [![Build Status](https://travis-ci.org/paypal/paypal-checkout.svg?branch=master)](https://travis-ci.org/paypal/paypal-checkout-components) [![dependencies Status](https://david-dm.org/paypal/paypal-checkout/status.svg)](https://david-dm.org/paypal/paypal-checkout-components) [![devDependencies Status](https://david-dm.org/paypal/paypal-checkout/dev-status.svg)](https://david-dm.org/paypal/paypal-checkout-components?type=dev)

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[zoid](https://github.com/krakenjs/zoid).

## Dev Docs

See [**developer.paypal.com/docs/checkout**](https://developer.paypal.com/docs/checkout/)

-----

## Development

Please feel free to follow the [Contribution Guidelines](./CONTRIBUTING.md) to contribute to this repository. PRs are welcome, but for major changes please raise an issue first.

### Quick Setup

Set up your env:

```bash
npm install
```

Run tests:

```bash
npm test
```

Run in dev mode:

```bash
npm run dev
```

### Debugging messages

To enable output of additional debugging messages to the console, set the `data-log-level` attribute of the script element to e.g. `info` (default value is `warn`):

   ```html
   <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4 data-log-level="info"></script>
   ```

## Test Tasks
```
npm test
```

| Flags  | Description |
| ------------- | ------------- |
| --clear-cache | Clear Babel Loader and PhantomJS cache |
| --debug | Debug mode.  PhantomJS, Karma, and CheckoutJS  |
| --quick | Fastest testing.  Minimal output, no coverage |
| --browser | Choose Browser |


## Features
Here is a full list of features provided by this library

* <a href="docs/http.md">Http (AJAX) Helper functions</a>

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.

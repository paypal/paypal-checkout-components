PayPal Checkout
---------------

[![npm version](https://img.shields.io/npm/v/@paypal/checkout-components.svg?style=flat-square)](https://www.npmjs.com/package/@paypal/checkout-components)
[![build status](https://img.shields.io/github/workflow/status/paypal/paypal-checkout-components/build?logo=github&style=flat-square)](https://github.com/paypal/paypal-checkout-components/actions?query=workflow%3Abuild)

[![dependencies Status](https://david-dm.org/paypal/paypal-checkout-components/status.svg)](https://david-dm.org/paypal/paypal-checkout-components) [![devDependencies Status](https://david-dm.org/paypal/paypal-checkout-components/dev-status.svg)](https://david-dm.org/paypal/paypal-checkout-components?type=dev)


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

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.

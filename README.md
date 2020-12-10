PayPal Checkout
---------------

[![build status][build-badge]][build]
[![code coverage][coverage-badge]][coverage]
[![npm version][version-badge]][package]
[![apache license][license-badge]][license]

[build-badge]: https://img.shields.io/github/workflow/status/paypal/paypal-checkout-components/build?logo=github&style=flat-square
[build]: https://github.com/paypal/paypal-checkout-components/actions?query=workflow%3Abuild
[coverage-badge]: https://img.shields.io/codecov/c/github/paypal/paypal-checkout-components.svg?style=flat-square
[coverage]: https://codecov.io/github/paypal/paypal-checkout-components/
[version-badge]: https://img.shields.io/npm/v/@paypal/checkout-components.svg?style=flat-square
[package]: https://www.npmjs.com/package/@paypal/checkout-components
[license-badge]: https://img.shields.io/npm/l/@paypal/checkout-components.svg?style=flat-square
[license]: https://github.com/paypal/paypal-checkout-components/blob/master/LICENSE

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

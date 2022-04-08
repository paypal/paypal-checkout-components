## PayPal Checkout

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
[license]: https://github.com/paypal/paypal-checkout-components/blob/main/LICENSE

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[zoid](https://github.com/krakenjs/zoid).

## Dev Docs

See [**developer.paypal.com/docs/checkout**](https://developer.paypal.com/docs/checkout/)

---

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

## Testing Tasks

```bash
npm test
```

Runs all testing tasks `lint`, `flow`, `karma`, `jest-ssr`, `jest-screenshot`, & `check-size`.

| Flags         | Description                                  |
| ------------- | -------------------------------------------- |
| --clear-cache | Clear Babel Loader and PhantomJS cache       |
| --debug       | Debug mode. PhantomJS, Karma, and CheckoutJS |
| --quick       | Fastest testing. Minimal output, no coverage |
| --browser     | Choose Browser                               |

&nbsp;

### lint

```bash
npm run lint

npm run lint -- --fix
# attempt to automatically fix any problems
```

Runs [eslint](https://eslint.org/) using [definitions](./.eslinter.js) extended from [Grumbler-Scripts](https://github.com/krakenjs/@krakenjs/grumbler-scripts/blob/main/config/.eslintrc-browser.js).

### flow

```
npm run flow
```

Checks for typing issues using [Flow](https://flow.org/). Prior to running this task, `flow-typed` should be run to [generate type interfaces](https://github.com/flow-typed/flow-typed) for the various 3rd-party libraries we use.

### karma

```bash
npm run karma

npm run karma -- --keep-open
# keeps the test browser window open to allow debugging
npm run karma -- --capture-console
# dumps the browser's console output into the terminal
```

Runs [Karma](https://mochajs.org/) tests using the [Mocha](https://mochajs.org/) framework. Responsible for running the [test/e2e](./test/e2e/) & [test/integration](./test/integration) directories.

### jest-ssr

```bash
npm run jest-ssr
```

Checks for the correct rendering of components on the server-side using [Jest](https://jestjs.io/).

### jest-screenshot

```bash
npm run jest-screenshot
```

Uses [Puppeteer](https://developers.google.com/web/tools/puppeteer) & [Jest](https://jestjs.io/) to take screenshots and checks against existing views to look for discrepancies. Tests are defined in [test/screenshot/config.js](./test/screenshot/config.js).

### check-size

```bash
npm run check-size
```

Checks to make sure that the compiled & gzipped bundle doesn't exceed the recommended size limit.

## Releasing

This package is published weekly, **Every Wednesday**. Please [view our Changelog](CHANGELOG.md) to stay updated with bug fixes and new features.

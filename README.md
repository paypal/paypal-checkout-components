PayPal Checkout
---------------

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/paypal/paypal-checkout) [![Build Status](https://img.shields.io/github/workflow/status/paypal/paypal-sdk-client/build/v4?logo=github&style=flat-square)](https://github.com/paypal/paypal-checkout-components/actions?query=workflow%3Abuild+branch%3Av4) [![dependencies Status](https://david-dm.org/paypal/paypal-checkout/status.svg)](https://david-dm.org/paypal/paypal-checkout) [![devDependencies Status](https://david-dm.org/paypal/paypal-checkout/dev-status.svg)](https://david-dm.org/paypal/paypal-checkout?type=dev)

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[zoid](https://github.com/krakenjs/zoid).

-----
#### [HowTo Videos](docs/videos.md)
#### [Try it in our Demo App](https://developer.paypal.com/demo/checkout)
#### [Learn more in our Dev Docs](https://developer.paypal.com/docs/integration/direct/express-checkout/integration-jsv4/add-paypal-button/)
#### [Upgrade your classic PayPal integration](docs/upgrade.md)
#### [Deep Dive in our YouTube Training](https://www.youtube.com/playlist?list=PLAlKnErU5lvhRl28KciytVHc5b8HS_tYP)
#### [Demo App Source](https://github.com/paypal/paypal-checkout-demo)
-----

### Which Integration is right for me?

- Do you want the **simplest possible PayPal Integration**? If so, you should stick with the [**Basic PayPal Checkout Button**](https://github.com/paypal/paypal-checkout/tree/master/docs/button.md#basic-integration)
   which allows you to just drop a button straight into your page. This will allow your customer  to pay with PayPal, and we'll notify you when they're done.

- Do you want a button which gives you **finely grained control** over your transaction; creating and finalizing transactions from your server
  side using PayPal's REST api? If so you should use the [**Advanced Javascript Integration**](https://github.com/paypal/paypal-checkout/tree/master/docs/button.md#advanced-integration), which will allow you to create
  and finalize the transaction yourself on your server side using the [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/).

- Do you use **React.js, Angular.js or Ember.js** to render your page? If so, you should use the [**React.js, Angular.js or Ember.js Elements**](https://github.com/paypal/paypal-checkout/tree/master/docs/frameworks.md),
  which provide native support for each of these frameworks, so you can drop PayPal Buttons in any of your front-end views.

- Do you have a mark integration? In this case, you should look at the [Mark Integration](https://github.com/paypal/paypal-checkout/tree/master/docs/mark.md) docs to decide how best
  to integrate PayPal Checkout

## [Create a PayPal REST Application](https://youtu.be/mhUg73r3-Vk)

## Usage

1. Add `checkout.v4.js` to your page:

   ```html
   <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
   ```

2. Drop the following component onto your page:

## [PayPal Checkout Button](https://github.com/paypal/paypal-checkout/tree/master/docs/button.md)

[![PayPal Button](https://github.com/paypal/paypal-checkout/blob/master/docs/img/button.png)](https://github.com/paypal/paypal-checkout/tree/master/docs/button.md)

This component renders a PayPal button onto your page, which will take care of opening up PayPal for you and guiding
your customer through the payment process. After the payment is complete, we will notify you using a javascript callback,
and you can take your customer to a success page.

[Integrate the button component](https://github.com/paypal/paypal-checkout/tree/master/docs/button.md)

-----

## Integrating with the PayPal REST API

If you want to use the advanced javascript integrations, you will need a way to create payment tokens on your
server side. The simplest way to do this is using the [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/)

### [Integrating with the PayPal REST API](https://github.com/paypal/paypal-checkout/tree/master/docs/paypal-rest-api.md)

-----

## Development

Please feel free to follow the [Contribution Guidelines](./CONTRIBUTING.md) to contribute to this repository. PRs are welcome, but for major changes please raise an issue first.

### Quick Setup

Set up your env:

```bash
npm install -g flow-typed
npm install
flow-typed install
```

Run tests:

```bash
npm test
```

Build checkout.js:

```bash
npm run build
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

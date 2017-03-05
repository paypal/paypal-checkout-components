PayPal Checkout
---------------

[![Build Status](https://travis-ci.org/paypal/paypal-checkout.svg?branch=master)](https://travis-ci.org/paypal/paypal-checkout)

A set of components allowing easy integration of PayPal Buttons and PayPal Checkout into your site, powered by
[xcomponent](https://github.com/krakenjs/xcomponent).

These components support various levels of integration, depending on your requirements:

- A simple PayPal Button which takes your customer through the payment process end-to-end
- An advanced PayPal Button which allows you to use [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/) to accept and process payments

We also support native React, Angular and Ember components for the PayPal Button.

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

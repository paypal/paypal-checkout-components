# Implement the Checkout Component

The following guide details out how to implement the [zoid](https://github.com/krakenjs/zoid) based popup `Checkout` component.

## Understand the flow

1. The merchant adds the paypal sdk at `https://www.paypal.com/sdk/js?client-id=xyz` to their page in a script tag
2. The merchant renders the smart-payment-buttons using `paypal.Buttons({ ...props }).render('#container')`
3. The sdk renders an iframe on the merchant page containing the PayPal buttons
4. The buyer clicks on the button
5. The button calls `paypal.Checkout({ ...props }).render('body')`
6. The checkout flow is loaded in the popup window.
7. The checkout app calls `window.xprops.payment()` to get an order id (or ec token)
8. The buyer completes the checkout flow
9. The child window calls `window.xprops.onAuthorize()` to return control to the merchant
10. The merchant calls paypal to capture the payment

After the checkout flow is loaded, it is responsible for accepting props from the parent page, and sending callbacks on key events, including when the buyer cancels or approves the transaction.

## Integration Steps

### Add the script tag

Please see https://github.com/paypal/paypal-sdk-client#server for instructions on adding the sdk script to your page. This script will:

- Match the url used by the merchant, in order to avoid re-downloading the script in every iframe or window
- Populate `window.xprops` with any props passed by the merchant, in the child page.

### Ensure iframes are allowed

In certain scenarios the checkout window needs to be loaded in an iframe. This can only be accurately determined on the client side.

#### Allow iframes on server

When `req.query.sdkMeta` is passed, do not send `X-FRAME-OPTIONS` header

#### Validate whether iframes are allowed on the client

On the client side check:

```javascript
if (window !== window.parent && !paypal.allowIframe()) {
    // Show an error page
}
```

### Handle props

#### `payment`

The token will be available in the url as the `token` query param, e.g. `/checkoutnow?token=EC-XYZ`.

Alternatively, the client can call:

```javascript
window.xprops.payment().then(token => {
    ...
});
```

Calling from the client-side is recommended if the token is not needed for a server-side render. This way additional optimizations can be done to pre-render the checkout flow in parallel with (or before) calling the merchant to generate a token.

`payment` may be called multiple times and will yield the same memoized result. By the time the checkout page renders, it is likely that a token will already be pre-cached/memoized.

#### `fundingSource`

`req.query.fundingSource` and `window.xprops.fundingSource` will contain a string representing the funding source clicked on in smart-payment-buttons.

This value may be `paypal`, `venmo`, `credit`, `card`, `elv`, or any of the alt-pay funding sources shown in the smart payment buttons iframe.

The value should be read to determine which flow to direct the user to.

Please see https://github.com/paypal/paypal-sdk-constants for the full list of constants

#### `onAuthorize`

`window.xprops.onAuthorize({ ...data })` should be called when the buyer approves the payment.

`data` should contain the following:

- `intent` - [required] the intent of the transaction (aka payment-action) e.g. sale, authorize, order
- `paymentToken` - [required] the EC- token for the transaction
- `orderID` - [required] the EC- token or order id for the transaction
- `payerID` - [required] the payer id of the buyer

- `paymentID` - [optional] the payment ID for the transaction, if the transaction was created using the payments api
- `billingToken` - [optional] the BA- token for the transaction, if a billing-agreement flow
- `returnUrl`- [optional] the return url of the transaction, if available

#### `onCancel`

`window.xprops.onCancel({ ...data })` should be called when the buyer cancels the payment.

`data` should contain the following:

- `intent` - [required] the intent of the transaction (aka payment-action) e.g. sale, authorize, order
- `paymentToken` - [required] the EC- token for the transaction
- `orderID` - [required] the EC- token or order id for the transaction

- `billingToken` - [optional] the BA- token for the transaction
- `paymentID` - [optional] the payment ID for the transaction, if the transaction was created using the payments api
- `cancelUrl`- [optional] the cancel url of the transaction, if available

#### `onAuth`

`window.xprops.onAuth({ ...data })` should be called any time the buyer's access token changes, including:

- When the app first loads
- When the buyer logs in

`data` should contain the following:

- `accessToken` - [required] the access token of the buyer

`onAuth` will only be available when the checkout flow has been rendered from another `*.paypal.com` domain, to avoid passing the access token to an untrusted domain. 

#### `onShippingChange`

`window.xprops.onShippingChange({ ...data }, { ...actions })` should be called any time the buyer's address or shipping options change, which for member checkout should include the first load. This callback provides the merchant with a window to patch the cart with new amount or shipping option values through the Payments API. With this in mind, the cart and shipping options should be refreshed after this callback is resolved.

`data` should contain the following:

- `paymentToken`: [required] the EC- token for the transaction
- `shipping_address`: [required] Shipping address fields
	- `state`: Shipping address state or province
	- `postal_code`: Shipping address ZIP code or postal code
	- `country`: Shipping address country
- `paymentID` - [optional] the payment ID for the transaction, if the transaction was created using the payments api 
- `billingToken` - [optional] the BA- token for the transaction, if a billing-agreement flow 
- `selected_shipping_method`: [optional] the shipping option selected by the buyer
	- `label`: Custom shipping method label
	- `type`: Shipping method type (`SHIPPING` or `PICKUP`)
	- `amount`: Additional cost for this method
		- `currency_code`: ISO currency code (e.g `USD`)
		- `value`: String-formatted decimal format (e.g '1.00')

`actions` should contain the following:

- `reject` - [required] a function that the merchant will call if they do not support the address or selected shipping option.


#### `commit`

`window.xprops.commit` is a boolean which should be used to decide whether to display a 'pay now' button or a 'continue' button on the review page.

#### `accessToken`

`window.xprops.accessToken().then(accessToken => ...)` should be called if it is present. The resulting access token should be used as the buyer's access token for any authentication.

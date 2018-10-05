# Implement the Checkout Component

The following guide details out how to implement the [zoid](https://github.com/krakenjs/zoid) based popup `Checkout` component.

## Understand the flow

1. The merchant renders the smart-payment-buttons using `paypal.Button.render({ ...props }, '#container')`
2. The checkout script renders an iframe on the merchant page containing the PayPal buttons
3. The buyer clicks on the button
4. The button calls `paypal.Checkout.render({ ...props })`
5. The checkout flow is loaded in the popup window.

After the checkout flow is loaded, it is responsible for accepting props from the parent page, and sending callbacks on key events, including when the buyer cancels or approves the transaction.

## Integration Steps

### Add the script tag

There are two iterations of the script tag:

- `paypal.com/sdk/js` - the payments-sdk script tag. This is the future recommended path for all smart-payment-buttons and checkout integrations.
- `paypalobjects.com/api/checkout.js` - the static script-tag which is hosted on the paypalobjects CDN. This needs to be supported for legacy integrations

The following logic demonstrates how to load the appropriate script tag:

```javascript
function renderScript(req) {

    // If `xcomponent` or `version` is not passed in the url, it's not an incontext integration
    if (!req.query.xcomponent || !req.query.version) {
        return;
    }

    let version = req.query.version;

    // If `version` is `5`, it's a payments-sdk integration
    if (version === '5') {

        // `clientID` is passed as the merchant's REST client id
        let clientID = req.query.clientID;

        // `locale.x` is passed with the locale in the format `xx_YY`, e.g. `en_US`
        let { country, lang } = parseLocale(req.query['locale.x'])

        return (
            <script src={ `/sdk/js?client-id=${ clientID }&locale-country=${ country }&locale-lang=${ lang }&components=checkout` }></script>
        );
    }

    // If `version` begins with `4`, it's a checkout.js integration
    if (version.indexOf('4') === 0) {
        
        // Version can be major (e.g. `4`) or minor (e.g. `4.0.201`)
        // Need to sync the child window with the current version of checkout.js
        let majorVersion = (version ==== '4');

        // `env` is passed with the current env
        let env = req.query.env;

        // `stage` is passed with the current stage
        let stage = req.query.stage;

        return (
            <script src={ `https://www.paypalobjects.com/api/checkout${ majorVersion ? '' : `.${ version }` }.js` } data-no-bridge data-state="ppxo_checkout" data-env={ env } data-stage={ stage }></script>
        );
    }
}
```

### Ensure iframes are allowed

In certain scenarios the checkout window needs to be loaded in an iframe. This can only be determined on the client side.

#### Blanket allow iframes

When `req.query.xcomponent` is passed, do not send `X-FRAME-OPTIONS` header

#### Validate whether iframes are allowed

On the client side check:

```javascript
if (!paypal.allowIframe()) {
    // Show an error page
}
```

### Handle props

#### `fundingSource`

`req.query.fundingSource` and `window.xprops.fundingSource` will contain a string representing the funding source clicked on in smart-payment-buttons.

This value may be `paypal`, `venmo`, `credit`, `card`, `elv`, or any of the alt-pay funding sources shown in the smart payment buttons iframe.

The value should be read to determine which flow to direct the user to.

#### `onAuthorize`

`window.xprops.onAuthorize({ ...data })` should be called when the buyer approves the payment.

`data` should contain the following:

- `paymentToken` - [required] the EC- token for the transaction
- `billingToken` - [optional] the BA- token for the transaction
- `orderID` - [required] the EC- token or order id for the transaction
- `paymentID` - [optional] the payment ID for the transaction, if the transaction was created using the payments api
- `intent` - [required] the intent of the transaction (aka payment-action) e.g. sale, authorize, order
- `returnUrl`- [optional] the return url of the transaction, if available

#### `onCancel`

`window.xprops.onCancel({ ...data })` should be called when the buyer cancels the payment.

`data` should contain the following:

- `paymentToken` - [required] the EC- token for the transaction
- `billingToken` - [optional] the BA- token for the transaction
- `orderID` - [required] the EC- token or order id for the transaction
- `paymentID` - [optional] the payment ID for the transaction, if the transaction was created using the payments api
- `intent` - [required] the intent of the transaction (aka payment-action) e.g. sale, authorize, order
- `cancelUrl`- [optional] the cancel url of the transaction, if available

#### `onAuth`

`window.xprops.onAuth({ ...data })` should be called any time the buyer's access token changes; including on first load of the app.

`data` should contain the following:

- `accessToken` - [required] the access token of the buyer
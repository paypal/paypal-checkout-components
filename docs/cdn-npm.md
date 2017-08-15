# CDN vs NPM

There are two options for installing paypal-checkout:

1. Using the paypalobjects CDN:

   ```html
   <script src="https://www.paypalobjects.com/api/checkout.js"></script>
   
   <script>
       paypal.Button.render({ ... }, '#container');
   </script>
   ```

2. Using NPM:

   ```shell
   npm install paypal-checkout
   ```

   ```javascript
   var paypal = require('paypal-checkout');
   
   paypal.Button.render({ ... }, '#container');
   ```
   
- Any other options (e.g. manually downloading and saving `https://www.paypalobjects.com/api/checkout.js`) are absolutely not supported.
   
- We **strongly recommend** using the CDN approach, for the following reasons:

    1. Any security updates and bug fixes will be instantly available to your users.

    2. Any conversion updates to drive extra sales and revenue through PayPal will be instantly available to your users.

    3. You will get the following site-speed benefits:
       - The CDN script is hosted on Akamai Edge servers, which are geographically distributed for global users
       - The `checkout.js` script is also loaded inside the iframe and popup window for the PayPal Button and Checkout components.
         Loading the script from our CDN means we can load the same script from cache, saving your users bandwidth and extra download time.

    4. Backwards compatibility with previous versions of `checkout.js` is guaranteed.

- You may decide to go with NPM (e.g. if your company's security policy only allows self-hosted javascript files), but please be aware:

    1. Before submitting any bug reports or requesting support, it is your responsibility to update to the latest published version of `checkout.js`

    2. Having a locked version does not guarantee any extra stability:
       - You are likely to quickly get behind the latest version of the script, which recieves the most attention, bug reports, support, etc.
       - Issues arising from communucations between the iframe button and the parent page with an old version of `checkout.js` may be more frequent and difficult to triage

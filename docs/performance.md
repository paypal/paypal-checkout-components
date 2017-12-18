# Performance Best Practices

This doc details how to optimize your loading of checkout.js and rendering of the button with the best possible performance.

### NPM or CDN?

The checkout.js script is avaiable at both at https://www.paypalobjects.com/api/checkout.js and via npm at https://www.npmjs.com/package/paypal-checkout

We **strongly recommend** for performance reasons that you load the script from paypalobjects.

The reason for this is, the script is also loaded inside the button iframe and checkout popup window, in order to communicate with the parent window. Loading from the CDN means your users' browsers will cache the script, otherwise it will be re-downloaded inside the iframe/popup.

Please see [CDN vs NPM](https://github.com/paypal/paypal-checkout/blob/master/docs/cdn-npm.md)

### Minified Script

There is a minified version of the checkout.js script available at https://www.paypalobjects.com/api/checkout.min.js

### Instant Render

If you are rendering the PayPal button immediately on the page, after a server-side render, you should:

1. Load the `checkout.js` script prior to the element you want to render into:

   ```html
   <script src="https://www.paypalobjects.com/api/checkout.js"></script>
   ```

2. Call `paypal.Button.render()` as soon as possible once the container element is ready:

   ```html
   <div id="paypal-button-container"></div>

   <script>
       paypal.Button.render({
           ...
       }, '#paypal-button-container')
   </script>
   ```
   
3. For a bonus performance boost, load the `checkout.js` script asynchronously on a page which preceeds the checkout page. That will have the effect of pre-caching the script, making future loads/renders instantaneous:

   ```html
   <!-- On one of your landing pages or pre-checkout pages -->
   <body>
	...
	
       <script src="https://www.paypalobjects.com/api/checkout.js" async></script>
   </body>
   ```

   
### Delayed Render

If your app is client-side rendered, or there is a user action on the page before showing the PayPal button (like selecting a radio field), you should:

1. Load the `checkout.js` script asynchronously in your page:

   ```html
   <head>
       <script src="https://www.paypalobjects.com/api/checkout.js" async></script>
   </head>
   ```

   Or use javascript to asynchronously load the script:
   
    ```javascript
    <script>
        (function() {
            function loadPayPalCheckout(callback) {
                var PAYPAL_SCRIPT = 'https://www.paypalobjects.com/api/checkout.js';

                var container = document.body || document.head;
                callback = callback || function() {};

                var script = document.createElement('script');
                script.setAttribute('src', PAYPAL_SCRIPT);

                script.onload = function() { callback() };
                script.onerror = function(err) { callback(err) };
					 
                container.appendChild(script);
            }

            loadPayPalCheckout();
        })();
    </script>
    ```

2. Call `paypal.Button.render()` on the client-side render, route-change, or user-action which triggers the button being displayed

   ```html
   <div id="paypal-button-container"></div>

   <script>
       document.querySelector('#myRadioField').addEventListener('click', function() {
           paypal.Button.render({
               ...
           }, '#paypal-button-container')
       });
   </script>
   ```

   Or, to ensure the button is completely loaded by the time it is displayed, render the button in advance in a hidden container, and display it on the page-change or user action:
   
   ```html
   <style>
       #paypal-button-container {
           display: none;
       }
   </style>
   
   <div id="paypal-button-container"></div>
   
   <script>
       paypal.Button.render({
           ...
       }, '#paypal-button-container');
   
       document.querySelector('#myRadioField').addEventListener('click', function() {
           document.querySelector('#paypal-button-container').style.display = 'block';
       });
   </script>
   ```

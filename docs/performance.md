# Performance

This doc details how to optimize your loading of checkout.js and rendering of the button with the best possible performance.

### Instant Render

If you are rendering the PayPal button immediately on the page, after a server-side render, you should:

1. Load the `checkout.js` script synchronously in your `<head>`:

   ```html
   <head>
       <script src="https://www.paypalobjects.com/api/checkout.js"></script>
   </head>
   ```

2. Call `paypal.Button.render()` as soon as possible, once the container element is ready:

   ```html
   <div id="paypal-button-container"></div>

   <script>
       paypal.Button.render({
           ...
       }, '#paypal-button-container')
   </script>
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
                container.appendChild(script);

                script.onload = function() { callback() };
                script.onerror = function(err) { callback(err) };
            }

            loadPayPalCheckout();
        })();
    </script>
    ```

2. Call `paypal.Button.render()` on the client-side render, user-action which triggers the button being displayed

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

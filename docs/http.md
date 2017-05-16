# Http (Ajax) Helper Functions
Our library comes bundled with some functions to aide in AJAX calls.  The libray is located at window.paypal.request.  For the most up to date information look at the <a href="https://github.com/paypal/paypal-checkout/blob/master/src/lib/http.js">source code</a>

## Options
The options for the Http library are located on the <a href="https://github.com/paypal/paypal-checkout/blob/master/src/lib/http.js#L5">RequestOptionsType</a> type.

## API
The following helper methods are exposed for you to use

### `window.paypal.request.get(url, options)`
Sends an XHR GET request to the url given.  Options will override the RequestOptionsType with any properties you give it.

### `window.paypal.request.post(url, data, options)`
Sends an XHR POST request to the url given with the given data.  Options will override the RequestOptionsType with any properties you give it.

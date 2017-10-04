PayPal Checkout API
-------------------

- paypal.Button
- paypal.Promise
- paypal.isEligible
- paypal.request

## paypal.Button

PayPal button component

- `paypal.Button.render(options)` : `Promise<void>`

  Render the button. Accepts button options, returns a **`Promise`** which resolves
  when the button has successfully rendered, or rejects if the button render errors.

  - `options`
  
    - `payment` : `(data, actions) => (token | Promise<token>)`
        
      User defined function, called by checkout.js when the button is clicked. In this function you should make a call to PayPal's
      REST API to create a payment token, and return it wrapped in a promise.
      
      - `actions.payment.create()` : `(createOptions) => (token : Promise<token>)`
          
         Helper function to create a payment by calling the PayPal REST API from the client-side
         
         - `createOptions`
           - `payment` [Payment request object](https://developer.paypal.com/docs/api/payments/#payment_create_request)
             to set up the payment
             
           - `experience` [Payment experience object](https://developer.paypal.com/docs/api/payment-experience/#web-profile_create_request)
             to customize the checkout flow
             
           - `meta`
             - `partner_attribution_id` [Partner attribution ID](https://www.paypal-marketing.com/emarketing/partner/na/portal/integrate_bn_codes.html)
               sent with the payment request
      
    - `onAuthorize` : `(data, actions) => (void | Promise<void>)`
    
       User defined function, called by checkout.js when the buyer has approved the payment.
       
       - `data`
         - `paymentID` The paymentID generated during the call to `payment()`
         - `payerID` The ID of the buyer who approved the payment
         - `returnURL` The return url passed when creating the payment
         
       - `actions.payment.get()` : `() => Promise<PaymentDetails>`
       
         Helper function which calls the PayPal REST API, and returns a promise containing the
         [Payment details object](https://developer.paypal.com/docs/api/payments/#payment_create_response)
         with transaction details, buyer details, etc.
         
       - `actions.payment.execute()` : `() => Promise<PaymentDetails>`
       
         Helper function which calls the PayPal REST API, executes the transaction, and returns a promise containing the
         [Payment details object](https://developer.paypal.com/docs/api/payments/#payment_execute_response)
         with transaction details, buyer details, etc.
         
       - `actions.redirect()` : `Promise<void>`
       
         Helper function to redirect the window to the return url specified when setting up the payment. Returns a promise.
         
    - `onCancel` : `(data, actions) => (void | Promise<void>)`
    
       User defined function, called by checkout.js when the buyer has cancelled the payment.
       
       - `data`
         - `paymentID` The paymentID generated during the call to `payment()`
         - `payerID` The ID of the buyer who approved the payment
         - `cancelURL` The cancel url passed when creating the payment
         
       - `actions.payment.get()` : `() => Promise<PaymentDetails>`
       
         Helper function which calls the PayPal REST API, and returns a promise containing the
         [Payment details object](https://developer.paypal.com/docs/api/payments/#payment_create_response)
         with transaction details, buyer details, etc.

       - `actions.redirect()` : `Promise<void>`
       
         Helper function to redirect the window to the cancel url specified when setting up the payment. Returns a promise.

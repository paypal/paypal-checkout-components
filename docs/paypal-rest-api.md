## Integrating with the PayPal REST API

If you want to use the advanced javascript integration, you will need a way to create payment tokens on your
server side. The simplest way to do this is using the [PayPal Payments REST API](https://developer.paypal.com/docs/api/payments/)

The way this works is:

1. You call [Payment Create](https://developer.paypal.com/docs/api/payments/#payment_create) to create a Payment ID, with all of your payment details
2. You invoke the PayPal Button component to get your buyer's approval for the payment, using this Payment ID
3. You then call [Payment Execute](https://developer.paypal.com/docs/api/payments/#payment_execute) to finalize the transaction

-----

### How to integrate with the REST API

1. Go to [developer.paypal.com/developer/applications](https://developer.paypal.com/developer/applications) and create a **REST API app**, then note down your client id and secret

2. Call `api.paypal.com/v1/oauth2/token` to get a temporary access token

   You'll need:

   - Your app client id (from step 1)
   - Your app secret (from step 1)

   ---

   ```shell
   URL='https://api.paypal.com/v1/oauth2/token';
   CLIENT_ID='E4gg1bkY8HgPXVFuqOeQMXppxgdfJglTkYaez4tLVUnVBeRsgTpVBK9ngxGdqp7';
   SECRET='HyltbozR9LCmWfW61XrUmoMnfctxgDmnbl4WlIDX5pvipzHDB0Y65aZ72tJk7aV';

   curl "$URL" \
     --request POST \
     --user "$CLIENT_ID:$SECRET" \
     --data 'grant_type=client_credentials';
   ```

   The access token will be returned under `access_token` in the json response.

   ```json
   {
     "scope": "https://uri.paypal.com/services/subscriptions https://api.paypal.com/v1/payments/.* https://api.paypal.com/v1/vault/credit-card https://uri.paypal.com/services/applications/webhooks openid https://uri.paypal.com/payments/payouts https://api.paypal.com/v1/vault/credit-card/.*",
     "nonce": "2016-07-06T22:54:44ZDOeMD8yOgBhAtMJGxFVvtoWFEP0zpA8u47VARZwkrIo",
     "access_token": "89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn",
     "token_type": "Bearer",
     "app_id": "APP-1EK098459H112623B",
     "expires_in": 32400
   }
   ```

3. Call `api.paypal.com/v1/payments/payment` to create a transaction

   You'll need:

   - The access token (`access_token` from the response in step 2)
   - The payment details for the transaction you want to create

   ---

   ```shell
   URL='https://api.paypal.com/v1/payments/payment';
   ACCESS_TOKEN='89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn';

   PAYMENT='{
     "intent": "sale",
     "redirect_urls": {
       "return_url": "http://example.com/your_redirect_url.html",
       "cancel_url": "http://example.com/your_cancel_url.html"
     },
     "payer": {
       "payment_method":"paypal"
     },
     "transactions": [
       {
         "amount":{
           "total":"7.47",
           "currency":"USD"
         }
       }
     ]
   }';

   curl "$URL" \
     --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header 'Content-type: application/json' \
     --data "$PAYMENT";
   ```

   The Payment ID will be returned under `id`:

   ```json
   {
     "id": "PAY-0J356327TH335450NK56Y2PQ",
     "intent": "sale",
     "state": "created",
     "payer": {
       "payment_method": "paypal"
     },
     "transactions": [
       {
         "amount": {
           "total": "7.47",
           "currency": "USD"
         },
         "related_resources": []
       }
     ],
     "create_time": "2016-07-06T22:59:10Z",
     "links": [
       {
         "href": "https://api.paypal.com/v1/payments/payment/PAY-0J356327TH335450NK56Y2PQ",
         "rel": "self",
         "method": "GET"
       },
       {
         "href": "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2003069323602984G",
         "rel": "approval_url",
         "method": "REDIRECT"
       },
       {
         "href": "https://api.paypal.com/v1/payments/payment/PAY-0J356327TH335450NK56Y2PQ/execute",
         "rel": "execute",
         "method": "POST"
       }
     ]
   }
   ```

   Here you can see that the `id` is `PAY-0J356327TH335450NK56Y2PQ`. This is the id we need to pass back to use on our front-end.

4. Use the `paypal.Button` component to let the buyer authorize the payment

   You'll need:

   - The Payment ID (`PAY-0J356327TH335450NK56Y2PQ` from `id` from the response in step 3)

   ---

   ```javascript
   paypal.Button.render({

       payment: function() {
           return new paypal.Promise(function(resolve, reject) {

               // Call your server side to get the Payment ID from step 3, then pass it to the resolve callback

               jQuery.post('https://www.my-paypal-store.com/my-api/payment-create')
                   .done(function(data) {
                       resolve(data.paymentID);
                   });
           });
       },

       onAuthorize: function(data) {

           // Call payment execute (see step 5)
       }

   }, '#myContainerElement');
   ```

5. Call `api.paypal.com/v1/payments/payment/PAYMENT-ID/execute` to finalize a transaction

   You'll need:

   - The access token (`access_token` from the response in step 2)
   - The payment id (`data.paymentID` from `onAuthorize` in step 4)
   - The payer id (`data.payerID` from `onAuthorize` in step 4)

   ---

   ```shell
   ACCESS_TOKEN='89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn';
   PAYMENT_ID='PAY-0J356327TH335450NK56Y2PQ';
   PAYER_ID='GSF4567F5DSCGH34';
   URL="https://api.paypal.com/v1/payments/payment/$PAYMENT_ID/execute"

   curl "$URL" \
     --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header 'Content-type: application/json' \
     --data "{\"payer_id\": \"$PAYER_ID\"}";
   ```

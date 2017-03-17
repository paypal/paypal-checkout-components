
module.exports = function(ctx) {
    return `
        <!DOCTYPE html>

        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">

            <title>Paypal Checkout Integration Patterns</title>

            <link rel="stylesheet" href="${ctx.baseURL}/static/css/style.css">

            <script src="https://www.paypalobjects.com/api/checkout.js"></script>

            <script src="https://js.braintreegateway.com/web/3.9.0/js/client.min.js"></script>
            <script src="https://js.braintreegateway.com/web/3.9.0/js/paypal-checkout.min.js"></script>

            <script src="${ctx.baseURL}/static/js/ace.js" type="text/javascript" charset="utf-8"></script>
        </head>

        <body data-csrf="${ ctx.csrf || '' }" data-base-url="${ctx.baseURL}">
            <div id="app" class="app"></div>
            <script src="${ctx.baseURL}/static/js/demo.js"></script>
        </body>
    `;
};

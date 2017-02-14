
module.exports = function(ctx) {
    return `
        <!DOCTYPE html>

        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">

            <title>Paypal Checkout Integration Patterns</title>

            <link rel="stylesheet" href="/checkout/static/css/style.css">

            <script src="https://www.paypalobjects.com/api/checkout.js"></script>

            <script src="/checkout/static/js/braintree.client.min.js"></script>
            <script src="/checkout/static/js/braintree.paypal.min.js"></script>

            <script src="/checkout/static/js/ace.js" type="text/javascript" charset="utf-8"></script>
        </head>

        <body data-csrf="${ctx.csrf}">
            <div id="app" class="app"></div>
            <script src="/checkout/static/js/demo.js"></script>
        </body>
    `;
};

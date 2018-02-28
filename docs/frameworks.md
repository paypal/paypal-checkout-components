# Native Framework Bindings

You can also drop a PayPal Button inline on your page, using a simple `<script>` tag, or with `React.js`, `Angular.js`, or `Ember.js`.
The button will appear exactly where you place it in your HTML.

## Script Tag

```html
<div class="myCart">
    <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

    <script type="application/x-component" data-component="paypal-button">
        {
            client: {
                ...
            },

            payment: function() {
                ...
            },

            commit: true,

            onAuthorize: function(data, actions) {
                ...
            }
        }
    </script>
</div>
```

## React.js Element

```javascript
var MyCartComponent = window.React.createClass({
    render: function() {

        let client = {
            ...
        };

        let payment = () => {
            ...
        };

        let onAuthorize = (data, actions) => {
            ...
        };
		
        let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });

        return (<div className='shoppingCart'>
            <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

            <PayPalButton
                client={client}
                payment={payment}
                commit={true}
                onAuthorize={onAuthorize} />
        </div>);
    }
});
```

## Angular.js Element

```html
<script>
    // Add 'paypal-button' as a dependency for your angular app

    angular.module('myapp', [ 'paypal-button' ])

        .controller('cartController', function($scope) {

            // Add the props needed to your $scope

            $scope.client = {
                ...
            };

            $scope.payment = function() {
                ...
            };

            $scope.onAuthorize = function(data) {
                ...
            };
        });
</script>

<div class="shoppingCart" ng-controller="cartController">
    <p>Buy <strong>Full Body Lobster Onesie - $24.99</strong> now!</p>

    <paypal-button
        client="client"
        payment="payment"
        commit="true"
        on-authorize="onAuthorize">
    </paypal-button>
</div>
```

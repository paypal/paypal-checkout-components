
import { PayPalCheckout } from '../components';

window.paypal = window.paypal || {};
window.paypal.checkout = window.paypal.checkout || {};

let component;

window.paypal.checkout.setup = function(id, options) {
    options = options || {};

    component = PayPalCheckout.init({

    });

    if (options.container) {

        // Render a button to the container

        let button = document.createElement('button');
        button.innerText = 'PayPal Checkout';

        document.getElementById(options.container).appendChild(button);

        // Handle click behaviour

        if (options.click) {

            button.addEventListener('click', event => {
                event.preventDefault();

                options.click.call();
            });

        } else {

            component.hijackButton(button);
        }


    }
};

window.paypal.checkout.initXO = function() {

};

window.paypal.checkout.startFlow = function() {

};

window.paypal.checkout.closeFlow = function() {

};

window.paypalCheckoutReady = function(method) {
    method();
};
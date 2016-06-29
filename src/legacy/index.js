
import { PayPalCheckout } from '../components';

var component;

var config = {
    env: 'production'
};

function matchToken(token) {

    if (!token) {
        return;
    }

    if (token.match(/^(EC-)?[A-Z0-9]{17}$/)) {
        return token;
    }

    let match = token.match(/token=((EC-)?[A-Z0-9]{17})$/);

    if (match) {
        return match[1];
    }
}

function getToken(callback) {

    function cb() {
        window.paypal.checkout.initXO = initXO;
        window.paypal.checkout.startFlow = startFlow;
        window.paypal.checkout.closeFlow = closeFlow;

        callback.apply(this, arguments);
    }

    window.paypal.checkout.initXO = function() {
        // pass
    };

    window.paypal.checkout.startFlow = token => {
        cb(null, matchToken(token));
    };

    window.paypal.checkout.closeFlow = function() {
        cb(new Error('Close Flow Called'));
        component.close();
    };
}

function drawButton(container) {

    let button = document.createElement('button');
    button.innerText = 'PayPal Checkout';

    document.getElementById(container).appendChild(button);

    return button;
}

function initPayPalCheckout(props = {}) {

    component = PayPalCheckout.init({

        env: config.env,

        onPaymentAuthorize({ returnUrl, token, payerID }) {
            setTimeout(function() {
                window.location = `${returnUrl}?token=${token}&payerID=${payerID}`;
            }, 50);
        },

        onCancel({ cancelUrl, token }) {
            setTimeout(function() {
                window.location = `${cancelUrl}?token=${token}`;
            }, 50);
        },

        ...props
    });

    return component;
}

function setup(id, options) {
    options = options || {};
    config.env = options.environment;

    if (options.container) {

        // Render a button to the container

        let button = drawButton(options.container);

        // Handle click behaviour

        if (options.click) {

            button.addEventListener('click', event => {
                event.preventDefault();

                initPayPalCheckout({
                    env: options.environment,
                    getToken
                }).render();

                options.click.call();
            });

        } else {

            initPayPalCheckout({
                env: options.environment
            }).hijackButton(button);
        }
    }
}

function initXO() {
    initPayPalCheckout({
        getToken
    }).render();
}

function startFlow(token) {
    initPayPalCheckout({
        token: matchToken(token)
    }).render();
}

function closeFlow() {
    component.close();
}

let documentLoaded = document.readyState === 'complete' || document.readyState === 'loaded';

function onDocumentReady(method) {

    if (documentLoaded) {
        return method();
    }

    return document.addEventListener('DOMContentLoaded', event => {
        documentLoaded = true;
        return method();
    });
}

if (window.paypalCheckoutReady instanceof Function) {
    onDocumentReady(window.paypalCheckoutReady);
}

onDocumentReady(() => {
    let buttons = document.querySelectorAll('[data-paypal-button]');

    for (let button of buttons) {

        let env = button.attributes['data-env'] && button.attributes['data-env'].value;

        if (!env && button.attributes['data-sandbox']) {
            env = 'sandbox';
        }

        initPayPalCheckout({ env }).hijackButton(button);
    }
});

window.paypal = window.paypal || {};
window.paypal.checkout = window.paypal.checkout || {};

window.paypal.checkout.setup = setup;
window.paypal.checkout.initXO = initXO;
window.paypal.checkout.startFlow = startFlow;

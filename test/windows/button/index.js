
import paypal from 'src/index';
import '../../tests/common';

function renderCheckout() {
    paypal.Checkout.renderTo(window.top.frames[0], {

        payment: window.xprops.payment,
        onAuthorize(data, actions) {

            return window.xprops.onAuthorize({
                ...data,

                payment: {}

            }, {
                ...actions,

                payment: {
                    execute() {
                        // pass
                    },

                    get() {
                        return {};
                    }
                },

                restart() {
                    renderCheckout();
                }
            });
        },

        onAuth() {
            // pass
        },

        onCancel: window.xprops.onCancel,
        commit: window.xprops.commit,
        locale: window.xprops.locale,
        testAction: window.xprops.testAction
    });
}

document.querySelector('#button').addEventListener('click', event => {
    renderCheckout();
});




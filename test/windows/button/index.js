
import paypal from 'src/index';
import '../../tests/common';

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    window.console.log.apply(window.console, arguments);
};

function renderCheckout() {
    paypal.Checkout.renderTo(window.parent, {

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





// window.mockDomain = 'mock://www.paypal.com';

import paypal from 'src/index';
import './tests/common';

window.console.karma = function() {
    let karma = window.karma || (window.top && window.top.karma) || (window.opener && window.opener.karma);
    if (karma) {
        karma.log('debug', arguments);
    }
    window.console.log.apply(window.console, arguments);
};

document.querySelector('#button').addEventListener('click', event => {

    paypal.Checkout.renderTo(window.parent, {

        payment: window.xprops.payment,
        onAuthorize(data, actions) {

            return window.xprops.onAuthorize({
                ...data,

                payment: {}

            }, {
                payment: {
                    execute() {
                        // pass
                    },

                    get() {
                        return {};
                    }
                }
            });
        },
        onCancel: window.xprops.onCancel,
        commit: window.xprops.commit,
        locale: window.xprops.locale,
        testAction: window.xprops.testAction
    });
});




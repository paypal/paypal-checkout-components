/* eslint import/no-commonjs: off, flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

const postRobotGlobals = require('@krakenjs/post-robot/globals');
const zoidGlobals = require('@krakenjs/zoid/globals');

module.exports = {

    __ZOID__: {
        ...zoidGlobals.__ZOID__,
        __DEFAULT_CONTAINER__: true,
        __DEFAULT_PRERENDER__: true,
        __FRAMEWORK_SUPPORT__: true,
        __SCRIPT_NAMESPACE__:  true

    },

    __POST_ROBOT__: {
        ...postRobotGlobals.__POST_ROBOT__,
        __IE_POPUP_SUPPORT__: false,
        __SCRIPT_NAMESPACE__: true
    },

    __PAYPAL_CHECKOUT__: {
        __REMEMBERED_FUNDING__: [],
        __URI__:                {
            __CHECKOUT__:       '/checkoutnow',
            __BUTTONS__:        '/smart/buttons',
            __MENU__:           '/smart/menu',
            __QRCODE__:         '/smart/qrcode',
            __INSTALLMENTS__:   '/smart/installments',
            __MODAL__:          '/smart/modal',
            __CARD_FIELDS__:    '/smart/card-fields',
            __CARD_FIELD__:     '/smart/card-field',
            __WALLET__:         '/smart/wallet',
            __PAYMENT_FIELDS__: '/altpayfields'
        }
    }
};

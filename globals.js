/* eslint import/no-commonjs: off, flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

const postRobotGlobals = require("@krakenjs/post-robot/globals");
const zoidGlobals = require("@krakenjs/zoid/globals");

module.exports = {
  __ZOID__: {
    ...zoidGlobals.__ZOID__,
    __DEFAULT_CONTAINER__: true,
    __DEFAULT_PRERENDER__: true,
    __FRAMEWORK_SUPPORT__: true,
    __SCRIPT_NAMESPACE__: true,
  },

  __POST_ROBOT__: {
    ...postRobotGlobals.__POST_ROBOT__,
    __IE_POPUP_SUPPORT__: false,
    __SCRIPT_NAMESPACE__: true,
  },

  // v6 (core-web-sdk) PayPal Firebase projects, matching websdknodeweb's
  // relay token endpoint: local/stage -> dev52, sandbox -> dcg18, production ->
  // dcg04 (websdknodeweb server/config.ts). A Firebase web apiKey is a public
  // client identifier; access is governed by RTDB rules plus the custom token.
  // Values from core-web-sdk/.env.{local,sandbox,production}.
  __FIREBASE__: {
    __PRODUCTION__: {
      apiKey: "AIzaSyAiR0UNJRDFc3ZTFMTMz8y82NzrMpLGnyw",
      authDomain: "dcg04-lsp-dmz-ppcp-web-sdk.firebaseapp.com",
      databaseURL: "https://dcg04-smart-payment-buttons-rtdb.firebaseio.com",
      projectId: "dcg04-lsp-dmz-ppcp-web-sdk",
      storageBucket: "dcg04-lsp-dmz-ppcp-web-sdk.firebasestorage.app",
      messagingSenderId: "883207152968",
      appId: "1:883207152968:web:1b85104b451c81b40bbf7d",
    },
    __SANDBOX__: {
      apiKey: "AIzaSyCSn0ilJtKQYbLbDglGZRtxEtmDDNGutGA",
      authDomain: "dcg18-sb-hrzdmz-ppcp-web-sdk.firebaseapp.com",
      databaseURL: "https://dcg18-smart-payment-buttons-rtdb.firebaseio.com",
      projectId: "dcg18-sb-hrzdmz-ppcp-web-sdk",
      storageBucket: "dcg18-sb-hrzdmz-ppcp-web-sdk.firebasestorage.app",
      messagingSenderId: "707836249070",
      appId: "1:707836249070:web:36b515c96b6fc8709804ff",
    },
    __STAGE__: {
      apiKey: "AIzaSyCmcGArF4nO3MF_IxBf3NKDTjOhffAg6vs",
      authDomain: "dev52-test-apps-ppcp-web-sdk.firebaseapp.com",
      databaseURL: "https://dev52-smart-payment-buttons-rtdb.firebaseio.com",
      projectId: "dev52-test-apps-ppcp-web-sdk",
      storageBucket: "dev52-test-apps-ppcp-web-sdk.firebasestorage.app",
      messagingSenderId: "856463611148",
      appId: "1:856463611148:web:e25395afe382e16ed4e529",
    },
  },

  __PAYPAL_CHECKOUT__: {
    __REMEMBERED_FUNDING__: [],
    __URI__: {
      __CHECKOUT__: "/checkoutnow",
      __BUTTONS__: "/smart/buttons",
      __SAVED_PAYMENT_METHODS__: "/smart/saved-payment-methods",
      __PIXEL__: "/smart/pixel",
      __MENU__: "/smart/menu",
      __QRCODE__: "/smart/qrcode",
      __VENMO__: "/smart/checkout/venmo/popup",
      __INSTALLMENTS__: "/smart/installments",
      __MODAL__: "/smart/modal",
      __CARD_FIELDS__: "/smart/card-fields",
      __CARD_FIELD__: "/smart/card-field",
      __WALLET__: "/smart/wallet",
      __PAYMENT_FIELDS__: "/altpayfields",
      __MESSAGE_MODAL__:
        "https://www.paypalobjects.com/upstream/bizcomponents/js/modal.js",
    },
  },
};

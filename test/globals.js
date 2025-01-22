/* eslint import/no-commonjs: off, flowtype/require-valid-file-annotation: off, flowtype/require-return-type: off */

const fundingEligibility = {
  bancontact: {
    eligible: false,
  },
  card: {
    eligible: true,
    isPayPalBranded: true,

    vendors: {
      visa: {
        eligible: true,
      },
      mastercard: {
        eligible: true,
      },
      amex: {
        eligible: true,
      },
      discover: {
        eligible: true,
      },
      hiper: {
        eligible: false,
      },
      elo: {
        eligible: false,
      },
      jcb: {
        eligible: false,
      },
    },
  },
  credit: {
    eligible: true,
  },
  paylater: {
    eligible: false,
  },
  sepa: {
    eligible: false,
  },
  eps: {
    eligible: false,
  },
  giropay: {
    eligible: false,
  },
  ideal: {
    eligible: false,
  },
  mybank: {
    eligible: false,
  },
  p24: {
    eligible: false,
  },
  paypal: {
    eligible: true,
  },
  sofort: {
    eligible: false,
  },
  applepay: {
    eligible: true,
  },
  venmo: {
    eligible: false,
  },
  wechatpay: {
    eligible: false,
  },
  oxxo: {
    eligible: false,
  },
  boleto: {
    eligible: false,
  },
  boletobancario: {
    eligible: false,
  },
  multibanco: {
    eligible: false,
  },
  payu: {
    eligible: false,
  },
  blik: {
    eligible: false,
  },
  trustly: {
    eligible: false,
  },
  mercadopago: {
    eligible: false,
  },
  itau: {
    eligible: false,
  },
  satispay: {
    eligible: false,
  },
  paidy: {
    eligible: false,
  },
};

function getTestGlobals(productionGlobals) {
  return {
    ...productionGlobals,
    __PAYPAL_CHECKOUT__: {
      __URI__: {
        __CHECKOUT__: `/base/test/integration/windows/checkout/index.htm?checkouturl=true`,
        __BUTTONS__: `/base/test/integration/windows/button/index.htm`,
        __PIXEL__: `/base/test/integration/windows/pixel/index.htm`,
        __MENU__: `/base/test/integration/windows/menu/index.htm`,
        __CARD_FIELDS__: `/base/test/integration/windows/card-fields/index.htm`,
        __CARD_FIELD__: `/base/test/integration/windows/card-field/index.htm`,
        __WALLET__: `/base/test/integration/windows/wallet/index.htm`,
        __PAYMENT_FIELDS__: `/base/test/integration/windows/paymentfields/index.htm`,
        __MESSAGE_MODAL__: `/base/test/integration/windows/button/modal.js`,
      },
    },

    __FUNDING_ELIGIBILITY__: () =>
      `window.__TEST_FUNDING_ELIGIBILITY__ || ${JSON.stringify(
        fundingEligibility
      )}`,

    __PROTOCOL__: "http",
    __PORT__: 8000,
    __STAGE_HOST__: "sandbox.paypal.com",
    __HOST__: "test.paypal.com",
    __HOSTNAME__: "test.paypal.com",
    __SDK_HOST__: "test.paypal.com",
    __PATH__: "/sdk/js",
    __VERSION__: "1.0.55",
    __NAMESPACE__: "paypal",
    __COMPONENTS__: ["buttons"],
    __CORRELATION_ID__: "abc123",
    __PAYPAL_DOMAIN__: "mock://www.paypal.com",
    __PAYPAL_API_DOMAIN__: "mock://sandbox.paypal.com",
    __DISABLE_SET_COOKIE__: false,
    __EXPERIMENTATION__: {
      __EXPERIENCE__: "1432",
      __TREATMENT__: "1122",
    },
    __FIRST_RENDER_EXPERIMENTS__: () =>
      `window.__TEST_FIRST_RENDER_EXPERIMENTS__ || null`,

    __ZOID__: {
      ...productionGlobals.__ZOID__,
      __SCRIPT_NAMESPACE__: false,
    },

    __POST_ROBOT__: {
      ...productionGlobals.__POST_ROBOT__,
      __SCRIPT_NAMESPACE__: false,
    },
  };
}

module.exports = {
  fundingEligibility,
  getTestGlobals,
};

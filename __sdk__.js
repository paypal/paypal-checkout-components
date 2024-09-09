/* @flow */
/* eslint unicorn/filename-case: 0, import/unambiguous: 0, import/no-commonjs: 0 */

const { FUNDING, CARD } = require("@paypal/sdk-constants");

const globals = require("./packages/checkout-components/globals");

const SMART_FUNDING_SOURCES = [
  FUNDING.PAYPAL,
  FUNDING.VENMO,
  FUNDING.ITAU,
  FUNDING.CREDIT,
  FUNDING.PAYLATER,
  FUNDING.APPLEPAY,
  FUNDING.IDEAL,
  FUNDING.SEPA,
  FUNDING.BANCONTACT,
  FUNDING.GIROPAY,
  FUNDING.EPS,
  FUNDING.SOFORT,
  FUNDING.MYBANK,
  FUNDING.BLIK,
  FUNDING.P24,
  FUNDING.WECHATPAY,
  FUNDING.PAYU,
  FUNDING.TRUSTLY,
  FUNDING.OXXO,
  FUNDING.BOLETO,
  FUNDING.BOLETOBANCARIO,
  FUNDING.MULTIBANCO,
  FUNDING.MERCADOPAGO,
  FUNDING.SATISPAY,
  FUNDING.PAIDY,
  FUNDING.CARD,
];

const SMART_CARDS = [
  CARD.VISA,
  CARD.MASTERCARD,
  CARD.AMEX,
  CARD.DISCOVER,
  CARD.HIPER,
  CARD.ELO,
  CARD.JCB,
];

module.exports = {
  buttons: {
    entry: "./packages/sdk-interface/interface/button",
    setupHandler: "setupButtons",
    globals,
    fundingSources: SMART_FUNDING_SOURCES,
    cards: SMART_CARDS,
  },
  marks: {
    entry: "./packages/sdk-interface/interface/marks",
    globals,
    fundingSources: SMART_FUNDING_SOURCES,
    cards: SMART_CARDS,
  },
  wallet: {
    entry: "./packages/sdk-interface/interface/wallet",
    globals,
  },
  // in process of being renamed to fastlane
  connect: {
    entry: "./packages/sdk-interface/connect/interface",
  },
  fastlane: {
    entry: "./packages/sdk-interface/connect/interface",
  },
  // @deprecated - renamed to payment-fields to be removed
  fields: {
    entry: "./packages/sdk-interface/interface/fields",
    globals,
    fundingSources: SMART_FUNDING_SOURCES,
    cards: SMART_CARDS,
  },
  "payment-fields": {
    entry: "./packages/sdk-interface/interface/payment-fields",
    globals,
    fundingSources: SMART_FUNDING_SOURCES,
    cards: SMART_CARDS,
  },
  "card-fields": {
    entry: "./packages/sdk-interface/interface/card-fields",
    globals,
  },
  "hosted-buttons": {
    entry: "./packages/sdk-interface/interface/hosted-buttons",
    globals,
  },
  "shopper-insights": {
    entry: "./packages/sdk-interface/shopper-insights/interface",
  },
};

/* @flow */
/* eslint unicorn/filename-case: 0, import/unambiguous: 0, import/no-commonjs: 0 */

const { FUNDING, CARD } = require('@paypal/sdk-constants');

const globals = require('./globals');

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
    FUNDING.ZIMPLER,
    FUNDING.WECHATPAY,
    FUNDING.PAYU,
    FUNDING.VERKKOPANKKI,
    FUNDING.TRUSTLY,
    FUNDING.OXXO,
    FUNDING.BOLETO,
    FUNDING.MULTIBLANCO,
    FUNDING.MAXIMA,
    FUNDING.MERCADOPAGO,
    FUNDING.CARD
];

const SMART_CARDS = [
    CARD.VISA,
    CARD.MASTERCARD,
    CARD.AMEX,
    CARD.DISCOVER,
    CARD.HIPER,
    CARD.ELO,
    CARD.JCB
];

module.exports = {
    'buttons': {
        entry:          './src/interface/button',
        setupHandler:   'setupButtons',
        globals,
        fundingSources: SMART_FUNDING_SOURCES,
        cards:          SMART_CARDS
    },
    'marks': {
        entry:          './src/interface/marks',
        globals,
        fundingSources: SMART_FUNDING_SOURCES,
        cards:          SMART_CARDS
    },
    'wallet': {
        entry: './src/interface/wallet',
        globals
    },
    // @deprecated - renamed to payment-fields to be removed
    'fields': {
        entry:          './src/interface/fields',
        globals,
        fundingSources: SMART_FUNDING_SOURCES,
        cards:          SMART_CARDS
    },
    'payment-fields': {
        entry:          './src/interface/payment-fields',
        globals,
        fundingSources: SMART_FUNDING_SOURCES,
        cards:          SMART_CARDS
    },
    'card-fields': {
        entry:          './src/interface/card-fields',
        globals
    }
};

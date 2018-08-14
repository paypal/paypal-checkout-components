/* @flow */

import { objFilter } from 'belter/src';

import { FUNDING } from '../constants';

export const FUNDING_PRIORITY = [
    FUNDING.PAYPAL,
    FUNDING.VENMO,
    FUNDING.CREDIT,
    FUNDING.IDEAL,
    FUNDING.SEPA,
    FUNDING.BANCONTACT,
    FUNDING.GIROPAY,
    FUNDING.EPS,
    FUNDING.SOFORT,
    FUNDING.MYBANK,
    FUNDING.P24,
    FUNDING.ZIMPLER,
    FUNDING.WECHATPAY,
    FUNDING.CARD
];

export let FUNDING_CONFIG = objFilter({
    [ FUNDING.PAYPAL ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.paypal.eligible)
        ? require('./paypal').PAYPAL_CONFIG : null,

    [ FUNDING.VENMO ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.venmo.eligible)
        ? require('./venmo').VENMO_CONFIG : null,

    [ FUNDING.CREDIT ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.credit.eligible)
        ? require('./credit').CREDIT_CONFIG : null,

    [ FUNDING.CARD ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.card.eligible)
        ? require('./card').CARD_CONFIG : null,

    [ FUNDING.IDEAL ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.ideal.eligible)
        ? require('./ideal').IDEAL_CONFIG : null,

    [ FUNDING.SEPA ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.sepa.eligible)
        ? require('./sepa').SEPA_CONFIG : null,

    [ FUNDING.BANCONTACT ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.bancontact.eligible)
        ? require('./bancontact').BANCONTACT_CONFIG : null,

    [ FUNDING.GIROPAY ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.giropay.eligible)
        ? require('./giropay').GIROPAY_CONFIG : null,

    [ FUNDING.SOFORT ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.sofort.eligible)
        ? require('./sofort').SOFORT_CONFIG : null,

    [ FUNDING.EPS ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.eps.eligible)
        ? require('./eps').EPS_CONFIG : null,

    [ FUNDING.MYBANK ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.mybank.eligible)
        ? require('./mybank').MYBANK_CONFIG : null,

    [ FUNDING.P24 ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.p24.eligible)
        ? require('./p24').P24_CONFIG : null,

    [ FUNDING.ZIMPLER ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.zimpler.eligible)
        ? require('./zimpler').ZIMPLER_CONFIG : null,

    [ FUNDING.WECHATPAY ]: (!__PAYPAL_CHECKOUT__.__TREE_SHAKE__ || __paypal_checkout__.serverConfig.fundingEligibility.wechatpay.eligible)
        ? require('./wechatpay').WECHATPAY_CONFIG : null
});

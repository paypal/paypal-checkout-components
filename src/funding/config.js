/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';
import { inlineMemoize } from 'belter/src';

import { type FundingSourceConfig } from './common';
import { getPayPalConfig } from './paypal';
import { getVenmoConfig } from './venmo';
import { getCreditConfig } from './credit';
import { getCardConfig } from './card';
import { getIdealConfig } from './ideal';
import { getSepaConfig } from './sepa';
import { getBancontactConfig } from './bancontact';
import { getGiropayConfig } from './giropay';
import { getSofortConfig } from './sofort';
import { getEpsConfig } from './eps';
import { getMybankConfig } from './mybank';
import { getP24Config } from './p24';
import { getZimplerConfig } from './zimpler';
import { getWechatpayConfig } from './wechatpay';

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

export function getFundingConfig() : { [$Values<typeof FUNDING>] : ?FundingSourceConfig } {
    return inlineMemoize(getFundingConfig, () => {
        return {
            [ FUNDING.PAYPAL ]:     (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.paypal     && __paypal_checkout__.serverConfig.fundingEligibility.paypal.eligible)) ? getPayPalConfig() : null,
            [ FUNDING.VENMO ]:      (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.venmo      && __paypal_checkout__.serverConfig.fundingEligibility.venmo.eligible)) ? getVenmoConfig() : null,
            [ FUNDING.CREDIT ]:     (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.credit     && __paypal_checkout__.serverConfig.fundingEligibility.credit.eligible)) ? getCreditConfig() : null,
            [ FUNDING.CARD ]:       (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card       && __paypal_checkout__.serverConfig.fundingEligibility.card.eligible)) ? getCardConfig() : null,
            [ FUNDING.IDEAL ]:      (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.ideal      && __paypal_checkout__.serverConfig.fundingEligibility.ideal.eligible)) ? getIdealConfig() : null,
            [ FUNDING.SEPA ]:       (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.sepa       && __paypal_checkout__.serverConfig.fundingEligibility.sepa.eligible)) ? getSepaConfig() : null,
            [ FUNDING.BANCONTACT ]: (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.bancontact && __paypal_checkout__.serverConfig.fundingEligibility.bancontact.eligible)) ? getBancontactConfig() : null,
            [ FUNDING.GIROPAY ]:    (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.giropay    && __paypal_checkout__.serverConfig.fundingEligibility.giropay.eligible)) ? getGiropayConfig() : null,
            [ FUNDING.SOFORT ]:     (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.sofort     && __paypal_checkout__.serverConfig.fundingEligibility.sofort.eligible)) ? getSofortConfig() : null,
            [ FUNDING.EPS ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.eps        && __paypal_checkout__.serverConfig.fundingEligibility.eps.eligible)) ? getEpsConfig() : null,
            [ FUNDING.MYBANK ]:     (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.mybank     && __paypal_checkout__.serverConfig.fundingEligibility.mybank.eligible)) ? getMybankConfig() : null,
            [ FUNDING.P24 ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.p24        && __paypal_checkout__.serverConfig.fundingEligibility.p24.eligible)) ? getP24Config() : null,
            [ FUNDING.ZIMPLER ]:    (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.zimpler    && __paypal_checkout__.serverConfig.fundingEligibility.zimpler.eligible)) ? getZimplerConfig() : null,
            [ FUNDING.WECHATPAY ]:  (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.wechatpay  && __paypal_checkout__.serverConfig.fundingEligibility.wechatpay.eligible)) ? getWechatpayConfig() : null
        };
    });
}

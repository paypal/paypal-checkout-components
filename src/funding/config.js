/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';
import { inlineMemoize } from 'belter/src';

import { type FundingSourceConfig } from './common';
import { getPayPalConfig } from './paypal';
import { getVenmoConfig } from './venmo';
import { getItauConfig } from './itau';
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
import { getPayuConfig } from './payu';
import { getVerkkopankkiConfig } from './verkkopankki';
import { getBlikConfig } from './blik';
import { getTrustlyConfig } from './trustly';
import { getOxxoConfig } from './oxxo';
import { getBoletoConfig } from './boleto';
import { getMaximaConfig } from './maxima';

export const FUNDING_PRIORITY = [
    FUNDING.PAYPAL,
    FUNDING.VENMO,
    FUNDING.ITAU,
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
    FUNDING.PAYU,
    FUNDING.VERKKOPANKKI,
    FUNDING.BLIK,
    FUNDING.TRUSTLY,
    FUNDING.OXXO,
    FUNDING.BOLETO,
    FUNDING.MAXIMA,
    FUNDING.CARD
];

export function getFundingConfig() : { [$Values<typeof FUNDING>] : ?FundingSourceConfig } {
    return inlineMemoize(getFundingConfig, () => {
        return {
            [ FUNDING.PAYPAL ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.paypal         && __paypal_checkout__.serverConfig.fundingEligibility.paypal.eligible)) ? getPayPalConfig() : null,
            [ FUNDING.VENMO ]:          (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.venmo          && __paypal_checkout__.serverConfig.fundingEligibility.venmo.eligible)) ? getVenmoConfig() : null,
            [ FUNDING.ITAU ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.itau           && __paypal_checkout__.serverConfig.fundingEligibility.itau.eligible)) ? getItauConfig() : null,
            [ FUNDING.CREDIT ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.credit         && __paypal_checkout__.serverConfig.fundingEligibility.credit.eligible)) ? getCreditConfig() : null,
            [ FUNDING.CARD ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.card           && __paypal_checkout__.serverConfig.fundingEligibility.card.eligible)) ? getCardConfig() : null,
            [ FUNDING.IDEAL ]:          (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.ideal          && __paypal_checkout__.serverConfig.fundingEligibility.ideal.eligible)) ? getIdealConfig() : null,
            [ FUNDING.SEPA ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.sepa           && __paypal_checkout__.serverConfig.fundingEligibility.sepa.eligible)) ? getSepaConfig() : null,
            [ FUNDING.BANCONTACT ]:     (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.bancontact     && __paypal_checkout__.serverConfig.fundingEligibility.bancontact.eligible)) ? getBancontactConfig() : null,
            [ FUNDING.GIROPAY ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.giropay        && __paypal_checkout__.serverConfig.fundingEligibility.giropay.eligible)) ? getGiropayConfig() : null,
            [ FUNDING.SOFORT ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.sofort         && __paypal_checkout__.serverConfig.fundingEligibility.sofort.eligible)) ? getSofortConfig() : null,
            [ FUNDING.EPS ]:            (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.eps            && __paypal_checkout__.serverConfig.fundingEligibility.eps.eligible)) ? getEpsConfig() : null,
            [ FUNDING.MYBANK ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.mybank         && __paypal_checkout__.serverConfig.fundingEligibility.mybank.eligible)) ? getMybankConfig() : null,
            [ FUNDING.P24 ]:            (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.p24            && __paypal_checkout__.serverConfig.fundingEligibility.p24.eligible)) ? getP24Config() : null,
            [ FUNDING.PAYU ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.payu           && __paypal_checkout__.serverConfig.fundingEligibility.payu.eligible)) ? getPayuConfig() : null,
            [ FUNDING.VERKKOPANKKI ]:   (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.verkkopankki   && __paypal_checkout__.serverConfig.fundingEligibility.verkkopankki.eligible)) ? getVerkkopankkiConfig() : null,
            [ FUNDING.BLIK ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.blik           && __paypal_checkout__.serverConfig.fundingEligibility.blik.eligible)) ? getBlikConfig() : null,
            [ FUNDING.TRUSTLY ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.giropay        && __paypal_checkout__.serverConfig.fundingEligibility.trustly.eligible)) ? getTrustlyConfig() : null,
            [ FUNDING.ZIMPLER ]:        (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.zimpler        && __paypal_checkout__.serverConfig.fundingEligibility.zimpler.eligible)) ? getZimplerConfig() : null,
            [ FUNDING.WECHATPAY ]:      (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.wechatpay      && __paypal_checkout__.serverConfig.fundingEligibility.wechatpay.eligible)) ? getWechatpayConfig() : null,
            [ FUNDING.OXXO ]:           (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.oxxo           && __paypal_checkout__.serverConfig.fundingEligibility.oxxo.eligible)) ? getOxxoConfig() : null,
            [ FUNDING.BOLETO ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.boleto         && __paypal_checkout__.serverConfig.fundingEligibility.boleto.eligible)) ? getBoletoConfig() : null,
            [ FUNDING.MAXIMA ]:         (!__TREE_SHAKE__ || (__paypal_checkout__.serverConfig.fundingEligibility.maxima         && __paypal_checkout__.serverConfig.fundingEligibility.maxima.eligible)) ? getMaximaConfig() : null
        };
    });
}

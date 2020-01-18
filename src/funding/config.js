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

export function getFundingConfig() : { [$Values<typeof FUNDING>] : ?FundingSourceConfig } {
    return inlineMemoize(getFundingConfig, () => {
        return {
            [ FUNDING.PAYPAL ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.paypal         && __FUNDING_ELIGIBILITY__.paypal.eligible)) ? getPayPalConfig() : null,
            [ FUNDING.VENMO ]:          (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.venmo          && __FUNDING_ELIGIBILITY__.venmo.eligible)) ? getVenmoConfig() : null,
            [ FUNDING.ITAU ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.itau           && __FUNDING_ELIGIBILITY__.itau.eligible)) ? getItauConfig() : null,
            [ FUNDING.CREDIT ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.credit         && __FUNDING_ELIGIBILITY__.credit.eligible)) ? getCreditConfig() : null,
            [ FUNDING.CARD ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.card           && __FUNDING_ELIGIBILITY__.card.eligible)) ? getCardConfig() : null,
            [ FUNDING.IDEAL ]:          (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.ideal          && __FUNDING_ELIGIBILITY__.ideal.eligible)) ? getIdealConfig() : null,
            [ FUNDING.SEPA ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.sepa           && __FUNDING_ELIGIBILITY__.sepa.eligible)) ? getSepaConfig() : null,
            [ FUNDING.BANCONTACT ]:     (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.bancontact     && __FUNDING_ELIGIBILITY__.bancontact.eligible)) ? getBancontactConfig() : null,
            [ FUNDING.GIROPAY ]:        (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.giropay        && __FUNDING_ELIGIBILITY__.giropay.eligible)) ? getGiropayConfig() : null,
            [ FUNDING.SOFORT ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.sofort         && __FUNDING_ELIGIBILITY__.sofort.eligible)) ? getSofortConfig() : null,
            [ FUNDING.EPS ]:            (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.eps            && __FUNDING_ELIGIBILITY__.eps.eligible)) ? getEpsConfig() : null,
            [ FUNDING.MYBANK ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.mybank         && __FUNDING_ELIGIBILITY__.mybank.eligible)) ? getMybankConfig() : null,
            [ FUNDING.P24 ]:            (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.p24            && __FUNDING_ELIGIBILITY__.p24.eligible)) ? getP24Config() : null,
            [ FUNDING.PAYU ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.payu           && __FUNDING_ELIGIBILITY__.payu.eligible)) ? getPayuConfig() : null,
            [ FUNDING.VERKKOPANKKI ]:   (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.verkkopankki   && __FUNDING_ELIGIBILITY__.verkkopankki.eligible)) ? getVerkkopankkiConfig() : null,
            [ FUNDING.BLIK ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.blik           && __FUNDING_ELIGIBILITY__.blik.eligible)) ? getBlikConfig() : null,
            [ FUNDING.TRUSTLY ]:        (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.truslty        && __FUNDING_ELIGIBILITY__.trustly.eligible)) ? getTrustlyConfig() : null,
            [ FUNDING.ZIMPLER ]:        (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.zimpler        && __FUNDING_ELIGIBILITY__.zimpler.eligible)) ? getZimplerConfig() : null,
            [ FUNDING.WECHATPAY ]:      (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.wechatpay      && __FUNDING_ELIGIBILITY__.wechatpay.eligible)) ? getWechatpayConfig() : null,
            [ FUNDING.OXXO ]:           (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.oxxo           && __FUNDING_ELIGIBILITY__.oxxo.eligible)) ? getOxxoConfig() : null,
            [ FUNDING.BOLETO ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.boleto         && __FUNDING_ELIGIBILITY__.boleto.eligible)) ? getBoletoConfig() : null,
            [ FUNDING.MAXIMA ]:         (!__TREE_SHAKE__ || (__FUNDING_ELIGIBILITY__.maxima         && __FUNDING_ELIGIBILITY__.maxima.eligible)) ? getMaximaConfig() : null
        };
    });
}

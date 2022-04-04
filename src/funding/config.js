/* @flow */

import { FUNDING } from '@paypal/sdk-constants/src';
import { inlineMemoize } from '@krakenjs/belter/src';

import { type FundingSourceConfig } from './common';
import { getPayPalConfig } from './paypal';
import { getVenmoConfig } from './venmo';
import { getApplePayConfig } from './applepay';
import { getItauConfig } from './itau';
import { getCreditConfig } from './credit';
import { getPaylaterConfig } from './paylater';
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
import { getMercadopagoConfig } from './mercadopago';
import { getMultibancoConfig } from './multibanco';

export function getFundingConfig() : { [$Values<typeof FUNDING>] : ?FundingSourceConfig } {
    return inlineMemoize(getFundingConfig, () => {
        return {
            [ FUNDING.PAYPAL ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.paypal !== 'undefined'         && __FUNDING_ELIGIBILITY__.paypal.eligible)) ? getPayPalConfig() : null,
            [ FUNDING.VENMO ]:          (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.venmo !== 'undefined'          && __FUNDING_ELIGIBILITY__.venmo.eligible)) ? getVenmoConfig() : null,
            [ FUNDING.APPLEPAY ]:       (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.applepay !== 'undefined'       && __FUNDING_ELIGIBILITY__.applepay.eligible)) ? getApplePayConfig() : null,
            [ FUNDING.ITAU ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.itau !== 'undefined'           && __FUNDING_ELIGIBILITY__.itau.eligible)) ? getItauConfig() : null,
            [ FUNDING.CREDIT ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.credit !== 'undefined'         && __FUNDING_ELIGIBILITY__.credit.eligible)) ? getCreditConfig() : null,
            [ FUNDING.PAYLATER ]:       (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.paylater !== 'undefined'       && __FUNDING_ELIGIBILITY__.paylater.eligible)) ? getPaylaterConfig() : null,
            [ FUNDING.CARD ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.card !== 'undefined'           && __FUNDING_ELIGIBILITY__.card.eligible)) ? getCardConfig() : null,
            [ FUNDING.IDEAL ]:          (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.ideal !== 'undefined'          && __FUNDING_ELIGIBILITY__.ideal.eligible)) ? getIdealConfig() : null,
            [ FUNDING.SEPA ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.sepa !== 'undefined'           && __FUNDING_ELIGIBILITY__.sepa.eligible)) ? getSepaConfig() : null,
            [ FUNDING.BANCONTACT ]:     (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.bancontact !== 'undefined'     && __FUNDING_ELIGIBILITY__.bancontact.eligible)) ? getBancontactConfig() : null,
            [ FUNDING.GIROPAY ]:        (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.giropay !== 'undefined'        && __FUNDING_ELIGIBILITY__.giropay.eligible)) ? getGiropayConfig() : null,
            [ FUNDING.SOFORT ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.sofort !== 'undefined'         && __FUNDING_ELIGIBILITY__.sofort.eligible)) ? getSofortConfig() : null,
            [ FUNDING.EPS ]:            (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.eps !== 'undefined'            && __FUNDING_ELIGIBILITY__.eps.eligible)) ? getEpsConfig() : null,
            [ FUNDING.MYBANK ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.mybank !== 'undefined'         && __FUNDING_ELIGIBILITY__.mybank.eligible)) ? getMybankConfig() : null,
            [ FUNDING.P24 ]:            (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.p24 !== 'undefined'            && __FUNDING_ELIGIBILITY__.p24.eligible)) ? getP24Config() : null,
            [ FUNDING.PAYU ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.payu !== 'undefined'           && __FUNDING_ELIGIBILITY__.payu.eligible)) ? getPayuConfig() : null,
            [ FUNDING.VERKKOPANKKI ]:   (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.verkkopankki !== 'undefined'   && __FUNDING_ELIGIBILITY__.verkkopankki.eligible)) ? getVerkkopankkiConfig() : null,
            [ FUNDING.BLIK ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.blik !== 'undefined'           && __FUNDING_ELIGIBILITY__.blik.eligible)) ? getBlikConfig() : null,
            [ FUNDING.TRUSTLY ]:        (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.trustly !== 'undefined'        && __FUNDING_ELIGIBILITY__.trustly.eligible)) ? getTrustlyConfig() : null,
            [ FUNDING.ZIMPLER ]:        (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.zimpler !== 'undefined'        && __FUNDING_ELIGIBILITY__.zimpler.eligible)) ? getZimplerConfig() : null,
            [ FUNDING.WECHATPAY ]:      (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.wechatpay !== 'undefined'      && __FUNDING_ELIGIBILITY__.wechatpay.eligible)) ? getWechatpayConfig() : null,
            [ FUNDING.OXXO ]:           (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.oxxo !== 'undefined'           && __FUNDING_ELIGIBILITY__.oxxo.eligible)) ? getOxxoConfig() : null,
            [ FUNDING.BOLETO ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.boleto !== 'undefined'         && __FUNDING_ELIGIBILITY__.boleto.eligible)) ? getBoletoConfig() : null,
            [ FUNDING.MAXIMA ]:         (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.maxima !== 'undefined'         && __FUNDING_ELIGIBILITY__.maxima.eligible)) ? getMaximaConfig() : null,
            [ FUNDING.MERCADOPAGO ]:    (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.mercadopago !== 'undefined'    && __FUNDING_ELIGIBILITY__.mercadopago.eligible)) ? getMercadopagoConfig() : null,
            [ FUNDING.MULTIBANCO ]:     (!__TREE_SHAKE__ || (typeof __FUNDING_ELIGIBILITY__.multibanco !== 'undefined'     && __FUNDING_ELIGIBILITY__.multibanco.eligible)) ? getMultibancoConfig() : null
        };
    });
}

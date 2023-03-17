/* @flow */

import { FUNDING } from "@paypal/sdk-constants/src";
import { inlineMemoize } from "@krakenjs/belter/src";

import { type FundingSourceConfig } from "./common";
import { getPayPalConfig } from "./paypal";
import { getVenmoConfig } from "./venmo";
import { getApplePayConfig } from "./applepay";
import { getItauConfig } from "./itau";
import { getCreditConfig } from "./credit";
import { getPaylaterConfig } from "./paylater";
import { getCardConfig } from "./card";
import { getIdealConfig } from "./ideal";
import { getSepaConfig } from "./sepa";
import { getBancontactConfig } from "./bancontact";
import { getGiropayConfig } from "./giropay";
import { getSofortConfig } from "./sofort";
import { getEpsConfig } from "./eps";
import { getMybankConfig } from "./mybank";
import { getP24Config } from "./p24";
import { getWechatpayConfig } from "./wechatpay";
import { getPayuConfig } from "./payu";
import { getBlikConfig } from "./blik";
import { getTrustlyConfig } from "./trustly";
import { getOxxoConfig } from "./oxxo";
import { getBoletoConfig } from "./boleto";
import { getMercadopagoConfig } from "./mercadopago";
import { getMultibancoConfig } from "./multibanco";
import { getSatispayConfig } from "./satispay";
import { getPaidyConfig } from "./paidy";

export function getFundingConfig(): {
  [$Values<typeof FUNDING>]: ?FundingSourceConfig,
} {
  return inlineMemoize(getFundingConfig, () => {
    return {
      [FUNDING.PAYPAL]: getPayPalConfig(),
      [FUNDING.VENMO]: getVenmoConfig(),
      [FUNDING.APPLEPAY]: getApplePayConfig(),
      [FUNDING.ITAU]: getItauConfig(),
      [FUNDING.CREDIT]: getCreditConfig(),
      [FUNDING.PAYLATER]: getPaylaterConfig(),
      [FUNDING.CARD]: getCardConfig(),
      [FUNDING.IDEAL]: getIdealConfig(),
      [FUNDING.SEPA]: getSepaConfig(),
      [FUNDING.BANCONTACT]: getBancontactConfig(),
      [FUNDING.GIROPAY]: getGiropayConfig(),
      [FUNDING.SOFORT]: getSofortConfig(),
      [FUNDING.EPS]: getEpsConfig(),
      [FUNDING.MYBANK]: getMybankConfig(),
      [FUNDING.P24]: getP24Config(),
      [FUNDING.PAYU]: getPayuConfig(),
      [FUNDING.BLIK]: getBlikConfig(),
      [FUNDING.TRUSTLY]: getTrustlyConfig(),
      [FUNDING.WECHATPAY]: getWechatpayConfig(),
      [FUNDING.OXXO]: getOxxoConfig(),
      [FUNDING.BOLETO]: getBoletoConfig(),
      [FUNDING.BOLETOBANCARIO]: getBoletoConfig(),
      [FUNDING.MERCADOPAGO]: getMercadopagoConfig(),
      [FUNDING.MULTIBANCO]: getMultibancoConfig(),
      [FUNDING.SATISPAY]: getSatispayConfig(),
      [FUNDING.PAIDY]: getPaidyConfig(),
    };
  });
}

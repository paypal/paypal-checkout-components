/* @flow */

import type { LazyExport } from "checkout-components/src/types";
import {
  getPaymentFieldsComponent,
  type PaymentFieldsComponent,
} from "checkout-components/src/zoid/payment-fields/component";

export const PaymentFields: LazyExport<PaymentFieldsComponent> = {
  __get__: () => getPaymentFieldsComponent(),
};

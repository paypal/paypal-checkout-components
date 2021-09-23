/* @flow */

import type { LazyExport } from '../types';
import { getPaymentFieldsComponent, type PaymentFieldsComponent } from '../zoid/payment-fields/component';

export const PaymentFields : LazyExport<PaymentFieldsComponent> = {
    __get__: () => getPaymentFieldsComponent()
};

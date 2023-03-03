/* @flow */
/* eslint import/no-deprecated: 0 */

import type { LazyExport } from '../types';
import { getPaymentFieldsComponent, type PaymentFieldsComponent } from '../zoid/payment-fields/component';

export const Fields : LazyExport<PaymentFieldsComponent> = {
    __get__: () => getPaymentFieldsComponent()
};

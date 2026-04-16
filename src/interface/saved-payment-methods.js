/* @flow */

import type { LazyExport } from "../types";
import {
  getSavedPaymentMethodsComponent,
  type SavedPaymentMethodsComponent,
} from "../zoid/saved-payment-methods";

export const SavedPaymentMethods: LazyExport<SavedPaymentMethodsComponent> = {
  __get__: () => getSavedPaymentMethodsComponent(),
};

export function setup() {
  getSavedPaymentMethodsComponent();
}

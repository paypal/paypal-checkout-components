/* @flow */

import {
  getHostedButtonsComponent,
  type HostedButtonsComponent,
} from "../hosted-buttons";
import { getButtonsComponent } from "../zoid/buttons";
import { getCheckoutComponent, type CheckoutComponent } from "../zoid/checkout";
import type { LazyExport, LazyProtectedExport } from "../types";
import { protectedExport } from "../lib";

export const HostedButtons: LazyExport<HostedButtonsComponent> = {
  __get__: () => getHostedButtonsComponent(),
};

export const Checkout: LazyProtectedExport<CheckoutComponent> = {
  __get__: () => protectedExport(getCheckoutComponent()),
};

export function setup() {
  getButtonsComponent();
  getCheckoutComponent();
}

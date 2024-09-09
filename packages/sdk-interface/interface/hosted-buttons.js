/* @flow */

import { getHostedButtonsComponent } from "hosted-buttons/src";
import type { HostedButtonsComponent } from "hosted-buttons/src/types";
import {
  getButtonsComponent,
  getCardFormComponent,
  getQRCodeComponent,
  getCheckoutComponent,
  type CardFormComponent,
  type QRCodeComponent,
  type CheckoutComponent,
} from "checkout-components/src/zoid";

import type {
  LazyExport,
  LazyProtectedExport,
} from "checkout-components/src/types";
import { protectedExport } from "./lib";

export const HostedButtons: LazyExport<HostedButtonsComponent> = {
  __get__: () => getHostedButtonsComponent(),
};

export const Checkout: LazyProtectedExport<CheckoutComponent> = {
  __get__: () => protectedExport(getCheckoutComponent()),
};

export const CardForm: LazyProtectedExport<CardFormComponent> = {
  __get__: () => protectedExport(getCardFormComponent()),
};

export const QRCode: LazyProtectedExport<QRCodeComponent> = {
  __get__: () => protectedExport(getQRCodeComponent()),
};

export function setup() {
  getButtonsComponent();
  getCheckoutComponent();
}

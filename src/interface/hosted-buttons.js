/* @flow */

import type { Node } from "react";

import {
  getHostedButtonsComponent,
  type HostedButtonsComponent,
} from "../hosted-buttons";
import { getButtonsComponent, type ButtonsComponent } from "../zoid/buttons";
import { getCardFormComponent, type CardFormComponent } from "../zoid/card-form";
import { getQRCodeComponent, type QRCodeComponent } from "../zoid/qr-code";
import { getCheckoutComponent, type CheckoutComponent } from "../zoid/checkout";
import type { LazyExport, LazyProtectedExport } from "../types";
import { allowIframe as _allowIframe, protectedExport } from "../lib";

export const HostedButtons: LazyExport<HostedButtonsComponent> = {
  __get__: () => getHostedButtonsComponent(),
};

export const Buttons: LazyProtectedExport<ButtonsComponent> = {
  __get__: () => protectedExport(getButtonsComponent()),
};

export const CardForm: LazyProtectedExport<CardFormComponent> = {
  __get__: () => protectedExport(getCardFormComponent()),
};

export const QRCode: LazyProtectedExport<QRCodeComponent> = {
  __get__: () => protectedExport(getQRCodeComponent()),
};

export const allowIframe: LazyProtectedExport<typeof _allowIframe> = {
  __get__: () => protectedExport(_allowIframe),
};

export function setup() {
  getButtonsComponent();
  getCheckoutComponent();
  getHostedButtonsComponent();
  getCardFormComponent();
  getQRCodeComponent();
}

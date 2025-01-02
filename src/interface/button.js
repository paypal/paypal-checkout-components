/* @flow */

import {
  PopupOpenError as _PopupOpenError,
  destroy as zoidDestroy,
  destroyComponents,
} from "@krakenjs/zoid/src";

import type { LazyExport, LazyProtectedExport } from "../types";
import { allowIframe as _allowIframe, protectedExport } from "../lib";
import { getCheckoutComponent, type CheckoutComponent } from "../zoid/checkout";
import { getButtonsComponent, type ButtonsComponent } from "../zoid/buttons";
import {
  getCardFormComponent,
  type CardFormComponent,
} from "../zoid/card-form";
import {
  getPaymentFieldsComponent,
  type PaymentFieldsComponent,
} from "../zoid/payment-fields";
import { getMenuComponent, type MenuComponent } from "../zoid/menu";
import {
  getInstallmentsComponent,
  type InstallmentsComponent,
} from "../zoid/installments";
import { Buttons as _ButtonsTemplate } from "../ui/buttons";
import { getQRCodeComponent, type QRCodeComponent } from "../zoid/qr-code";
import {
  getVenmoCheckoutComponent,
  type VenmoCheckoutComponent,
} from "../zoid/venmo";
import {
  getModalComponent,
  type ModalComponent,
} from "../zoid/modal/component";
import { getPixelComponent, type PixelComponent } from "../zoid/pixel";

export const Buttons: LazyExport<ButtonsComponent> = {
  __get__: () => getButtonsComponent(),
};

export const Pixel: LazyExport<PixelComponent> = {
  __get__: () => getPixelComponent(),
};

export const Checkout: LazyProtectedExport<CheckoutComponent> = {
  __get__: () => protectedExport(getCheckoutComponent()),
};

export const CardForm: LazyProtectedExport<CardFormComponent> = {
  __get__: () => protectedExport(getCardFormComponent()),
};

export const PaymentFields: LazyProtectedExport<PaymentFieldsComponent> = {
  __get__: () => protectedExport(getPaymentFieldsComponent()),
};

export const Menu: LazyProtectedExport<MenuComponent> = {
  __get__: () => protectedExport(getMenuComponent()),
};

export const Modal: LazyProtectedExport<ModalComponent> = {
  __get__: () => protectedExport(getModalComponent()),
};

export const Installments: LazyProtectedExport<InstallmentsComponent> = {
  __get__: () => protectedExport(getInstallmentsComponent()),
};

export const QRCode: LazyProtectedExport<QRCodeComponent> = {
  __get__: () => protectedExport(getQRCodeComponent()),
};

export const Venmo: LazyProtectedExport<VenmoCheckoutComponent> = {
  __get__: () => protectedExport(getVenmoCheckoutComponent()),
};

export const ButtonsTemplate: LazyProtectedExport<typeof _ButtonsTemplate> = {
  __get__: () => protectedExport(_ButtonsTemplate),
};

export const PopupOpenError: LazyProtectedExport<typeof _PopupOpenError> = {
  __get__: () => protectedExport(_PopupOpenError),
};

export const allowIframe: LazyProtectedExport<typeof _allowIframe> = {
  __get__: () => protectedExport(_allowIframe),
};

export const forceIframe: LazyProtectedExport<typeof _allowIframe> = {
  __get__: () => protectedExport(_allowIframe),
};

export const destroyAll: LazyProtectedExport<typeof destroyComponents> = {
  __get__: () => protectedExport(destroyComponents),
};

export function setup() {
  getButtonsComponent();
  getCheckoutComponent();
  getPixelComponent();
}

export function destroy(err?: mixed) {
  zoidDestroy(err);
}

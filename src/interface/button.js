/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError, destroy as zoidDestroy, destroyComponents } from 'zoid/src';

import type { LazyExport, LazyProtectedExport } from '../types';
import { allowIframe as _allowIframe } from '../lib';
import { getCheckoutComponent, type CheckoutComponent } from '../zoid/checkout';
import { getButtonsComponent, type ButtonsComponent } from '../zoid/buttons';
import { getCardFieldsComponent, type CardFieldsComponent } from '../zoid/card-fields';
import { getMenuComponent, type MenuComponent } from '../zoid/menu';
import { getInstallmentsComponent, type InstallmentsComponent } from '../zoid/installments';
import { Buttons as _ButtonsTemplate } from '../ui/buttons';
import { getModalComponent, type ModalComponent } from '../zoid/modal/component';

function protectedExport<T>(xport : T) : ?T {
    if (isPayPalDomain()) {
        return xport;
    }
}

export const Buttons : LazyExport<ButtonsComponent> = {
    __get__: () => getButtonsComponent()
};

export const Checkout : LazyProtectedExport<CheckoutComponent> = {
    __get__: () => protectedExport(getCheckoutComponent())
};

export const CardFields : LazyProtectedExport<CardFieldsComponent> = {
    __get__: () => protectedExport(getCardFieldsComponent())
};

export const Menu : LazyProtectedExport<MenuComponent> = {
    __get__: () => protectedExport(getMenuComponent())
};

export const Modal : LazyProtectedExport<ModalComponent> = {
    __get__: () => protectedExport(getModalComponent())
};

export const Installments : LazyProtectedExport<InstallmentsComponent> =  {
    __get__: () => protectedExport(getInstallmentsComponent())
};

export const ButtonsTemplate : LazyProtectedExport<typeof _ButtonsTemplate> = {
    __get__: () => protectedExport(_ButtonsTemplate)
};

export const PopupOpenError : LazyProtectedExport<typeof _PopupOpenError> = {
    __get__: () => protectedExport(_PopupOpenError)
};

export const allowIframe : LazyProtectedExport<typeof _allowIframe> = {
    __get__: () => protectedExport(_allowIframe)
};

export const forceIframe : LazyProtectedExport<typeof _allowIframe> = {
    __get__: () => protectedExport(_allowIframe)
};

export const destroyAll : LazyProtectedExport<typeof destroyComponents> = {
    __get__: () => protectedExport(destroyComponents)
};

export function setup() {
    getButtonsComponent();
    getCheckoutComponent();
}

export function destroy() {
    zoidDestroy();
}

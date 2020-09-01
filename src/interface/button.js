/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError, destroy as zoidDestroy, destroyComponents } from 'zoid/src';

import { allowIframe as _allowIframe } from '../lib';
import { getCheckoutComponent } from '../zoid/checkout';
import { getButtonsComponent } from '../zoid/buttons';
import { getWalletComponent } from '../zoid/wallet';
import { getCardFieldsComponent } from '../zoid/card-fields';
import { getMenuComponent } from '../zoid/menu';
import { Buttons as _ButtonsTemplate } from '../ui/buttons';
import { getModalComponent } from '../zoid/modal/component';

function protectedExport<T>(xport : T) : ?T {
    if (isPayPalDomain()) {
        return xport;
    }
}

export const Buttons = {
    __get__: () => getButtonsComponent()
};

export const Checkout = {
    __get__: () => protectedExport(getCheckoutComponent())
};

export const CardFields = {
    __get__: () => protectedExport(getCardFieldsComponent())
};

export const Menu = {
    __get__: () => protectedExport(getMenuComponent())
};

export const Wallet = {
        __get__: () => getWalletComponent()
};

export const Modal = {
    __get__: () => protectedExport(getModalComponent())
};

export const ButtonsTemplate = {
    __get__: () => protectedExport(_ButtonsTemplate)
};

export const PopupOpenError = {
    __get__: () => protectedExport(_PopupOpenError)
};

export const allowIframe = {
    __get__: () => protectedExport(_allowIframe)
};

export const forceIframe = {
    __get__: () => protectedExport(_allowIframe)
};

export const destroyAll = {
    __get__: () => protectedExport(destroyComponents)
};

export function setup() {
    getButtonsComponent();
    getCheckoutComponent();
}

export function destroy() {
    zoidDestroy();
}

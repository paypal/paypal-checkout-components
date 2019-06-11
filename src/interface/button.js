/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError, destroy as zoidDestroy, destroyComponents } from 'zoid/src';

import { allowIframe as _allowIframe } from '../lib';
import { getCheckoutComponent } from '../checkout';
import { getButtonsComponent } from '../buttons';
import { Buttons as _ButtonsTemplate } from '../buttons/template';
import { getCardFieldsComponent } from '../card-fields';

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

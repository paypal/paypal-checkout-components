/* @flow */

import { isPayPalDomain } from '@paypal/sdk-client/src';
import { PopupOpenError as _PopupOpenError, destroy as zoidDestroy, destroyComponents } from 'zoid/src';

import { setupLogger, allowIframe as _allowIframe } from '../lib';
import { getCheckoutComponent } from '../checkout';
import { getButtonsComponent } from '../buttons';

export const request = {
    addHeaderBuilder: () => {
        // pass
    }
};

export const Buttons = {
    __get__: () => getButtonsComponent()
};

export const Checkout = {
    __get__: () => {
        const component = getCheckoutComponent();
        if (isPayPalDomain()) {
            return component;
        }
    }
};

export const PopupOpenError = {
    __get__: () => {
        if (isPayPalDomain()) {
            return _PopupOpenError;
        }
    }
};

export const allowIframe = {
    __get__: () => {
        if (isPayPalDomain()) {
            return _allowIframe;
        }
    }
};

export const destroyAll = {
    __get__: () => {
        if (isPayPalDomain() || __TEST__) {
            return destroyComponents;
        }
    }
};

export function setup() {
    setupLogger();
}

export function destroy() {
    zoidDestroy();
}

/* @flow */

import type { LazyExport } from '../types';
import { getCardFieldComponent, getCardNumberFieldComponent, getCardCVVFieldComponent,
    getCardExpiryFieldComponent, type CardFieldComponent } from '../zoid/card/component';

export const CardField : LazyExport<CardFieldComponent> = {
    __get__: () => getCardFieldComponent()
};

export const CardNumberField : LazyExport<CardFieldComponent> = {
    __get__: () => getCardNumberFieldComponent()
};

export const CardCVVField : LazyExport<CardFieldComponent> = {
    __get__: () => getCardCVVFieldComponent()
};

export const CardExpiryField : LazyExport<CardFieldComponent> = {
    __get__: () => getCardExpiryFieldComponent()
};

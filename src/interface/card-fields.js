/* @flow */

import type { LazyExport } from '../types';
import { getCardFieldsComponent, type CardFieldsComponent } from '../zoid/card-fields/component';
import { protectedExport } from '../lib';

export const CardFields : LazyExport<CardFieldsComponent> = {
    __get__: () => protectedExport(getCardFieldsComponent())
};

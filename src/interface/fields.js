/* @flow */

import type { LazyExport } from '../types';
import { getFieldsComponent, type FieldsComponent } from '../zoid/fields/component';

export const Fields : LazyExport<FieldsComponent> = {
    __get__: () => getFieldsComponent()
};

/* @flow */

import type { LazyExport } from '../types';
import { getMarksComponent, type MarksComponent } from '../marks/component';

export const Marks : LazyExport<MarksComponent> = {
    __get__: () => getMarksComponent()
};

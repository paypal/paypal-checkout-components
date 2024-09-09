/* @flow */

import type { LazyExport } from "checkout-components/src/types";
import {
  getMarksComponent,
  type MarksComponent,
} from "checkout-components/src/marks/component";

export const Marks: LazyExport<MarksComponent> = {
  __get__: () => getMarksComponent(),
};

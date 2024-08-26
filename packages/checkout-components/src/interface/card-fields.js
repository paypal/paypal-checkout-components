/* @flow */

import { destroy as zoidDestroy } from "@krakenjs/zoid/src";

import type { LazyExport } from "../types";
import {
  getCardFieldsComponent,
  type CardFieldsComponent,
} from "../zoid/card-fields/component";

export const CardFields: LazyExport<CardFieldsComponent> = {
  __get__: getCardFieldsComponent,
};

export function destroy(err?: mixed) {
  zoidDestroy(err);
}

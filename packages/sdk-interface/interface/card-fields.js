/* @flow */

import { destroy as zoidDestroy } from "@krakenjs/zoid/src";

import type { LazyExport } from "checkout-components/src/types";
import {
  getCardFieldsComponent,
  type CardFieldsComponent,
} from "checkout-components/src/zoid/card-fields/component";

export const CardFields: LazyExport<CardFieldsComponent> = {
  __get__: getCardFieldsComponent,
};

export function destroy(err?: mixed) {
  zoidDestroy(err);
}

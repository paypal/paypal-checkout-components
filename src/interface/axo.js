/* @flow */
import type { LazyExport } from "../types";
import { getAxoComponent, type AXOComponent } from "../zoid/axo";

export const AXO: LazyExport<AXOComponent> = {
  __get__: getAxoComponent,
};

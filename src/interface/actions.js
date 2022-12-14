/* @flow */

import { isPayPalDomain } from "@paypal/sdk-client/src";

import type { LazyProtectedExport } from "../types";
import { createSaveAction, type SaveAction } from "../actions/save";

function protectedExport<T>(xport: T): ?T {
  if (isPayPalDomain()) {
    return xport;
  }
}

export const actions: LazyProtectedExport<{|
  Save: SaveAction,
|}> = {
  __get__: () =>
    protectedExport({
      Save: createSaveAction,
    }),
};

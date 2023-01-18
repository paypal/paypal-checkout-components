/* @flow */

import { isPayPalDomain } from "@paypal/sdk-client/src";

import type { LazyProtectedExport } from "../types";
import { createSaveAction, type CreateSaveAction } from "../actions/save";

function protectedExport<T>(xport: T): ?T {
  if (isPayPalDomain()) {
    return xport;
  }
}

export const actions: LazyProtectedExport<{|
  Save: CreateSaveAction,
|}> = {
  __get__: () =>
    protectedExport({
      Save: createSaveAction,
    }),
};

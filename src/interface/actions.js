/* @flow */

import type { LazyProtectedExport } from "../types";
import { createSaveAction, type CreateSaveAction } from "../actions/save";
import { protectedExport } from "../lib";

export const actions: LazyProtectedExport<{|
  Save: CreateSaveAction,
|}> = {
  __get__: () =>
    protectedExport({
      Save: createSaveAction,
    }),
};

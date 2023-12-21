/* @flow */

import {
  getHostedButtonsComponent,
  type HostedButtonsComponent,
} from "../hosted-buttons";
import type { LazyExport } from "../types";

export const HostedButtons: LazyExport<HostedButtonsComponent> = {
  __get__: () => getHostedButtonsComponent(),
};

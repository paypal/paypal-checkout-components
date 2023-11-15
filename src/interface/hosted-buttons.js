import type { LazyExport } from "../types";
import {
  getHostedButtonsComponent,
  type HostedButtonsComponent,
} from "../hosted-buttons/";

export const HostedButtons: LazyExport<HostedButtonsComponent> = {
  __get__: () => getHostedButtonsComponent(),
};

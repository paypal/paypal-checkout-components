/* eslint-disable flowtype/no-weak-types */
/* @flow */
// flow-disable

import { getConnectComponent } from "./component";

type ConnectComponent = (merchantProps: any) => ConnectComponent;
// $FlowFixMe
export const Connect: ConnectComponent = async (
  merchantProps: any
): ConnectComponent => {
  // $FlowFixMe
  return await getConnectComponent(merchantProps);
};

/* eslint-enable flowtype/no-weak-types */

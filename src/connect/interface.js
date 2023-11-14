/* eslint-disable flowtype/no-weak-types */
/* @flow */
// flow-disable

import { getConnectComponent, type ConnectComponent } from "./component";

type ConnectThing = (merchantProps: any) => ConnectComponent;
// $FlowFixMe
export const Connect: ConnectThing = async (
  merchantProps: any
): ConnectComponent => {
  // $FlowFixMe
  return await getConnectComponent(merchantProps);
};

/* eslint-enable flowtype/no-weak-types */

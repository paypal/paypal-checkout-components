/* @flow */

// $FlowFixMe[toplevel-library-import]
import type { PayPal } from './types';

declare var __SMART_BUTTONS__ : {|
    __MAJOR_VERSION__ : string,
    __MINOR_VERSION__ : string
|};

// $FlowFixMe[value-as-type]
declare var paypal : PayPal;

declare module CSSModule {
    declare var exports: {|
    
    |};
}

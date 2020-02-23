/* @flow */

import type { PayPal } from './types';

declare var __SMART_BUTTONS__ : {|
    __MAJOR_VERSION__ : string,
    __MINOR_VERSION__ : string
|};

declare var __SMART_WALLET__ : {|
    __MAJOR_VERSION__ : string,
    __MINOR_VERSION__ : string
|};

declare var paypal : PayPal;

declare module CSSModule {
    declare var exports: {|
    
    |};
}

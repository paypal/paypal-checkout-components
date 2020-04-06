/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

export const POPUP_BRIDGE_OPTYPE = {
    PAYMENT: ('payment' : 'payment'),
    CANCEL:  ('cancel' : 'cancel')
};

export type PopupBridge = {|
    nativeUrl : string,
    start : (url : string) => ZalgoPromise<{|
        opType : $Values<typeof POPUP_BRIDGE_OPTYPE>,
        token : string,
        paymentId? : string,
        PayerID? : ?string,
        ba_token? : string
    |}>
|};

export type XGetPopupBridge = () => ZalgoPromise<?PopupBridge>;
export type GetPopupBridge = XGetPopupBridge;

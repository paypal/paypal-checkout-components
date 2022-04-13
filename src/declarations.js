/* @flow */
/* eslint import/unambiguous: 0 */

// $FlowFixMe[toplevel-library-import]
import { FUNDING } from '@paypal/sdk-constants/src';

declare var __PAYPAL_CHECKOUT__ : {|
    __REMEMBERED_FUNDING__ : $ReadOnlyArray<$Values<typeof FUNDING>>,
    __URI__ : {|
        __BUTTONS__ : string,
        __CHECKOUT__ : string,
        __CARD_FIELDS__ : string,
        __CARD_FIELD__ : string,
        __MENU__ : string,
        __INSTALLMENTS__ : string,
        __MODAL__ : string,
        __QRCODE__ : string,
        __WALLET__ : string,
        __PAYMENT_FIELDS__ : string
    |}
|};

declare var __INLINE_CHECKOUT_ELIGIBILITY__ : {|
    eligible : boolean,
    ineligibilityReason : string
|};

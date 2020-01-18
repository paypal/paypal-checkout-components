/* @flow */
/* eslint import/unambiguous: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';

declare var __PAYPAL_CHECKOUT__ : {
    __REMEMBERED_FUNDING__ : $ReadOnlyArray<$Values<typeof FUNDING>>,
    __URI__ : {
        __BUTTONS__ : string,
        __CHECKOUT__ : string,
        __CARD_FIELDS__ : string,
        __MENU__ : string,
        __MODAL__ : string
    }
};

declare var __hosted_fields__ : void;

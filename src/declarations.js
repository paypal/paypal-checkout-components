/* @flow */
/* eslint import/unambiguous: 0 */

import type { FundingEligibilityType } from 'paypal-braintree-web-client/src';
import { FUNDING } from 'paypal-sdk-constants/src';

declare var __TEST__: boolean;
declare var __MIN__: boolean;
declare var __FILE_NAME__ : string;
declare var __PORT__ : number;

declare var __PAYPAL_CHECKOUT__ : {
    __MAJOR_VERSION__ : string,
    __MINOR_VERSION__ : string,
    __DEFAULT_LOG_LEVEL__ : string,
    __REMEMBERED_FUNDING__ : $ReadOnlyArray<$Values<typeof FUNDING>>
};

declare var __paypal_checkout__ : {
    serverConfig : {
        fundingEligibility : FundingEligibilityType
    }
};

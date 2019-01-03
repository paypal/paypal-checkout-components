/* @flow */
/* eslint import/unambiguous: 0 */

import { FUNDING } from '@paypal/sdk-constants/src';

import type { FundingEligibilityType } from './types';

declare var __PAYPAL_CHECKOUT__ : {
    __REMEMBERED_FUNDING__ : Array<$Values<typeof FUNDING>> // eslint-disable-line flowtype/no-mutable-array
};

declare var __paypal_checkout__ : {
    serverConfig : {
        fundingEligibility : FundingEligibilityType
    }
};
